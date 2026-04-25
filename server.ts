import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Database from "better-sqlite3";
import fs from "fs";

// Initialize SQLite database
const dbDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir);
}
const db = new Database(path.join(dbDir, "sonorix.db"));

// Set up tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    balance INTEGER DEFAULT 0,
    followers INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS tracks (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    title TEXT NOT NULL,
    genre TEXT,
    status TEXT DEFAULT 'draft',
    plays INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS streams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    track_id TEXT,
    user_id TEXT,
    earnings REAL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(track_id) REFERENCES tracks(id)
  );
`);

// Insert default user if not exists
const defaultUser = db.prepare('SELECT * FROM users WHERE id = ?').get('user-1');
if (!defaultUser) {
  db.prepare('INSERT INTO users (id, name, username, balance, followers) VALUES (?, ?, ?, ?, ?)').run(
    'user-1', 'João Produtor', 'joaoprodutor', 4500, 12500
  );
}

// Insert default tracks if not exists
const trackCount = db.prepare('SELECT COUNT(*) as count FROM tracks WHERE user_id = ?').get('user-1') as { count: number };
if (trackCount.count === 0) {
  const stmt = db.prepare('INSERT INTO tracks (id, user_id, title, genre, status, plays) VALUES (?, ?, ?, ?, ?, ?)');
  stmt.run('track-1', 'user-1', 'Noites em Luanda', 'Afrohouse', 'live', 1200000);
  stmt.run('track-2', 'user-1', 'Vibe Infinita', 'Lo-Fi', 'processing', 0);
}


async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API Routes ---

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/user", (req, res) => {
    try {
      const user = db.prepare('SELECT * FROM users WHERE id = ?').get('user-1');
      res.json(user);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  });

  app.get("/api/tracks", (req, res) => {
    try {
      const tracks = db.prepare('SELECT * FROM tracks WHERE user_id = ? ORDER BY created_at DESC').all('user-1');
      res.json(tracks);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Erro ao buscar faixas" });
    }
  });

  app.post("/api/tracks", (req, res) => {
    try {
      const { title, genre } = req.body;
      const id = 'track-' + Date.now();
      db.prepare('INSERT INTO tracks (id, user_id, title, genre, status) VALUES (?, ?, ?, ?, ?)').run(
        id, 'user-1', title, genre, 'processing'
      );
      res.json({ success: true, id });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Erro ao criar faixa" });
    }
  });


  // --- Vite / Frontend Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve dist folder
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
