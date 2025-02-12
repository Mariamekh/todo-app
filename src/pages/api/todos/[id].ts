import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../database/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;

  if (!id || Array.isArray(id))
    return res.status(400).json({ error: 'Invalid ID' });

  const taskId = parseInt(id, 10);

  if (req.method === 'PUT') {
    try {
      const { title, description } = req.body;
      const updatedTodo = await prisma.todo.update({
        where: { id: taskId },
        data: { title, description },
      });
      return res.status(200).json(updatedTodo);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to update task' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.todo.delete({ where: { id: taskId } });
      return res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete task' });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const updatedTodo = await prisma.todo.update({
        where: { id: taskId },
        data: { completed: true },
      });
      return res.status(200).json(updatedTodo);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to mark task as done' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
