import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../database/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { id } = req.query;
    const userId = req.headers['x-user-id'] as string;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required in headers' });
    }

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: 'Invalid task ID' });
    }

    const taskId = parseInt(id, 10);

    if (isNaN(taskId)) {
      return res.status(400).json({ error: 'Task ID must be a number' });
    }

    const task = await prisma.todo.findFirst({
      where: { id: taskId, userId },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found or access denied' });
    }

    if (req.method === 'PUT') {
      const { title, description } = req.body;

      const updatedTodo = await prisma.todo.update({
        where: { id: taskId },
        data: { title, description },
      });

      return res.status(200).json(updatedTodo);
    }

    if (req.method === 'DELETE') {
      await prisma.todo.delete({
        where: { id: taskId },
      });

      return res.status(200).json({ message: 'Task deleted successfully' });
    }

    if (req.method === 'PATCH') {
      const updatedTodo = await prisma.todo.update({
        where: { id: taskId },
        data: { completed: true },
      });

      return res.status(200).json(updatedTodo);
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
