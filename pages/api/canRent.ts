import prisma from '@/app/libs/prismadb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  try {
    if (!userId) {
      return res.status(400).json({ error: 'UserId is required.' });
    }

    const currentDate = new Date();

    // Modifique a consulta para considerar apenas eventos futuros
    const listings = await prisma.eventos.findMany({
      where: {
        userId: userId.toString(),
        horario: {
          gte: currentDate
        }
      }
    });

    if (listings.length > 0) {
      return res.status(400).json({ error: 'User has pending events.' });
    } else {
      return res.status(200).json({ canRent: true });
    }

  } catch (error) {
    return res.status(500).json({ error: 'Internal server error.' });
  }
}