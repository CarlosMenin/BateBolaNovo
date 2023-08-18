import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IRequestData {
    currentUserId: string;
    userId: string;
}

export async function POST(request: Request) {
    try {
        const { currentUserId, userId } = await request.json() as IRequestData;

        if (!currentUserId || typeof currentUserId !== "string") {
            throw new Error('Invalid currentUserId ID');
        }
        if (!userId || typeof userId !== "string") {
            throw new Error('Invalid userId ID');
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                id: currentUserId,
            },
        });

        if (!currentUser) {
            throw new Error('Current user not found');
        }

        await prisma.user.update({
            where: {
                id: currentUserId,
            },
            data:{
                blockedUsers: {
                    push: userId
                }
            }
        });

        return new NextResponse("Usuário Bloqueado", { status: 200 });

    } catch (error) {
        return new NextResponse("Bad Request", { status: 400 });
    }
}
