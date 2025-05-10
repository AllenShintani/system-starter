import { prisma } from '../../prisma/client'

async function listUserRoles() {
  try {
    console.log('Fetching user roles from database...')

    // すべてのユーザーとそのロールを取得
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
      },
      orderBy: {
        role: 'asc',
      },
    })

    console.log(`Found ${users.length} users in total.\n`)

    // ロールごとのカウントを計算
    const roleCounts = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // ロールごとの集計を表示
    console.log('=== Role Counts ===')
    Object.entries(roleCounts).forEach(([role, count]) => {
      console.log(`${role}: ${count} users`)
    })
    console.log('\n')

    // ロールごとの詳細情報を表示
    console.log('=== Detailed Role Information ===')
    Object.entries(roleCounts).forEach(([role, count]) => {
      console.log(`\n--- ${role} (${count} users) ---`)

      const usersWithRole = users.filter((user) => user.role === role)

      usersWithRole.forEach((user) => {
        if (role === 'CLIENT_USER') {
          console.log(`${user.email}`)
        }
        if (role === 'HACKER_USER') {
          console.log(`${user.email}`)
        } else {
          console.log(`${user.email},${user.role}`)
        }
      })
    })
  } catch (error) {
    console.error('Error occurred while listing user roles:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// バッチの実行
listUserRoles()
  .then(() => {
    console.log('\nBatch completed successfully.')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Batch failed:', error)
    process.exit(1)
  })
