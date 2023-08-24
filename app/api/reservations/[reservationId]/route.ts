import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    reservationId?: string;
};

export async function DELETE(
    request: Request,
    {params}: {params: IParams}
) {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const {reservationId} = params;

    if(!reservationId || typeof reservationId !== "string"){
        throw new Error('ID Inválido');
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

    // Check if the current user is allowed to delete the reservation
    if (reservation.userId !== currentUser.id && reservation.eventos.userId !== currentUser.id) {
        return new NextResponse("Unauthorized.", { status: 403 });
    }

    // Decrement the number of confirmados by 1
    await prisma.eventos.update({
        where: {
            id: reservation.eventos.id,
        },
        data: {
            numConfirmados: {
                decrement: 1,
            },
        },
    });

    await prisma.confirmacoes.delete({
        where: {
            id: reservationId,
        },
    });

    const payments = await prisma.confirmacoes.updateMany({
        where: {
            id: reservation.id,
        },
        data:{
            isPaid: false,
        }
    })

    return NextResponse.json(reservation);
}
