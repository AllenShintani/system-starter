import { prisma } from '../../prisma/client'
import { getAdminAuth } from '../lib/firebase/auth'

async function syncUsersFromFirebaseToDatabase() {
  try {
    console.log('Fetching emails from database...')
    const dbUsers = await prisma.user.findMany({
      select: { email: true },
    })
    const dbEmails = new Set(dbUsers.map((user) => user.email.toLowerCase()))
    console.log(`Found ${dbEmails.size} unique emails in the database.`)

    console.log('Fetching users from Firebase...')
    const adminAuth = getAdminAuth()
    const firebaseUsers: { email: string; displayName: string | null; uid: string }[] = []

    // Firebase からすべてのユーザーを取得
    let pageToken: string | undefined
    do {
      try {
        const listUsersResult = await adminAuth.listUsers(1000, pageToken)
        listUsersResult.users.forEach((userRecord) => {
          if (userRecord.email) {
            firebaseUsers.push({
              email: userRecord.email.toLowerCase(),
              displayName: userRecord.displayName || null,
              uid: userRecord.uid,
            })
          }
        })
        pageToken = listUsersResult.pageToken
      } catch (error) {
        console.error('Error listing users:', error)
        break
      }
    } while (pageToken)

    console.log(`Found ${firebaseUsers.length} users in Firebase.`)

    // Set を使って重複を排除
    const uniqueFirebaseUsers = Array.from(
      new Map(firebaseUsers.map((user) => [user.email, user])).values()
    )
    console.log(`Found ${uniqueFirebaseUsers.length} unique users in Firebase.`)

    // データベースに存在しないユーザーを特定
    const usersToAdd = uniqueFirebaseUsers.filter(
      (firebaseUser) => !dbEmails.has(firebaseUser.email)
    )

    console.log(`Users to add to database: ${usersToAdd.length}`)
    if (usersToAdd.length > 0) {
      console.log('Missing users:', usersToAdd.map((user) => user.email).join(', '))
    }

    // データベースに新規ユーザーを追加
    for (const user of usersToAdd) {
      try {
        await prisma.user.create({
          data: {
            email: user.email,
            userName: user.displayName || `user_${Math.random().toString(36).slice(2, 11)}`,
            firebaseUid: user.uid,
          },
        })
        console.log(`Added to Database: ${user.email}`)
      } catch (error) {
        console.error(`Failed to add to Database: ${user.email}. Error:`, error)
      }
    }

    console.log('Sync process completed.')
  } catch (error) {
    console.error('Error occurred during sync process:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// 実行
syncUsersFromFirebaseToDatabase()
