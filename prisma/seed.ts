import { PrismaClient } from '@prisma/client'
const database = new PrismaClient()

const seed = async () => {
  const user = await database.user.create({
    data: {
      user_name: 'Admin',
      // this is a hashed version of 'twixrox'
      password: '123456',
      email: 'admin2@admin.com',
      name: 'Diego'
    }
  })
  await Promise.all(
    getHobbies().map((hobby) => {
      const data = { user_id: user.id, ...hobby }
      return database.hobby.create({ data })
    })
  )
}

seed()

const getHobbies = () => {
  return [
    {
      name: 'sport_climbing'
    },
    {
      name: 'bouldering'
    },
    {
      name: 'yoga'
    },
    {
      name: 'tennis'
    },
    {
      name: 'football'
    },
    {
      name: 'basket'
    },
    {
      name: 'handball'
    },
    {
      name: 'software_engineering'
    },
    {
      name: 'photography'
    },
    {
      name: 'dance'
    },
    {
      name: 'pint_ball'
    },
    {
      name: 'laser_tag'
    }
  ]
}
