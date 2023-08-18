import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import {NextResponse} from "next/server";


export async function POST(
    request: Request
){
    const body = await request.json();
    const{
        email,
        name,
        password,
        isArena,
        chavePix,
        rating,
        numCreated,
        friends,
        blockedUsers,
    } = body;

    const hashedPassword = await bcrypt.hash(password,12);

    const user = await prisma.user.create({
        data:{
            email,
            name,
            hashedPassword,
            isArena,
            chavePix,rating,
            numCreated,
            friends,
            blockedUsers,
        }
    });

    return NextResponse.json(user);
}