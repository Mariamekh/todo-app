import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../database/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const userId = req.headers['x-user-id'] as string;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required in headers' });
  }

  if (req.method === 'GET') {
    try {
      const completedTasks = await prisma.todo.findMany({
        where: { userId, completed: true },
        orderBy: { createdAt: 'desc' },
      });
      return res.status(200).json(completedTasks);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch history' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
