import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";

import prisma from '@/app/libs/prismadb';

interface IParams {
    listingId?: string;
}

export async function DELETE(
    request: Request,
    {params}: {params: IParams}
){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const { listingId} = params;

    if(!listingId || typeof listingId !== "string"){
        throw new Error("ID inválido");
    }

    const listing = await prisma.eventos.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id
        }
    });

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
                numCreated: {
                    decrement: 1,
                },
            },
    });

    const payments = await prisma.confirmacoes.updateMany({
        where: {
            eventosId: listingId,
        },
        data:{
            isPaid: false,
        }
    })

    return NextResponse.json(listing);
}