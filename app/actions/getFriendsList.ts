import prisma from '@/app/libs/prismadb';

export interface IUserParams {
    userId?: string;
}

export default async function getFriendsList(params: IUserParams) {
    try {
        const {
            userId: encodedId
        } = params;

        const userId = decodeURIComponent(encodedId || '');

        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        });

        if (!user || !user.friends) {
            return [];
        }

        const friends = await prisma.user.findMany({
            where: {
                id: {
                    in: user.friends
                }
            }
        });

        return friends;

    } catch (error: any) {
        throw new Error(error);
    }
}
