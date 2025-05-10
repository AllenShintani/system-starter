import { getAdminAuth } from '../lib/firebase/auth'

async function checkFirebaseUsers() {
  try {
    console.log('Fetching users from Firebase...')
    const adminAuth = getAdminAuth()

    // Get user count
    const { users: userSample } = await adminAuth.listUsers(1)
    console.log('Firebase Auth initialization successful')

    // List all users
    let allUsers: { email: string; uid: string }[] = []
    let pageToken: string | undefined

    do {
      try {
        console.log('Fetching page of users...')
        const listUsersResult = await adminAuth.listUsers(1000, pageToken)

        listUsersResult.users.forEach((user) => {
          if (user.email) {
            allUsers.push({
              email: user.email,
              uid: user.uid,
            })
          }
        })

        console.log(`Fetched ${listUsersResult.users.length} users in this page`)
        pageToken = listUsersResult.pageToken

        // Debug info
        console.log('Page token:', pageToken)
      } catch (error) {
        console.error('Error listing users:', error)
        throw error
      }
    } while (pageToken)

    console.log('\nFinal results:')
    console.log(`Total users found: ${allUsers.length}`)
    console.log('\nAll user emails:')
    allUsers.forEach((user) => console.log(`- ${user.email} (${user.uid})`))
  } catch (error) {
    console.error('Error occurred:', error)
  }
}

// Execute
checkFirebaseUsers()
