import { NextApiRequest, NextApiResponse } from 'next';
import Database from 'better-sqlite3';

const db = new Database('database/database.db');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      db.prepare('DELETE FROM todos WHERE completed = 1').run();
      return res
        .status(200)
        .json({ success: true, message: 'History cleared' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Failed to clear history', error: error.message });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
