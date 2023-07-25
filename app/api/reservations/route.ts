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
        listingid,
        eventDate,
        eventTime,
        price,
    } = body;

    if(!listingid || !eventDate || !eventTime || !price){
        return new NextResponse("Missing required fields.", { status: 400 });
    }

    const listingAndReservation = await prisma.eventos.update({
        where:{
            id: listingid,
        },
        data: {
            confirmacoes: {
                create:{
                    userId: currentUser.id,
                    preco: price,
                    dataEvento: eventDate,
                    horarioEvento: eventTime
                }
            }
        }
    });

    return NextResponse.json(listingAndReservation);
}