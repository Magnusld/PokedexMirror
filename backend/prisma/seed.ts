import {PrismaClient, Prisma} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // TODO: Parse csv inn til client
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
