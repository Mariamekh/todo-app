import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../database/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const userId = req.headers['x-user-id'] as string;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required in headers' });
  }

  try {
    const existingTasks = await prisma.todo.findMany({
      where: { completed: false, userId },
    });

    if (existingTasks.length === 0) {
      return res.status(404).json({ error: 'No tasks found to clear' });
    }

    await prisma.todo.deleteMany({ where: { completed: false, userId } });

    return res
      .status(200)
      .json({ success: true, message: 'All tasks cleared' });
  } catch (error) {
    console.error('Clear Tasks Error:', error);
    return res.status(500).json({ error: 'Failed to clear tasks' });
  }
}
