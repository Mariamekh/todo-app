import { NextApiRequest, NextApiResponse } from 'next';
import Database from 'better-sqlite3';

const db = new Database('database/database.db');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const completedTasks = db
        .prepare('SELECT * FROM todos WHERE completed = 1')
        .all();
      res.status(200).json(completedTasks);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to fetch history', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
