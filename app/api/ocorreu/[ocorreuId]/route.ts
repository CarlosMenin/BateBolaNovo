import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    reservationId?: string;
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { reservationId } = params;

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

    // Check if the current user is allowed to perform the action
    if (event.userId !== currentUser.id) {
        return new NextResponse("Unauthorized.", { status: 403 });
    }

    // Increment the numOcorreu property by 1
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
}
