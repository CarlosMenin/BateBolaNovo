import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb';
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request
){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const body = await request.json();
    const{
        eventId,
        eventUserId,
        preco,
        confirmationId
    } = body;

    const payment = await prisma.pagamentos.create({
        data: {
            userId: currentUser.id,
            eventId: eventId,
            eventUserId: eventUserId,
            preco: preco,
            confirmationId: confirmationId,
            isDone: true,       
        }
    });

    return NextResponse.json(payment);
}
    