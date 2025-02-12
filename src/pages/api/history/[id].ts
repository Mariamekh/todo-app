import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../database/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;
  const taskId = Number(id);

  if (isNaN(taskId)) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  try {
    if (req.method === 'GET') {
      const task = await prisma.todo.findUnique({
        where: { id: taskId, completed: true },
      });

      if (!task) {
        return res.status(404).json({ error: 'Task not found in history' });
      }

      return res.status(200).json(task);
    }

    if (req.method === 'DELETE') {
      const deletedTask = await prisma.todo.delete({
        where: { id: taskId, completed: true },
      });

      return res.status(200).json({
        success: true,
        message: 'Task removed from history',
        deletedTask,
      });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
