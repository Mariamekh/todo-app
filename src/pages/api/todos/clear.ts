import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../database/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await prisma.todo.deleteMany({ where: { completed: false } });

    return res
      .status(200)
      .json({ success: true, message: 'All tasks cleared' });
  } catch (error) {
    console.error('Clear Tasks Error:', error);
    return res
      .status(500)
      .json({ message: 'Failed to clear tasks', error: error.message });
  }
}
