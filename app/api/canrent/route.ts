import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";



export async function POST(request: Request) {
    try {

        const currentUser = await getCurrentUser();


        if (!currentUser) {
            throw new Error('Invalid Reservation ID');
        }

        const listing = await prisma.eventos.findMany({
            where: {
                userId: currentUser.id,
                data: {
                  gte: new Date(),
                }
            },
        });

        return NextResponse.json(listing);
    } catch (error) {
        return new NextResponse("Bad Request", { status: 400 });
    }
}
