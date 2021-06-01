const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      nom: 'Clanche',
      prenom: 'Jean',
      email: 'jean@clanche.io',
      motdepasse: '1234',
      Card: {
        create: { nom: 'Macdonalds' },
      },
    },
  })

  const allUsers = await prisma.user.findMany({
    include: {
    Card: true,
    },
  })
  console.dir(allUsers, { depth: null })
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })