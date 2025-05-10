import { getAdminAuth } from '../lib/firebase/auth'

async function checkEmailVerificationStatus(email: string) {
  try {
    console.log(`Checking verification status for email: ${email}`)

    const adminAuth = getAdminAuth()

    // Firebase でメールアドレスでユーザーを検索
    const userRecord = await adminAuth.getUserByEmail(email)

    if (userRecord) {
      console.log(`User found: ${email}`)
      console.log(`Email verified: ${userRecord.emailVerified ? 'Yes' : 'No'}`)
      console.log(`User details:`, {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
      })
    } else {
      console.log(`No user found with email: ${email}`)
    }
  } catch (error) {
    console.error(`Error checking email verification status for ${email}:`, error)
  }
}

// チェックしたいメールアドレス
const emailToCheck = 'lee.mcla@protonmail.com'

// 実行
checkEmailVerificationStatus(emailToCheck)
