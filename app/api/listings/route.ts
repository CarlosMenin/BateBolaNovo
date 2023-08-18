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
        cidade,
        numConfirmados,
        numOcorreu,
        grupo,
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
            cidade,
            numConfirmados,
            numOcorreu,
            chavePix: currentUser.chavePix || '',
            grupo
        }
    });

    const user = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
                numCreated: {
                    increment: 1,
                },
            },
    });

    return NextResponse.json(listing);
}
    