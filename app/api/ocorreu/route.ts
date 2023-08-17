import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IRequestData {
    reservationId: string;
}

export async function POST(request: Request) {
    try {
        const { reservationId } = await request.json() as IRequestData;

        if (!reservationId || typeof reservationId !== "string") {
            throw new Error('Invalid Reservation ID');
        }

        const reservation = await prisma.confirmacoes.findUnique({
            where: {
                id: reservationId,
            },
            include: {
                eventos: true,
            },
        });

        if (!reservation) {
            return new NextResponse("Reservation not found.", { status: 404 });
        }

        const event = reservation.eventos;

        const currentUser = await getCurrentUser();  // Implement this function
        
        if (!currentUser) {
            return NextResponse.error();
        }

        // Check authorization logic...
        if (event.userId !== currentUser.id) {
            return new NextResponse("Unauthorized.", { status: 403 });
        }

        // Update event data...
        await prisma.eventos.update({
            where: {
                id: event.id,
            },
            data: {
                numOcorreu: {
                    increment: 1,
                },
            },
        });

        return NextResponse.json(event);
    } catch (error) {
        return new NextResponse("Bad Request", { status: 400 });
    }
}
