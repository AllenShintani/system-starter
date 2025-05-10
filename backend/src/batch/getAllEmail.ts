import { prisma } from '../../prisma/client'

async function getAllUserEmails() {
  try {
    console.log('Fetching all user emails from database...\n')

    const users = await prisma.user.findMany({
      select: { email: true },
    })

    // メールアドレスを1行ずつ表示
    users.forEach((user) => {
      console.log(user.email)
    })

    console.log(`\nTotal number of emails: ${users.length}`)
  } catch (error) {
    console.error('Error occurred while fetching emails:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// 実行
getAllUserEmails()
