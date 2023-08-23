import prisma from '@/app/libs/prismadb';

export interface IUserParams {
    id?: string;
}

export default async function getUserById(params: IUserParams) {
    try {
        const {
            id: encodedName
        } = params;

        const id = decodeURIComponent(encodedName || '');

        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        });

        if (!user) {
            return null;
        }

        const blockedUsers = user.blockedUsers || [];

        return blockedUsers;
    } catch (error: any) {
        throw new Error(error);
    }
}
