import Database from 'better-sqlite3';
import { NextApiRequest, NextApiResponse } from 'next';

const db = new Database('database/database.db');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const { title, description } = req.body;
      const id = parseInt(req.query.id as string, 10);
  
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Task ID is required and must be a number" });
      }
  
      const stmt = db.prepare("UPDATE todos SET title = ?, description = ? WHERE id = ?");
      stmt.run(title, description, id);
  
      return res.status(200).json({ success: true, id, title, description });
    } catch (error) {
      console.error("Database Error:", error);
      return res.status(500).json({ error: "Failed to update task" });
    }
  }
  

  if (req.method === "PATCH") {
    try {
      const { completed } = req.body;
      const id = parseInt(req.query.id as string, 10);
  
      if (!id) {
        return res.status(400).json({ error: "Task ID is required" });
      }
  
      const stmt = db.prepare("UPDATE todos SET completed = ? WHERE id = ?");
      stmt.run(completed, id);
  
      return res.status(200).json({ success: true, id, completed });
    } catch (error) {
      console.error("Database Error:", error);
      return res.status(500).json({ error: "Failed to mark task as done" });
    }
  }
  
  if (req.method === "DELETE") {
    try {
      const id = parseInt(req.query.id as string, 10);
  
      if (!id) {
        return res.status(400).json({ error: "Task ID is required" });
      }
  
      const stmt = db.prepare("DELETE FROM todos WHERE id = ?");
      stmt.run(id);
  
      return res.status(200).json({ success: true, id });
    } catch (error) {
      console.error("Database Error:", error);
      return res.status(500).json({ error: "Failed to delete task" });
    }
  }
  
  
  res.status(405).json({ message: 'Method Not Allowed' });
}
