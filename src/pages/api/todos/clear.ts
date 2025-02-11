import { NextApiRequest, NextApiResponse } from 'next';
import Database from 'better-sqlite3';

const db = new Database('database/database.db');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    db.prepare('delete from todos').run();
    res.json({ success: true });
  }
  res.status(405).json({ message: 'Method Not Allowed' });
}
