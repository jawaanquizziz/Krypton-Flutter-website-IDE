import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import fs from 'fs';

// Ensure data directory exists
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'krypton.db');

// Global database instance for Next.js hot reload safety
declare global {
  // eslint-disable-next-line no-var
  var __krypton_db__: DatabaseSync | undefined;
}

function getDatabase(): DatabaseSync {
  if (global.__krypton_db__) {
    return global.__krypton_db__;
  }

  const db = new DatabaseSync(DB_PATH);
  
  // Enable foreign keys and WAL mode for high performance and durability
  db.exec('PRAGMA foreign_keys = ON;');
  db.exec('PRAGMA journal_mode = WAL;');

  initSchema(db);

  if (process.env.NODE_ENV !== 'production') {
    global.__krypton_db__ = db;
  }

  return db;
}

function initSchema(db: DatabaseSync) {
  db.exec(`
    -- Users table
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      avatarUrl TEXT,
      provider TEXT DEFAULT 'google',
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    -- Projects table
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      template TEXT NOT NULL,
      framework TEXT DEFAULT 'Flutter',
      language TEXT DEFAULT 'Dart',
      storagePath TEXT NOT NULL,
      flutterVersion TEXT DEFAULT '3.22.0',
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      lastOpenedAt TEXT NOT NULL,
      archivedAt TEXT,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );

    -- Project Files table for persistent indexing & quick retrieval
    CREATE TABLE IF NOT EXISTS project_files (
      id TEXT PRIMARY KEY,
      projectId TEXT NOT NULL,
      path TEXT NOT NULL,
      name TEXT NOT NULL,
      type TEXT NOT NULL, -- 'file' or 'directory'
      content TEXT,
      size INTEGER DEFAULT 0,
      updatedAt TEXT NOT NULL,
      UNIQUE(projectId, path),
      FOREIGN KEY (projectId) REFERENCES projects(id) ON DELETE CASCADE
    );

    -- AI Usage Tracking table
    CREATE TABLE IF NOT EXISTS ai_usage (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      projectId TEXT,
      model TEXT NOT NULL,
      action TEXT NOT NULL,
      inputTokens INTEGER NOT NULL DEFAULT 0,
      outputTokens INTEGER NOT NULL DEFAULT 0,
      requestCount INTEGER NOT NULL DEFAULT 1,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );

    -- AI Requests log
    CREATE TABLE IF NOT EXISTS ai_requests (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      projectId TEXT NOT NULL,
      prompt TEXT NOT NULL,
      response TEXT NOT NULL,
      action TEXT NOT NULL,
      status TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );

    -- Performance Indexes
    CREATE INDEX IF NOT EXISTS idx_projects_userId ON projects(userId);
    CREATE INDEX IF NOT EXISTS idx_projects_updatedAt ON projects(updatedAt DESC);
    CREATE INDEX IF NOT EXISTS idx_project_files_projectId ON project_files(projectId);
    CREATE INDEX IF NOT EXISTS idx_ai_usage_userId ON ai_usage(userId);
  `);
}

export const db = getDatabase();
