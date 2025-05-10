import { prisma } from '../../prisma/client'
import { getAdminAuth } from '../lib/firebase/auth'

async function findEmailDifferences() {
  try {
    console.log('Fetching emails from database...')

    // データベースからすべてのメールアドレスを取得
    const dbUsers = await prisma.user.findMany({
      select: { email: true },
    })

    const dbEmails = new Set(dbUsers.map((user) => user.email.toLowerCase()))
    console.log(`Found ${dbEmails.size} unique emails in the database.`)

    console.log('Fetching users from Firebase...')

    const adminAuth = getAdminAuth()
    let nextPageToken: string | undefined
    const firebaseEmails = new Set<string>()

    // Firebase からすべてのユーザーを取得
    do {
      const result = await adminAuth.listUsers(1000, nextPageToken)
      result.users.forEach((userRecord) => {
        if (userRecord.email) {
          firebaseEmails.add(userRecord.email.toLowerCase())
        }
      })
      nextPageToken = result.pageToken
    } while (nextPageToken)

    console.log(`Found ${firebaseEmails.size} unique emails in Firebase.`)

    // 差分を計算
    const missingInFirebase = Array.from(dbEmails).filter((email) => !firebaseEmails.has(email))
    const missingInDatabase = Array.from(firebaseEmails).filter((email) => !dbEmails.has(email))

    console.log(`Emails in database but not in Firebase: ${missingInFirebase.length}`)
    console.log('Missing in Firebase:', missingInFirebase)

    console.log(`Emails in Firebase but not in database: ${missingInDatabase.length}`)
    console.log('Missing in Database:', missingInDatabase)
  } catch (error) {
    console.error('Error occurred while finding email differences:', error)
  } finally {
    await prisma.$disconnect()
  }
}

findEmailDifferences()
