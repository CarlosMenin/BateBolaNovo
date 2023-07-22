import prisma from '@/app/libs/prismadb'

export default async function getListings(){
    try{
        const listings = await prisma.eventos.findMany({
            orderBy:{
                created_at: 'desc'
            }
        });

        return listings;
    }catch(error:any){
        throw new Error(error);
    }
}