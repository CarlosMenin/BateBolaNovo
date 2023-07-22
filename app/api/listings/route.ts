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
        title,
        description,
        imageSrc,
        category,
        location,
        numPessoas,
        preco,
        endereco,
        data,
        horario,
        cidade
    } = body;

    const listing = await prisma.eventos.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            numPessoas,
            local: location.value,
            preco: parseInt(preco,10),
            userId: currentUser.id,
            data,
            horario,
            endereco,
            cidade
        }
    });
    return NextResponse.json(listing);
}
    