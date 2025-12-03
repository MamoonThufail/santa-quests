/**
 * API Types for Santa Quests
 * These interfaces define the expected API contracts for backend developers
 */

// ============== USER ==============
export interface User {
  id: string;
  twitterId: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  points: number;
  referralCode: string;
  referredBy?: string;
  createdAt: string;
}

// ============== TASKS ==============
export type TaskType = 'tweet' | 'retweet' | 'follow' | 'like';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

export interface Task {
  id: string;
  type: TaskType;
  title: string;
  description: string;
  points: number;
  status: TaskStatus;
  targetUrl?: string;        // URL to tweet/account to follow
  targetUsername?: string;   // @username for follow tasks
  tweetContent?: string;     // Pre-filled tweet content for tweet tasks
  completedAt?: string;
}

// ============== REFERRALS ==============
export interface Referral {
  id: string;
  referredUserId: string;
  referredUsername: string;
  referredAvatarUrl: string;
  pointsEarned: number;
  createdAt: string;
}

export interface ReferralStats {
  totalReferrals: number;
  totalPointsEarned: number;
  referralCode: string;
  referralLink: string;
  referrals: Referral[];
}

// ============== API RESPONSES ==============
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ============== API ENDPOINTS (for backend devs) ==============
/**
 * Backend should implement these endpoints:
 *
 * AUTH:
 * - GET  /api/auth/twitter          -> Redirects to Twitter OAuth
 * - GET  /api/auth/twitter/callback -> Handles OAuth callback, returns User
 * - POST /api/auth/logout           -> Logs out user
 * - GET  /api/auth/me               -> Returns current User or 401
 *
 * TASKS:
 * - GET  /api/tasks                 -> Returns Task[]
 * - POST /api/tasks/:id/start       -> Marks task as in_progress
 * - POST /api/tasks/:id/verify      -> Verifies task completion, returns updated Task
 *
 * REFERRALS:
 * - GET  /api/referrals             -> Returns ReferralStats
 * - POST /api/referrals/apply       -> Apply referral code { code: string }
 *
 * LEADERBOARD:
 * - GET  /api/leaderboard           -> Returns LeaderboardEntry[]
 */

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatarUrl: string;
  points: number;
}
