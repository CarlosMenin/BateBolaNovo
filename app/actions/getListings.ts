import prisma from '@/app/libs/prismadb'

export default async function getListings(){
    try{
        const listings = await prisma.eventos.findMany({
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