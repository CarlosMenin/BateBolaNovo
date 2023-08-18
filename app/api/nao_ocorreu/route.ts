import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IRequestData {
    reservationId: string;
    rating: number;
}

export async function POST(request: Request) {
    try {
        const { reservationId, rating } = await request.json() as IRequestData;

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
        else{
            await prisma.confirmacoes.update({
                where: {
                    id: reservation.id,
                },
                data: {
                    hasPaid: true,
                },
            });
        }

        const event = reservation.eventos;

        const currentUser = await getCurrentUser();  // Implement this function
        
        if (!currentUser) {
            return NextResponse.error();
        }

        if (reservation.userId !== currentUser.id) {
            return new NextResponse("Unauthorized.", { status: 403 });
        }

        await prisma.eventos.update({
            where: {
                id: event.id,
            },
            data: {
                numOcorreu: {
                    decrement: 1,
                },
            },
        });

        const eventUser = await prisma.user.findUnique({
            where: {
                id: event.userId,
            },
        });

        const lastRating = (eventUser?.rating ?? 0) * (eventUser?.numAvaliacoes ?? 0);
        const newRating = (lastRating + rating)/((eventUser?.numAvaliacoes ?? 0)+1);

        await prisma.user.update({
            where: {
                id: event.userId,
            },
            data:{
                numAvaliacoes: {
                    increment: 1,
                },
                rating: newRating
            }
        });

        return NextResponse.json(event);
    } catch (error) {
        return new NextResponse("Bad Request", { status: 400 });
    }
}
