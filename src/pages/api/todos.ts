import { NextApiRequest, NextApiResponse } from 'next';
import Database from 'better-sqlite3';

const db = Database('database/database.db');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const todos = db.prepare('SELECT * FROM todos WHERE done = 0').all();
    res.json(todos);
  }

  if (req.method === 'POST') {
    const { title, description } = req.body;
    const stmt = db.prepare(
      'INSERT INTO todos (title, description)  VALUES (?, ?)")'
    );
    stmt.run(title, description);
    res.json({ success: true });
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
