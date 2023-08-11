import prisma from '@/app/libs/prismadb'
import { Range } from "react-date-range";
import { formatISO } from 'date-fns';

export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    price?: number;
    address?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    city?: string
}

export default async function getListings(
    params: IListingsParams
){
    try{
        const {
        userId,
        guestCount,
        price,
        address,
        category,
        startDate,
        endDate,
        locationValue,
        city
        } = params;

        let query: any = {};

        if(userId){
            query.userId = userId;
        }

        if(guestCount){
            (query.numPessoas) = {
                gte: +guestCount
            }
        }
        
        if(category){
            query.category = category;
        }

        if(locationValue){
            query.local = locationValue;
        }

        if (startDate && endDate) {
            const adjustedEndDate = new Date(endDate);
            adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);
        
            query.data = {
                gte: startDate,
                lte: formatISO(adjustedEndDate),
            };
        } else {
            if (startDate) query.data = startDate;
            else query.data = endDate;
        }

        if(price){
            query.preco = {
                lte: +price
            }
            console.log(city);
        }

        if(city){
            query.cidade = city;
            console.log(city);
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