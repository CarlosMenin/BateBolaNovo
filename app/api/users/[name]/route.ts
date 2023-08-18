import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb';

interface IParams {
    name?: string;
}

export async function SEARCH(
    request: Request,
    {params}: {params: IParams}
){

    const { name } = params;

    if(!name || typeof name !== "string"){
        throw new Error("Usuário inválido");
    }

    const user = await prisma.user.findFirst({
        where: {
            name: name
        }
    });

    return NextResponse.json(user);
}