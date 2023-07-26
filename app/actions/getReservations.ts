import prisma from '@/app/libs/prismadb';

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservations(
    params: IParams
){
    try{
        const {listingId,userId,authorId} = params;

        const query: any = {};


        if(listingId){
            query.eventosId = listingId;
        }
        if(userId){
            query.userId = userId;
        }
        if(authorId){
            query.eventos = {userId:authorId}
        }

        const reservations = await prisma.confirmacoes.findMany({
            where: query,
            include: {
                eventos: true,
            },
            orderBy: {
                created_at: 'desc'
            }
        });
        
        const safeReservations = reservations.map((reservation) => ({
            ...reservation,
            created_at: reservation.created_at.toISOString(),
            dataEvento: reservation.dataEvento.toISOString(),
            horarioEvento: reservation.horarioEvento.toISOString(),
            eventos: {
                ...reservation.eventos,
                created_at: reservation.eventos.created_at.toISOString(),
            }
        })
        );
        return safeReservations;
    }
    catch (error: any) {
        throw new Error(error);
    }
}