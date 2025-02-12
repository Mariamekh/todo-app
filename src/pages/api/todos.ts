import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../database/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const userId = req.headers['x-user-id'] as string;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required in headers' });
    }

    if (req.method === 'GET') {
      const todos = await prisma.todo.findMany({
        where: { userId, completed: false },
        orderBy: { createdAt: 'desc' },
      });

      return res.status(200).json(todos);
    }

    if (req.method === 'POST') {
      const { title, description } = req.body;

      if (!title || title.trim().length === 0) {
        return res.status(400).json({ error: 'Task title is required' });
      }

      const newTask = await prisma.todo.create({
        data: {
          title: title.trim(),
          description: description?.trim() || '',
          userId,
        },
      });

      return res.status(201).json(newTask);
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}
