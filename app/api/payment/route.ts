import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IRequestData {
    eventId: string;
    numOcorreu: number;
    numNaoOcorreu: number;
}

export async function POST(request: Request) {
    try {

        const { eventId, numOcorreu,numNaoOcorreu } = await request.json() as IRequestData;
        const currentUser = await getCurrentUser();


        if (!currentUser) {
            throw new Error('Invalid Reservation ID');
        }

        if (numOcorreu < numNaoOcorreu){
            const reserva = await prisma.confirmacoes.updateMany({
            where: {
                eventosId: eventId,
            },
            data:{
                isPaid: false
            }
        });

        }

        
        return NextResponse.json(eventId);
    } catch (error) {
        return new NextResponse("Bad Request", { status: 400 });
    }
}
