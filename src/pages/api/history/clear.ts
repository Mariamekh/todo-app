import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../database/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const userId = req.headers['x-user-id'] as string;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    await prisma.todo.deleteMany({ where: { completed: true, userId } });

    return res
      .status(200)
      .json({ success: true, message: 'All completed tasks cleared' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to clear history' });
  }
}
