import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../database/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    try {
      await prisma.todo.deleteMany({ where: { completed: true } });

      return res
        .status(200)
        .json({ success: true, message: 'History cleared' });
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to clear history',
        error: (error as Error).message,
      });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
