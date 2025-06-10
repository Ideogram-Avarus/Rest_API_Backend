import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';


const prisma = new PrismaClient()

async function main() {
    const hashedPassword = await bcrypt.hash('testpass', 10);
    await prisma.users.create({
        data: {
            name: 'tester',
            email: 'tester@tester.com',
            password: hashedPassword,
            confirmed: true
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        if (e.code === 'P2003') {
            console.error('Foreign key violation detected!');
            console.error('Model name:', e.meta?.modelName);
            console.error('Field name:', e.meta?.field_name);
        }
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });