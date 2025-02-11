import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database', 'database.db');
const db = new sqlite3(dbPath);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      console.log('Incoming Request Body:', req.body);

      const { title, description } = req.body;

      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }

      const safeDescription = description?.trim() || '';

      const stmt = db.prepare(
        'INSERT INTO todos (title, description, completed) VALUES (?, ?, ?)',
      );
      const result = stmt.run(title, safeDescription, 0);

      return res
        .status(201)
        .json({ id: result.lastInsertRowid, title, description, completed: 0 });
    } catch (error) {
      console.error('Database Error:', error);
      return res.status(500).json({ error: 'Database Error' });
    }
  }

  if (req.method === 'GET') {
    try {
      const todos = db.prepare('SELECT * FROM todos WHERE completed = 0').all();
      return res.status(200).json(todos);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
