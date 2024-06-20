import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getToken } from "next-auth/jwt";

const prisma = new PrismaClient()

export const dynamic = 'force-dynamic'; 

export const GET = async (request: NextRequest) => {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
      })
      const karyawanId = Number(token!.karyawanId);
    const absen = await prisma.absensiTb.findMany({
        where:{
            karyawanId:karyawanId
        },
        include: {
            KaryawanTb: true
        },
    });
    return NextResponse.json(absen, { status: 200 })
}

