import prisma from '@/app/libs/prismadb'

export interface IListingsParams {
    userId?: string;
}

export default async function getListings(
    params: IListingsParams
){
    try{
        const { userId } = params;

        let query: any = {};

        if(userId){
            query.userId = userId;
        }

        const listings = await prisma.eventos.findMany({
            where: query,
            orderBy:{
                created_at: 'desc'
            }
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            created_at: listing.created_at.toISOString(),
        }));

        return safeListings;
    }catch(error:any){
        throw new Error(error);
    }
}