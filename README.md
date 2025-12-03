# Santa Quests

A gamified task completion platform where users earn $SANTA points by completing social media tasks, referring friends, and engaging with the Santa Browser ecosystem.

**Live Demo:** https://santa.runn.host

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Deployment:** AWS EC2 with GitHub Actions CI/CD

## Project Structure

```
src/
├── app/
│   ├── page.tsx           # Landing page (/)
│   ├── tasks/page.tsx     # Onboarding tasks page (/tasks)
│   ├── dashboard/page.tsx # Main dashboard (/dashboard)
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles & animations
├── types/
│   └── api.ts             # TypeScript interfaces for API contracts
public/
└── assets/                # Images, icons, SVGs
```

## Pages Overview

### 1. Landing Page (`/`)
- Hero section with animated snow particles
- "Login with X" CTA button
- Browser stats and platform availability
- Floating coin animations

### 2. Tasks/Onboarding Page (`/tasks`)
- **Welcome Modal:** Appears on load, explains 3X bonus points
- **Task List:** Social media tasks (Follow, Retweet, Like, Join Discord/Telegram)
- **Task Modals:** Click task to see details and complete
- **Progress Tracking:** Points counter, completion status
- **Skip to Dashboard:** Button to bypass onboarding
- Points are **tripled** during onboarding (POINTS_MULTIPLIER = 3)

### 3. Dashboard (`/dashboard`)
- **Header:** User avatar, points display, wallet connect button
- **Spin Wheel:** Daily spin for bonus points (24hr cooldown)
- **Tasks Block:** Scrollable list of available tasks
- **Leaderboard:** Top users ranked by points
- **Referral Section:** Referral code, copy link, stats

## API Integration Guide (For Backend Developers)

All TypeScript interfaces are defined in `src/types/api.ts`. The frontend currently uses **mock data** that needs to be replaced with real API calls.

### Required API Endpoints

#### Authentication
```
GET  /api/auth/twitter           → Redirect to Twitter OAuth
GET  /api/auth/twitter/callback  → Handle OAuth callback, return User
POST /api/auth/logout            → Logout user
GET  /api/auth/me                → Get current user (or 401)
```

#### Tasks
```
GET  /api/tasks                  → Return Task[]
POST /api/tasks/:id/start        → Mark task as in_progress
POST /api/tasks/:id/verify       → Verify completion, return updated Task
```

#### Referrals
```
GET  /api/referrals              → Return ReferralStats
POST /api/referrals/apply        → Apply referral code { code: string }
```

#### Leaderboard
```
GET  /api/leaderboard            → Return LeaderboardEntry[]
```

### Data Models

```typescript
// User
interface User {
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

// Task
interface Task {
  id: string;
  type: 'tweet' | 'retweet' | 'follow' | 'like';
  title: string;
  description: string;
  points: number;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  targetUrl?: string;
  targetUsername?: string;
  tweetContent?: string;
  completedAt?: string;
}

// Leaderboard Entry
interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatarUrl: string;
  points: number;
}

// Referral Stats
interface ReferralStats {
  totalReferrals: number;
  totalPointsEarned: number;
  referralCode: string;
  referralLink: string;
  referrals: Referral[];
}
```

### Mock Data Locations

Replace these with real API calls:

| File | Mock Data | Replace With |
|------|-----------|--------------|
| `src/app/tasks/page.tsx` | `MOCK_TASKS`, `MOCK_USER` | `/api/tasks`, `/api/auth/me` |
| `src/app/dashboard/page.tsx` | `MOCK_TASKS`, `MOCK_USER`, `MOCK_LEADERBOARD`, `MOCK_REFERRALS` | Real API endpoints |

### Task Verification Flow

1. User clicks task → Opens task modal
2. User clicks action button → Opens Twitter/Discord/Telegram in new tab
3. Frontend calls `POST /api/tasks/:id/start`
4. After action, frontend calls `POST /api/tasks/:id/verify`
5. Backend verifies via Twitter API (check follow status, retweet, etc.)
6. Backend updates task status and user points
7. Frontend updates UI

### Points System

- **Onboarding:** All points are **3X** (controlled by `POINTS_MULTIPLIER`)
- **Daily Spin:** Random points from wheel segments
- **Referrals:** Points per successful referral

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Create `.env.local` for local development:

```env
# API Base URL (for backend integration)
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Twitter OAuth (handled by backend, but may need for redirects)
NEXT_PUBLIC_TWITTER_CLIENT_ID=your_client_id
```

## Deployment

The project uses GitHub Actions for CI/CD. On push to `main`:
1. Build runs on GitHub Actions
2. Built files are copied to EC2 via SCP
3. PM2 restarts the application
4. Nginx proxies port 80 → 3000

### Manual Deployment

```bash
# SSH to EC2
ssh -i your-key.pem ubuntu@your-ec2-ip

# Navigate to app
cd ~/santa-quests-live

# Pull latest (if using git on server)
git pull

# Install & build
npm install
npm run build

# Restart PM2
pm2 restart santa-quests
```

## UI Components

### Custom CSS Classes (globals.css)

- `.santa-button-gradient` - Red gradient for primary buttons
- `.cta-gradient-move` - Animated gradient button (used for CTAs)
- `.custom-scrollbar` - Sleek red scrollbar styling
- `.coin-1` to `.coin-5` - Floating coin animations

### Color Palette

```css
--primary-red: #B13434
--primary-red-light: #D84F4F
--background-dark: #050508
--background-card: rgba(15,15,20,0.9)
--border-subtle: rgba(255,255,255,0.1)
```

## Notes for Backend Integration

1. **CORS:** Enable CORS for frontend domain
2. **Auth:** Use HTTP-only cookies for session management
3. **Twitter API:** Need Twitter Developer account for OAuth and task verification
4. **Rate Limiting:** Implement rate limiting on task verification endpoints
5. **Points Validation:** Server-side validation for all point awards

## License

Private - All rights reserved
