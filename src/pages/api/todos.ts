import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../database/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const todos = await prisma.todo.findMany({
        where: { completed: false },
        orderBy: { createdAt: 'desc' },
      });
      return res.status(200).json(todos);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch tasks' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { title, description } = req.body;
      if (!title) return res.status(400).json({ error: 'Title is required' });

      const newTodo = await prisma.todo.create({
        data: {
          title,
          description: description || '',
        },
      });

      return res.status(201).json(newTodo);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to add task' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
