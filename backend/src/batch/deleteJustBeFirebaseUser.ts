import { prisma } from '../../prisma/client'
import { getAdminAuth } from '../lib/firebase/auth'

async function deleteOrphanedFirebaseUsers() {
  try {
    console.log('Starting the cleanup process...')
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
    const usersToDelete: { uid: string; email: string }[] = []

    // Firebase からユーザーを取得し、DBに存在しないユーザーを特定
    do {
      const result = await adminAuth.listUsers(1000, nextPageToken)
      result.users.forEach((userRecord) => {
        if (userRecord.email && !dbEmails.has(userRecord.email.toLowerCase())) {
          usersToDelete.push({
            uid: userRecord.uid,
            email: userRecord.email,
          })
        }
      })
      nextPageToken = result.pageToken
    } while (nextPageToken)

    console.log(`\nFound ${usersToDelete.length} users to delete from Firebase:`)

    // 削除対象のメールアドレス一覧を表示
    usersToDelete.forEach(({ email }, index) => {
      console.log(`${index + 1}. ${email}`)
    })

    if (usersToDelete.length === 0) {
      console.log('No users to delete. Exiting...')
      return
    }

    // 削除処理の開始
    console.log('\nStarting deletion process...')
    const results = {
      success: 0,
      failed: 0,
      errors: [] as { email: string; error: any }[],
    }

    // ユーザーを1件ずつ削除（バルク削除APIは存在しないため）
    for (const { uid, email } of usersToDelete) {
      try {
        await adminAuth.deleteUser(uid)
        console.log(`Successfully deleted: ${email}`)
        results.success++
      } catch (error) {
        console.error(`Failed to delete ${email}:`, error)
        results.failed++
        results.errors.push({ email, error })
      }

      // Firebase APIレート制限を考慮して少し待機
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    // 結果のサマリーを表示
    console.log('\nDeletion process completed.')
    console.log('Summary:')
    console.log(`- Successfully deleted: ${results.success} users`)
    console.log(`- Failed to delete: ${results.failed} users`)

    if (results.errors.length > 0) {
      console.log('\nErrors encountered:')
      results.errors.forEach(({ email, error }) => {
        console.log(`- ${email}: ${error.message || 'Unknown error'}`)
      })
    }
  } catch (error) {
    console.error('Error occurred during the cleanup process:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// スクリプトを実行
deleteOrphanedFirebaseUsers()
