import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function seed() {
  const user = await db.users.create({
    data: {
      user_name: 'Diego.08',
      // this is a hashed version of 'twixrox'
      password: '1234',
      email: 'd.garciabrisa@gmail.com',
      name: 'Diego',
    },
  });
  await Promise.all(
    getHobbies().map((hobby) => {
      const data = { user_id: user.id, ...hobby };
      return db.hobbies.create({ data });
    })
  );
}

seed();

function getHobbies() {
  return [
    {
      hobby_name: 'sport_climbing',
    },
    {
      hobby_name: 'bouldering',
    },
    {
      hobby_name: 'yoga',
    },
    {
      hobby_name: 'tennis',
    },
    {
      hobby_name: 'football',
    },
    {
      hobby_name: 'basket',
    },
    {
      hobby_name: 'handball',
    },
    {
      hobby_name: 'software_engineering',
    },
    {
      hobby_name: 'photography',
    },
    {
      hobby_name: 'dance',
    },
    {
      hobby_name: 'pint_ball',
    },
    {
      hobby_name: 'laser_tag',
    },
  ];
}
