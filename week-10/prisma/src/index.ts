import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser(email: string, password: string, firstName: string, lastName: string) {
  const user = await prisma.user.create({
    data: {
      email,
      password,
      firstName,
      lastName
    },
    select: {
      email: true,
      firstName: true,
      lastName: true
    }
  })

  console.log(user);
  return user;
}

async function updateUser(email: string, { firstName, lastName }: any) {
  const updated_user = await prisma.user.update({
    where: {
      email
    },
    data: {
      firstName,
      lastName
    },
    select: {
      email: true,
      firstName: true,
      lastName: true
    }
  })

  console.log(updated_user);
  return updated_user;
}

// insertUser('skdfj', 'lksdjf', 'skldfj', 'aksdljf');
updateUser('skdfj', { firstName: 'new first name', lastName: 'new last name' });