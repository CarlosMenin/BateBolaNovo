import prisma from "@/app/libs/prismadb"

interface IParams {
    listingId?: string;
}

export default async function getListingById(
    params: IParams
){
    try{
        const {listingId} = params;

        const listing = await prisma.eventos.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        });

        if(!listing){
            return null;
        }
        return {
            ...listing,
            created_at: listing.created_at.toISOString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified:
                    listing.user.emailVerified?.toISOString() || null,
            }
        };
    } catch(error: any){
        throw new Error(error);
    }
}