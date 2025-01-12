import { Faker, pt_BR } from "@faker-js/faker";
import { User } from "@prisma/client";

import { signUp } from "@/features/auth/lib/auth-client";
import { db } from "@/lib/db";

const faker = new Faker({
  locale: [pt_BR],
});

export async function main() {
  console.log("Seeding database...");

  const users: User[] = [];

  for (let i = 0; i < 10; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const middleName = faker.person.middleName();

    const name = `${firstName} ${middleName} ${lastName}`;
    const username = faker.internet.username({ firstName, lastName });
    const email = faker.internet.email();
    const image = faker.image.avatar();
    const password = "40028922";

    const data = {
      name,
      username,
      email,
      image,
      password,
    };

    await signUp.email(data, {
      onError: (ctx) => {
        console.log(ctx.error.message);
        return;
      },
    });

    const newUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (newUser) {
      await db.user.update({
        where: {
          id: newUser.id,
        },
        data: {
          bio: faker.person.jobDescriptor(),
          pixKey: newUser.email,
        },
      });

      for (i = 0; i <= 10; i++) {
        await db.post.create({
          data: {
            content: faker.lorem.sentence(),
            createdAt: faker.date.past(),
            userId: newUser.id,
          },
        });
      }
    }
  }

  console.log(`Created ${users.length} users.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
