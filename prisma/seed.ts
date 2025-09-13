import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


async function main(){
await prisma.counter.upsert({ where: { name: 'token' }, update: {}, create: { name: 'token', val: 0 } })
}


main().catch(e=>{ console.error(e); process.exit(1)}).finally(()=>prisma.$disconnect())