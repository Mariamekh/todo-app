import Database from 'better-sqlite3';
import { NextApiRequest, NextApiResponse } from 'next';

const db = new Database('database/database.db');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { title, description } = req.body;

    db.prepare('update todos set title = ?, description = ? where id = ?').run(
      title,
      description,
      id
    );

    res.json({ success: true });
  }

  if (req.method === 'DELETE') {
    db.prepare('delete from todos where id = ? ').run(id);
    res.json({ success: true });
  }

  if (req.method === 'PATCH') {
    db.prepare('update todos set done = 1 where id = ?').run(id);
    res.json({ success: true });
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
