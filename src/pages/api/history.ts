import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../database/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const completedTodos = await prisma.todo.findMany({
        where: { completed: true },
        orderBy: { createdAt: 'desc' },
      });
      return res.status(200).json(completedTodos);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch history' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.todo.deleteMany({ where: { completed: true } });
      return res.status(200).json({ message: 'History cleared' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to clear history' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
