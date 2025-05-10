import { prisma } from '../../prisma/client'
import { getAdminAuth } from '../lib/firebase/auth'

async function addUnverifiedUsersToDB() {
  try {
    console.log('Fetching unverified users from Firebase...')

    const adminAuth = getAdminAuth()
    let nextPageToken: string | undefined
    const unverifiedUsers: Array<{
      email: string
      firebaseUid: string
      userName: string
    }> = []

    do {
      const result = await adminAuth.listUsers(1000, nextPageToken)
      result.users.forEach((userRecord) => {
        if (!userRecord.emailVerified && userRecord.email) {
          unverifiedUsers.push({
            email: userRecord.email,
            firebaseUid: userRecord.uid,
            userName: userRecord.displayName || `user_${Math.random().toString(36).slice(2, 11)}`,
          })
        }
      })
      nextPageToken = result.pageToken
    } while (nextPageToken)

    console.log(`Found ${unverifiedUsers.length} unverified users.`)

    // Prisma で未認証ユーザーをデータベースに追加
    for (const user of unverifiedUsers) {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email }, // メールアドレスで重複確認
        })

        if (existingUser) {
          console.log(`User with email ${user.email} already exists. Skipping...`)
          continue
        }

        await prisma.user.create({
          data: {
            email: user.email,
            firebaseUid: user.firebaseUid,
            userName: user.userName,
          },
        })
        console.log(`Added user: ${user.email}`)
      } catch (error) {
        console.error(`Failed to add user: ${user.email}. Error: ${error}`)
      }
    }

    console.log('Batch process completed.')
  } catch (error) {
    console.error('Error during batch process:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addUnverifiedUsersToDB()
