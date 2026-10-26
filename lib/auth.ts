import { db } from './db';
import { cookies } from 'next/headers';

export interface UserSession {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  provider: string;
  createdAt: string;
}

const SESSION_COOKIE_NAME = 'krypton_session';

// Ensure default demo user exists for immediate out-of-the-box exploration
export function ensureDefaultUser(): UserSession {
  const existing = db.prepare('SELECT * FROM users WHERE id = ?').get('user_dev_default') as UserSession | undefined;
  if (existing) {
    return existing;
  }

  const now = new Date().toISOString();
  const insert = db.prepare(`
    INSERT INTO users (id, email, name, avatarUrl, provider, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  insert.run(
    'user_dev_default',
    'developer@krypton.build',
    'Developer',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    'google',
    now,
    now
  );

  return {
    id: 'user_dev_default',
    email: 'developer@krypton.build',
    name: 'Developer',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    provider: 'google',
    createdAt: now,
  };
}

export async function getCurrentUser(): Promise<UserSession> {
  const cookieStore = await cookies();
  const sessionUserId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (sessionUserId) {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(sessionUserId) as UserSession | undefined;
    if (user) {
      return user;
    }
  }

  // Fallback to guaranteed default user so experience is zero-friction
  return ensureDefaultUser();
}

export function createOrGetUser(email: string, name: string, avatarUrl?: string, provider = 'google'): UserSession {
  const existing = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as UserSession | undefined;
  if (existing) {
    return existing;
  }

  const id = `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();
  
  db.prepare(`
    INSERT INTO users (id, email, name, avatarUrl, provider, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(id, email, name, avatarUrl || '', provider, now, now);

  return {
    id,
    email,
    name,
    avatarUrl,
    provider,
    createdAt: now,
  };
}

export function verifyProjectOwnership(projectId: string, userId: string): boolean {
  const project = db.prepare('SELECT userId FROM projects WHERE id = ?').get(projectId) as { userId: string } | undefined;
  if (!project) return false;
  return project.userId === userId;
}

export { SESSION_COOKIE_NAME };
