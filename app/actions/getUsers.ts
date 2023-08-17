import prisma from '@/app/libs/prismadb'
import { Range } from "react-date-range";
import { formatISO } from 'date-fns';
import { Url } from 'next/dist/shared/lib/router/router';

export interface IUserParams {
    name?: string;
}

export default async function getUsers(
    params: IUserParams
){
    try{
        const {
        name: encodedName
        } = params;

        const name = decodeURIComponent(encodedName || '');

        const user = await prisma.user.findFirst({
            where: {
                name: name
            }
        })

        if (!user) {
            return null;
        }

        return {
            ...user,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            emailVerified: user.emailVerified?.toISOString() || null,
        };
    }catch(error:any){
        throw new Error(error);
    }
}