"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

// ============== ICONS ==============
function XLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function CopyIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GiftIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 3c-1.27 0-2.4.8-2.82 2H4c-1.1 0-2 .9-2 2v3h20V7c0-1.1-.9-2-2-2h-5.18C14.4 3.8 13.27 3 12 3zm0 2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
      <path d="M2 12v8c0 1.1.9 2 2 2h7v-10H2zm20 0h-9v10h7c1.1 0 2-.9 2-2v-8z"/>
    </svg>
  );
}

function SpinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c.83 0 1.5.67 1.5 1.5S12.83 8 12 8s-1.5-.67-1.5-1.5S11.17 5 12 5zm4.95 2.05c.59.59.59 1.54 0 2.12-.59.59-1.54.59-2.12 0-.59-.59-.59-1.54 0-2.12.58-.59 1.53-.59 2.12 0zM19 12c0 .83-.67 1.5-1.5 1.5S16 12.83 16 12s.67-1.5 1.5-1.5S19 11.17 19 12zm-2.05 4.95c-.59.59-1.54.59-2.12 0-.59-.59-.59-1.54 0-2.12.59-.59 1.54-.59 2.12 0 .59.58.59 1.53 0 2.12zM12 19c-.83 0-1.5-.67-1.5-1.5S11.17 16 12 16s1.5.67 1.5 1.5S12.83 19 12 19zm-4.95-2.05c-.59-.59-.59-1.54 0-2.12.59-.59 1.54-.59 2.12 0 .59.59.59 1.54 0 2.12-.58.59-1.53.59-2.12 0zM5 12c0-.83.67-1.5 1.5-1.5S8 11.17 8 12s-.67 1.5-1.5 1.5S5 12.83 5 12zm2.05-4.95c.59-.59 1.54-.59 2.12 0 .59.59.59 1.54 0 2.12-.59.59-1.54.59-2.12 0-.59-.58-.59-1.53 0-2.12zM12 10c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
    </svg>
  );
}

function UsersIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>
  );
}

function SendIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

function LinkIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RetweetIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
    </svg>
  );
}

function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function DiscordIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function TelegramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function DownloadIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrophyIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
    </svg>
  );
}

function TasksIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  );
}

function PostIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
    </svg>
  );
}

// ============== TYPES ==============
interface Task {
  id: string;
  type: "follow" | "retweet" | "like" | "discord" | "telegram" | "download";
  title: string;
  description: string;
  points: number;
  status: "pending" | "completed";
}

interface Gift {
  id: string;
  name: string;
  pointsRequired: number;
  referralsRequired: number;
  reward: string;
  isUnlocked: boolean;
  isClaimed: boolean;
}

interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  isCurrentUser?: boolean;
}

// ============== MOCK DATA ==============
const MOCK_USER = {
  username: "cryptouser",
  avatarUrl: "",
  points: 1250,
  referralCode: "SANTA2024",
  totalReferrals: 3,
};

const MOCK_TASKS: Task[] = [
  { id: "1", type: "follow", title: "Follow Santa", description: "Follow @SantaBrowser on X", points: 100, status: "completed" },
  { id: "2", type: "retweet", title: "Retweet This Post", description: "Spread the word", points: 75, status: "pending" },
  { id: "3", type: "like", title: "Like This Post", description: "Show some love", points: 50, status: "pending" },
  { id: "4", type: "discord", title: "Join Discord", description: "Join our community", points: 100, status: "completed" },
  { id: "5", type: "telegram", title: "Join Telegram", description: "Get updates", points: 100, status: "pending" },
  { id: "6", type: "download", title: "Download Santa Browser", description: "Get Santa Browser on your device", points: 200, status: "pending" },
];

const MOCK_GIFTS: Gift[] = [
  { id: "1", name: "Starter Gift", pointsRequired: 500, referralsRequired: 0, reward: "100 Bonus Points", isUnlocked: true, isClaimed: true },
  { id: "2", name: "Bronze Gift", pointsRequired: 1000, referralsRequired: 0, reward: "250 Bonus Points", isUnlocked: true, isClaimed: false },
  { id: "3", name: "Silver Gift", pointsRequired: 2500, referralsRequired: 0, reward: "500 Bonus Points", isUnlocked: false, isClaimed: false },
  { id: "4", name: "Gold Gift", pointsRequired: 5000, referralsRequired: 0, reward: "1000 Bonus Points", isUnlocked: false, isClaimed: false },
  { id: "5", name: "Referral Gift", pointsRequired: 0, referralsRequired: 5, reward: "Mystery Box", isUnlocked: false, isClaimed: false },
];

const SPIN_SEGMENTS = [
  { label: "50", points: 50, color: "#B13434" },
  { label: "10", points: 10, color: "#1a1a2e" },
  { label: "100", points: 100, color: "#D84F4F" },
  { label: "25", points: 25, color: "#1a1a2e" },
  { label: "200", points: 200, color: "#B13434" },
  { label: "5", points: 5, color: "#1a1a2e" },
  { label: "75", points: 75, color: "#D84F4F" },
  { label: "15", points: 15, color: "#1a1a2e" },
];

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 42, username: "cryptouser", points: 1250, isCurrentUser: true },
  { rank: 1, username: "santa_whale", points: 15420 },
  { rank: 2, username: "crypto_elf", points: 12890 },
  { rank: 3, username: "north_pole", points: 11250 },
  { rank: 4, username: "gift_hunter", points: 9870 },
  { rank: 5, username: "snowflake_x", points: 8540 },
  { rank: 6, username: "jingle_bells", points: 7230 },
  { rank: 7, username: "frosty_dev", points: 6890 },
  { rank: 8, username: "rudolph_nft", points: 5670 },
  { rank: 9, username: "winter_sol", points: 4520 },
  { rank: 10, username: "polar_bear", points: 3890 },
];

// ============== COMPONENTS ==============

// Animated light bulbs around elements
function LightBulbs({ count = 20, radius = 120, active = true }: { count?: number; radius?: number; active?: boolean }) {
  const colors = ["#ff0000", "#00ff00", "#ffff00", "#ff00ff", "#00ffff", "#ff8800", "#ff0088"];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const color = colors[i % colors.length];
        const delay = i * 0.1;

        return (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `calc(50% + ${Math.cos(angle) * radius}px - 6px)`,
              top: `calc(50% + ${Math.sin(angle) * radius}px - 6px)`,
              backgroundColor: active ? color : "#333",
              boxShadow: active ? `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}` : "none",
              animation: active ? `bulb-blink 0.5s ease-in-out ${delay}s infinite alternate` : "none",
              transition: "all 0.3s ease",
            }}
          />
        );
      })}
    </div>
  );
}

// Spinning wheel component
function SpinWheel({ onSpinComplete }: { onSpinComplete: (points: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [canSpin, setCanSpin] = useState(true);
  const [lastSpinTime, setLastSpinTime] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [showResult, setShowResult] = useState<number | null>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-centerX, -centerY);

    const segmentAngle = (2 * Math.PI) / SPIN_SEGMENTS.length;

    SPIN_SEGMENTS.forEach((segment, i) => {
      const startAngle = i * segmentAngle - Math.PI / 2;
      const endAngle = startAngle + segmentAngle;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, segment.color);
      gradient.addColorStop(1, segment.color === "#1a1a2e" ? "#0a0a15" : segment.color);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.strokeStyle = "rgba(255,255,255,0.3)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + segmentAngle / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.font = "bold 20px Poppins, sans-serif";
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 4;
      ctx.fillText(segment.label, radius - 25, 7);
      ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(centerX, centerY, 35, 0, Math.PI * 2);
    const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 35);
    centerGradient.addColorStop(0, "#fff");
    centerGradient.addColorStop(1, "#ddd");
    ctx.fillStyle = centerGradient;
    ctx.fill();
    ctx.strokeStyle = "#B13434";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.restore();
  }, [rotation]);

  useEffect(() => {
    if (!lastSpinTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = 24 * 60 * 60 * 1000 - (now.getTime() - lastSpinTime.getTime());

      if (diff <= 0) {
        setCanSpin(true);
        setTimeRemaining("");
        clearInterval(interval);
      } else {
        const hours = Math.floor(diff / (60 * 60 * 1000));
        const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((diff % (60 * 1000)) / 1000);
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastSpinTime]);

  const spin = () => {
    if (isSpinning || !canSpin) return;

    setIsSpinning(true);
    setShowResult(null);

    const winningIndex = Math.floor(Math.random() * SPIN_SEGMENTS.length);
    const segmentAngle = 360 / SPIN_SEGMENTS.length;
    const targetRotation = 360 * 5 + (360 - winningIndex * segmentAngle - segmentAngle / 2);

    let currentRotation = rotation;
    const duration = 5000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);

      currentRotation = rotation + (targetRotation - rotation) * easeOut;
      setRotation(currentRotation % 360);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        setCanSpin(false);
        setLastSpinTime(new Date());
        setShowResult(SPIN_SEGMENTS[winningIndex].points);
        onSpinComplete(SPIN_SEGMENTS[winningIndex].points);
      }
    };

    animate();
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative">
        <LightBulbs count={28} radius={160} active={isSpinning || showResult !== null} />

        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
          <div
            className="w-0 h-0 border-l-[18px] border-r-[18px] border-t-[35px] border-l-transparent border-r-transparent border-t-white"
            style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}
          />
        </div>

        <canvas ref={canvasRef} width={300} height={300} className="relative z-10" />

        {isSpinning && (
          <div
            className="absolute inset-0 rounded-full z-0"
            style={{
              background: "radial-gradient(circle, rgba(177,52,52,0.4) 0%, transparent 70%)",
              animation: "pulse 0.5s ease-in-out infinite",
            }}
          />
        )}
      </div>

      <AnimatePresence>
        {showResult !== null && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
          >
            <div
              className="px-8 py-4 rounded-2xl text-white font-bold text-3xl"
              style={{
                background: "linear-gradient(135deg, #B13434 0%, #D84F4F 100%)",
                boxShadow: "0 0 30px rgba(177,52,52,0.8), 0 0 60px rgba(177,52,52,0.4)",
              }}
            >
              +{showResult} Points!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={spin}
        disabled={isSpinning || !canSpin}
        className={`mt-8 px-10 py-4 rounded-full font-bold text-lg text-white transition-all ${
          canSpin && !isSpinning
            ? "bg-gradient-to-r from-[#B13434] to-[#D84F4F] hover:shadow-lg hover:shadow-red-500/30 cursor-pointer"
            : "bg-gray-600 cursor-not-allowed opacity-50"
        }`}
      >
        {isSpinning ? "Spinning..." : canSpin ? "SPIN NOW!" : `Next spin in ${timeRemaining}`}
      </button>
    </div>
  );
}

// Gift box component for modal
function GiftBox({ gift, onClaim }: { gift: Gift; onClaim: (gift: Gift) => void }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(gift.isClaimed);

  const handleClick = () => {
    if (!gift.isUnlocked || gift.isClaimed || isOpening) return;

    setIsOpening(true);
    setTimeout(() => {
      setIsOpened(true);
      setIsOpening(false);
      onClaim(gift);
    }, 1500);
  };

  const progress = gift.referralsRequired > 0
    ? (MOCK_USER.totalReferrals / gift.referralsRequired) * 100
    : (MOCK_USER.points / gift.pointsRequired) * 100;

  return (
    <motion.div
      className={`relative p-4 rounded-2xl border transition-all cursor-pointer ${
        gift.isUnlocked && !gift.isClaimed
          ? "border-[#B13434]/50 hover:border-[#B13434]"
          : gift.isClaimed
          ? "border-white/20 bg-white/5"
          : "border-white/10 opacity-60"
      }`}
      style={{
        background: gift.isUnlocked && !gift.isClaimed
          ? "linear-gradient(135deg, rgba(177,52,52,0.1) 0%, rgba(26,30,33,0.8) 100%)"
          : "rgba(26,30,33,0.6)",
      }}
      onClick={handleClick}
      whileHover={gift.isUnlocked && !gift.isClaimed ? { scale: 1.02 } : {}}
      whileTap={gift.isUnlocked && !gift.isClaimed ? { scale: 0.98 } : {}}
    >
      {gift.isUnlocked && !gift.isClaimed && (
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 50% 0%, rgba(177,52,52,0.3) 0%, transparent 50%)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 3) * 20}%`,
                animation: `sparkle 1.5s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10">
        <div className={`relative w-16 h-16 mx-auto mb-3 ${isOpening ? "animate-shake" : ""}`}>
          <motion.div
            animate={isOpened ? { rotateX: -120, y: -20 } : { rotateX: 0, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
            style={{ transformOrigin: "top center" }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-6 rounded-t-lg"
              style={{
                background: gift.isUnlocked
                  ? "linear-gradient(135deg, #B13434 0%, #D84F4F 100%)"
                  : "#444",
              }}
            />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-6 bg-white/80" />
          </motion.div>

          <div
            className="absolute bottom-0 left-0 right-0 h-10 rounded-b-lg"
            style={{
              background: gift.isUnlocked
                ? "linear-gradient(180deg, #8a2828 0%, #6a1f1f 100%)"
                : "#333",
            }}
          />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-10 bg-white/60" />

          {isOpened && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div
                className="w-8 h-8 rounded-full"
                style={{
                  background: "radial-gradient(circle, #fff 0%, rgba(177,52,52,0.5) 50%, transparent 70%)",
                  boxShadow: "0 0 20px rgba(255,255,255,0.8)",
                }}
              />
            </motion.div>
          )}
        </div>

        <h4 className="text-white font-semibold text-sm text-center mb-1">{gift.name}</h4>
        <p className="text-white/50 text-xs text-center mb-2">{gift.reward}</p>

        {gift.isClaimed ? (
          <div className="flex items-center justify-center gap-1 text-white/60 text-xs">
            <CheckIcon className="w-3 h-3" />
            <span>Claimed</span>
          </div>
        ) : !gift.isUnlocked ? (
          <div className="space-y-1">
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background: "linear-gradient(90deg, #B13434 0%, #D84F4F 100%)",
                }}
              />
            </div>
            <p className="text-white/40 text-xs text-center">
              {gift.referralsRequired > 0
                ? `${MOCK_USER.totalReferrals}/${gift.referralsRequired} referrals`
                : `${MOCK_USER.points}/${gift.pointsRequired} points`
              }
            </p>
          </div>
        ) : (
          <div className="text-center">
            <span className="text-[#D84F4F] text-xs font-medium">Tap to open!</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Task item component
function TaskItem({ task }: { task: Task }) {
  const getIcon = () => {
    switch (task.type) {
      case "follow": return <XLogo className="w-4 h-4" />;
      case "retweet": return <RetweetIcon className="w-4 h-4" />;
      case "like": return <HeartIcon className="w-4 h-4" />;
      case "discord": return <DiscordIcon className="w-4 h-4" />;
      case "telegram": return <TelegramIcon className="w-4 h-4" />;
      case "download": return <DownloadIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all ${
      task.status === "completed"
        ? "border-white/5 bg-white/[0.02]"
        : "border-white/[0.06] bg-white/[0.03] hover:border-[#B13434]/30 cursor-pointer"
    }`}>
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
        task.status === "completed" ? "bg-white/10 text-white/50" : "bg-white/5 text-white/70"
      }`}>
        {task.status === "completed" ? <CheckIcon className="w-3.5 h-3.5" /> : getIcon()}
      </div>
      <h4 className={`flex-1 text-sm font-medium truncate ${task.status === "completed" ? "text-white/40" : "text-white"}`}>
        {task.title}
      </h4>
      <span className={`text-sm font-semibold shrink-0 ${task.status === "completed" ? "text-white/30" : "text-white"}`}>
        +{task.points}
      </span>
    </div>
  );
}

// ============== MODALS ==============

// Spin Modal
function SpinModal({ isOpen, onClose, onSpinComplete }: { isOpen: boolean; onClose: () => void; onSpinComplete: (points: number) => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative z-10 w-full max-w-md p-8 rounded-3xl border border-white/10"
            style={{ background: "linear-gradient(135deg, rgba(15,15,20,0.98) 0%, rgba(5,5,8,0.99) 100%)" }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <CloseIcon className="w-5 h-5 text-white" />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-1">Santa's Spin</h2>
              <p className="text-white/50 text-sm">Spin once every 24 hours to win points!</p>
            </div>

            <SpinWheel onSpinComplete={onSpinComplete} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Gifts Modal
function GiftsModal({ isOpen, onClose, gifts, onClaimGift }: { isOpen: boolean; onClose: () => void; gifts: Gift[]; onClaimGift: (gift: Gift) => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative z-10 w-full max-w-lg p-6 rounded-3xl border border-white/10"
            style={{ background: "linear-gradient(135deg, rgba(15,15,20,0.98) 0%, rgba(5,5,8,0.99) 100%)" }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <CloseIcon className="w-5 h-5 text-white" />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-1">Santa's Gifts</h2>
              <p className="text-white/50 text-sm">Unlock rewards as you progress!</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {gifts.map((gift) => (
                <GiftBox key={gift.id} gift={gift} onClaim={onClaimGift} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// TweetScout Info Modal
function TweetScoutInfoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative z-10 w-full max-w-sm p-6 rounded-2xl border border-white/10"
            style={{ background: "linear-gradient(135deg, rgba(15,15,20,0.98) 0%, rgba(5,5,8,0.99) 100%)" }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <CloseIcon className="w-4 h-4 text-white" />
            </button>

            <div className="text-center mb-5">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#B13434] to-[#D84F4F] flex items-center justify-center">
                <XLogo className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-lg font-bold text-white mb-1">How Post & Earn Works</h2>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-6 h-6 shrink-0 rounded-full bg-[#B13434]/20 flex items-center justify-center text-xs font-bold text-[#D84F4F]">1</div>
                <div>
                  <p className="text-sm text-white font-medium">Post about Santa Browser</p>
                  <p className="text-xs text-white/50">Share your thoughts, reviews, or content about us on X</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 shrink-0 rounded-full bg-[#B13434]/20 flex items-center justify-center text-xs font-bold text-[#D84F4F]">2</div>
                <div>
                  <p className="text-sm text-white font-medium">Submit your post link</p>
                  <p className="text-xs text-white/50">Paste the link to your X post in the input field</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 shrink-0 rounded-full bg-[#B13434]/20 flex items-center justify-center text-xs font-bold text-[#D84F4F]">3</div>
                <div>
                  <p className="text-sm text-white font-medium">Earn based on TweetScout score</p>
                  <p className="text-xs text-white/50">Higher TweetScout score = more points per post</p>
                </div>
              </div>

              {/* Daily cap notice */}
              <div className="mt-4 p-3 rounded-xl bg-[#B13434]/10 border border-[#B13434]/30">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[#D84F4F] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  <div>
                    <p className="text-xs text-white font-medium">Daily limit: 3 posts maximum</p>
                    <p className="text-[10px] text-white/50 mt-0.5">You can submit up to 3 posts per day. Make them count!</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/60">Your TweetScout Score</span>
                  <span className="text-lg font-bold text-[#D84F4F]">847</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#B13434] to-[#D84F4F]" style={{ width: "84.7%" }} />
                </div>
                <p className="text-[10px] text-white/40 mt-1.5 text-center">You earn ~{Math.round(847 * 0.15)} points per approved post</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full mt-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B13434] to-[#D84F4F] text-sm font-semibold text-white hover:shadow-lg hover:shadow-red-500/20 transition-all"
            >
              Got it!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Referral Info Modal
function ReferralInfoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative z-10 w-full max-w-sm p-6 rounded-2xl border border-white/10"
            style={{ background: "linear-gradient(135deg, rgba(15,15,20,0.98) 0%, rgba(5,5,8,0.99) 100%)" }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <CloseIcon className="w-4 h-4 text-white" />
            </button>

            <div className="text-center mb-5">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#B13434] to-[#D84F4F] flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-lg font-bold text-white mb-1">How Referrals Work</h2>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 shrink-0 rounded-full bg-[#B13434]/20 flex items-center justify-center text-[10px] font-bold text-[#D84F4F]">1</div>
                <p className="text-xs text-white/70 pt-0.5">Share your unique referral link with friends</p>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 shrink-0 rounded-full bg-[#B13434]/20 flex items-center justify-center text-[10px] font-bold text-[#D84F4F]">2</div>
                <p className="text-xs text-white/70 pt-0.5">Friend signs up using your link</p>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 shrink-0 rounded-full bg-[#B13434]/20 flex items-center justify-center text-[10px] font-bold text-[#D84F4F]">3</div>
                <p className="text-xs text-white/70 pt-0.5">When they submit their first X post, you earn <span className="text-[#D84F4F] font-semibold">+500 points</span></p>
              </div>

              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 shrink-0 rounded-full bg-[#B13434]/20 flex items-center justify-center text-[10px] font-bold text-[#D84F4F]">4</div>
                <p className="text-xs text-white/70 pt-0.5">Earn <span className="text-[#D84F4F] font-semibold">10%</span> of all points your referrals earn (passive income!)</p>
              </div>

              {/* Consolidated info box */}
              <div className="mt-4 p-3 rounded-xl bg-[#B13434]/10 border border-[#B13434]/30">
                <div className="space-y-2 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">First post by referral</span>
                    <span className="font-semibold text-white">+500 pts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Referral downloads Santa Browser</span>
                    <span className="font-bold text-[#D84F4F]">100x BONUS!</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Referral income</span>
                    <span className="font-semibold text-white">10% of earnings</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Daily income cap</span>
                    <span className="font-semibold text-white">200 pts/day</span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-white/40 text-center">Points credited when referral submits their first post, not on signup.</p>
            </div>

            <button
              onClick={onClose}
              className="w-full mt-5 py-2.5 rounded-xl bg-gradient-to-r from-[#B13434] to-[#D84F4F] text-sm font-semibold text-white hover:shadow-lg hover:shadow-red-500/20 transition-all"
            >
              Got it!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Post Submit Confirmation Modal
function SubmitConfirmModal({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative z-10 w-full max-w-sm p-6 rounded-2xl border border-white/10"
            style={{ background: "linear-gradient(135deg, rgba(15,15,20,0.98) 0%, rgba(5,5,8,0.99) 100%)" }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <CloseIcon className="w-4 h-4 text-white" />
            </button>

            <div className="text-center mb-5">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#B13434]/20 border border-[#B13434]/50 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#D84F4F]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </div>
              <h2 className="text-lg font-bold text-white mb-1">Before You Submit</h2>
              <p className="text-xs text-white/50">Please read the following carefully</p>
            </div>

            <div className="space-y-3 mb-5">
              <div className="p-3 rounded-xl bg-[#B13434]/10 border border-[#B13434]/30">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[#D84F4F] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                  </svg>
                  <div>
                    <p className="text-xs text-white font-medium">Tag Requirement</p>
                    <p className="text-[10px] text-white/60 mt-0.5">
                      Your post must include <span className="text-[#D84F4F] font-semibold">$SANTA</span> or <span className="text-[#D84F4F] font-semibold">@SantaBrowser</span> tag. Posts without these tags will have their points removed during review.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#B13434]/10 border border-[#B13434]/30">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-[#D84F4F] shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <div>
                    <p className="text-xs text-white font-medium">No Duplicate Entries</p>
                    <p className="text-[10px] text-white/60 mt-0.5">
                      Submitting the same post multiple times or using duplicate content may result in your account being suspended.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white/70 hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#B13434] to-[#D84F4F] text-sm font-semibold text-white hover:shadow-lg hover:shadow-red-500/20 transition-all"
              >
                I Understand, Submit
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============== MAIN DASHBOARD ==============
export default function Dashboard() {
  const [user] = useState(MOCK_USER);
  const [gifts, setGifts] = useState(MOCK_GIFTS);
  const [showSpinModal, setShowSpinModal] = useState(false);
  const [showGiftsModal, setShowGiftsModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tweetUrl, setTweetUrl] = useState("");
  const [tweetSubmitted, setTweetSubmitted] = useState(false);
  const [submittedTweets, setSubmittedTweets] = useState(2); // Mock: user already submitted 2
  const [showTweetScoutInfo, setShowTweetScoutInfo] = useState(false);
  const [showReferralInfo, setShowReferralInfo] = useState(false);
  const [hasSpunToday, setHasSpunToday] = useState(false); // Track if user has spun today
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showPointsBreakdown, setShowPointsBreakdown] = useState(false);

  const referralLink = `https://santabrowser.com/ref/${user.referralCode}`;

  // Points breakdown (mock data)
  const pointsBreakdown = {
    referrals: user.totalReferrals * 50,
    postEarn: submittedTweets * 150,
    tasks: 275, // Mock: completed tasks points
    dailySpin: 125, // Mock: daily spin winnings
    gifts: 100, // Mock: claimed gifts bonus
  };

  // Check if there are unclaimed gifts that are unlocked
  const unclaimedGiftsCount = gifts.filter(g => g.isUnlocked && !g.isClaimed).length;

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTweetSubmit = () => {
    if (!tweetUrl.trim()) return;
    // Show confirmation popup first
    setShowSubmitConfirm(true);
  };

  const confirmTweetSubmit = () => {
    setShowSubmitConfirm(false);
    setTweetSubmitted(true);
    setSubmittedTweets(prev => prev + 1);
    setTweetUrl("");
    setTimeout(() => setTweetSubmitted(false), 3000);
  };

  const handleSpinComplete = (points: number) => {
    console.log(`Won ${points} points!`);
    setHasSpunToday(true);
  };

  const handleClaimGift = (gift: Gift) => {
    setGifts(prev => prev.map(g =>
      g.id === gift.id ? { ...g, isClaimed: true } : g
    ));
  };

  return (
    <main className="relative h-screen overflow-hidden" style={{ background: "#050508" }}>
      {/* Background gradient - enhanced red glow */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(177, 52, 52, 0.25), transparent 50%), radial-gradient(ellipse 60% 40% at 50% 100%, rgba(177, 52, 52, 0.08), transparent 50%)",
        }}
      />

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/60 backdrop-blur-md border-b border-white/5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/assets/santa-logo-BAegldTM.svg" alt="Santa" width={110} height={30} priority />
            <span className="px-3 py-1 text-sm font-semibold text-[#D84F4F] border border-[#B13434]/40 rounded-md self-center" style={{ background: "linear-gradient(135deg, rgba(177,52,52,0.2) 0%, rgba(10,10,15,0.8) 100%)" }}>
              Quests
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {/* Points with dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowPointsBreakdown(!showPointsBreakdown)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                <span className="text-[#D84F4F] font-bold">{user.points}</span>
                <span className="text-white/50 text-sm">points</span>
                <svg className={`w-3 h-3 text-white/40 transition-transform ${showPointsBreakdown ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Points Breakdown Dropdown */}
              <AnimatePresence>
                {showPointsBreakdown && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowPointsBreakdown(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-12 w-56 rounded-xl border border-white/10 overflow-hidden z-50"
                      style={{ background: "linear-gradient(135deg, rgba(15,15,20,0.98) 0%, rgba(5,5,8,0.99) 100%)" }}
                    >
                      <div className="p-3 border-b border-white/10">
                        <p className="text-xs text-white/50">Points Breakdown</p>
                        <p className="text-xl font-bold text-[#D84F4F]">{user.points} <span className="text-sm font-normal text-white/50">total</span></p>
                      </div>
                      <div className="p-2 space-y-1">
                        <div className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-white/5">
                          <div className="flex items-center gap-2">
                            <UsersIcon className="w-4 h-4 text-[#D84F4F]" />
                            <span className="text-xs text-white/70">Referrals</span>
                          </div>
                          <span className="text-xs font-semibold text-white">+{pointsBreakdown.referrals}</span>
                        </div>
                        <div className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-white/5">
                          <div className="flex items-center gap-2">
                            <PostIcon className="w-4 h-4 text-[#D84F4F]" />
                            <span className="text-xs text-white/70">Post & Earn</span>
                          </div>
                          <span className="text-xs font-semibold text-white">+{pointsBreakdown.postEarn}</span>
                        </div>
                        <div className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-white/5">
                          <div className="flex items-center gap-2">
                            <TasksIcon className="w-4 h-4 text-[#D84F4F]" />
                            <span className="text-xs text-white/70">Tasks</span>
                          </div>
                          <span className="text-xs font-semibold text-white">+{pointsBreakdown.tasks}</span>
                        </div>
                        <div className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-white/5">
                          <div className="flex items-center gap-2">
                            <SpinIcon className="w-4 h-4 text-[#D84F4F]" />
                            <span className="text-xs text-white/70">Daily Spin</span>
                          </div>
                          <span className="text-xs font-semibold text-white">+{pointsBreakdown.dailySpin}</span>
                        </div>
                        <div className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-white/5">
                          <div className="flex items-center gap-2">
                            <GiftIcon className="w-4 h-4 text-[#D84F4F]" />
                            <span className="text-xs text-white/70">Santa's Gifts</span>
                          </div>
                          <span className="text-xs font-semibold text-white">+{pointsBreakdown.gifts}</span>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-[#B13434] to-[#D84F4F] flex items-center justify-center text-white font-bold hover:shadow-lg hover:shadow-[#B13434]/30 transition-shadow"
              >
                {user.username[0].toUpperCase()}
              </button>

              {/* Profile Dropdown Menu */}
              <AnimatePresence>
                {showProfileMenu && (
                  <>
                    {/* Backdrop to close menu */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowProfileMenu(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-12 w-48 rounded-xl border border-white/10 overflow-hidden z-50"
                      style={{ background: "linear-gradient(135deg, rgba(15,15,20,0.98) 0%, rgba(5,5,8,0.99) 100%)" }}
                    >
                      <div className="p-2 border-b border-white/10">
                        <p className="text-xs text-white/50 px-2">Signed in as</p>
                        <p className="text-sm text-white font-medium px-2 truncate">@{user.username}</p>
                      </div>
                      <div className="p-1">
                        <button
                          onClick={() => {
                            setShowProfileMenu(false);
                            // Handle connected accounts
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left"
                        >
                          <svg className="w-4 h-4 text-[#D84F4F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-sm text-white/80">Connected Accounts</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowProfileMenu(false);
                            // Handle connect wallet
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left"
                        >
                          <svg className="w-4 h-4 text-[#D84F4F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-sm text-white/80">Connect Wallet</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowProfileMenu(false);
                            // Handle logout
                            window.location.href = "/";
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-left"
                        >
                          <svg className="w-4 h-4 text-[#D84F4F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round"/>
                            <polyline points="16,17 21,12 16,7" strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-sm text-white/80">Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main content - Single view with fixed bottom spacing */}
      <div className="relative z-10 h-screen pt-24 pb-6 px-6 flex flex-col overflow-hidden">
        <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col min-h-0">
          {/* Dashboard grid - 6 columns: 2+2+1+1 layout with fixed row heights */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 flex-1 min-h-0" style={{ gridTemplateRows: "auto minmax(0, 1fr)" }}>
            {/* ============== ROW 1: Referrals (2) | Post & Earn (2) | Daily Spin (1) | Santa's Gifts (1) ============== */}

            {/* Referrals Card - spans 2 columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 p-4 rounded-2xl border border-[#B13434]/20 flex flex-col"
              style={{ background: "linear-gradient(135deg, rgba(15,15,20,0.95) 0%, rgba(5,5,8,0.98) 100%)", boxShadow: "0 0 30px rgba(177,52,52,0.05)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0a0a0f] to-[#1a1a1f] border border-[#B13434]/50 flex items-center justify-center">
                    <UsersIcon className="w-4 h-4 text-[#D84F4F]" />
                  </div>
                  <h2 className="text-sm font-bold text-white">Referrals</h2>
                </div>
                <button
                  onClick={() => setShowReferralInfo(true)}
                  className="text-[9px] text-white/40 hover:text-[#D84F4F] transition-colors underline underline-offset-2"
                >
                  How it works?
                </button>
              </div>
              {/* Two rows: referrals count and points */}
              <div className="space-y-1.5 mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50">Friends joined</span>
                  <span className="text-sm font-bold text-white">{user.totalReferrals}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50">Points earned</span>
                  <span className="text-sm font-bold text-[#D84F4F]">+{user.totalReferrals * 50}</span>
                </div>
              </div>
              {/* Share buttons */}
              <div className="flex items-center gap-2 mt-auto">
                <button
                  onClick={copyLink}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all text-xs font-medium ${
                    copied ? "bg-white/20 text-white" : "bg-white/5 border border-white/10 hover:bg-white/10 text-white/70"
                  }`}
                >
                  {copied ? <CheckIcon className="w-3.5 h-3.5" /> : <CopyIcon className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
                <button
                  onClick={() => {
                    const text = encodeURIComponent(`🎅 I just joined Santa Browser! Use my referral link to get 100 bonus points:\n\n${referralLink}\n\n#SantaBrowser #Web3`);
                    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-medium text-white/70"
                >
                  <XLogo className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
                <button
                  onClick={() => {
                    const text = encodeURIComponent(`🎅 Hey! I just joined Santa Browser and thought you'd love it too!\n\nUse my referral link to get 100 bonus points:\n${referralLink}`);
                    window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${text}`, "_blank");
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-medium text-white/70"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                  <span>Share</span>
                </button>
              </div>
            </motion.div>

            {/* Post & Earn Card - spans 2 columns */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="lg:col-span-2 p-4 rounded-2xl border border-[#B13434]/20 relative overflow-hidden flex flex-col"
              style={{ background: "linear-gradient(135deg, rgba(15,15,20,0.95) 0%, rgba(5,5,8,0.98) 100%)", boxShadow: "0 0 30px rgba(177,52,52,0.05)" }}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0a0a0f] to-[#1a1a1f] border border-[#B13434]/50 flex items-center justify-center">
                      <PostIcon className="w-4 h-4 text-[#D84F4F]" />
                    </div>
                    <h3 className="text-sm font-bold text-white">Post & Earn</h3>
                  </div>
                  <button
                    onClick={() => setShowTweetScoutInfo(true)}
                    className="text-[9px] text-white/40 hover:text-[#D84F4F] transition-colors underline underline-offset-2"
                  >
                    How it works?
                  </button>
                </div>
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50">Posts submitted</span>
                    <span className="text-sm font-bold text-white">{submittedTweets}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/50">Points earned</span>
                    <span className="text-sm font-bold text-[#D84F4F]">+{submittedTweets * 150}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-auto">
                  <div className="flex-1 relative">
                    <LinkIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
                    <input
                      type="text"
                      value={tweetUrl}
                      onChange={(e) => setTweetUrl(e.target.value)}
                      placeholder="Paste X post link..."
                      className="w-full pl-8 pr-2 py-2 rounded-lg bg-black/30 border border-white/10 text-[10px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#B13434]/50 transition-colors"
                    />
                  </div>
                  <button
                    onClick={handleTweetSubmit}
                    disabled={!tweetUrl.trim()}
                    className={`p-2 rounded-lg transition-all shrink-0 ${
                      tweetSubmitted
                        ? "bg-green-500/20 border border-green-500/50"
                        : tweetUrl.trim()
                        ? "bg-gradient-to-br from-[#B13434] to-[#D84F4F] hover:shadow-lg hover:shadow-red-500/20"
                        : "bg-white/5 border border-white/10 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    {tweetSubmitted ? <CheckIcon className="w-3.5 h-3.5 text-green-400" /> : <SendIcon className="w-3.5 h-3.5 text-white" />}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Daily Spin Card - 1 column, square */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setShowSpinModal(true)}
              className={`relative p-4 rounded-2xl border transition-all group overflow-hidden text-left aspect-square ${
                !hasSpunToday
                  ? "border-[#B13434]/60 shadow-lg shadow-[#B13434]/30"
                  : "border-white/10 hover:border-white/20"
              }`}
              style={{
                background: !hasSpunToday
                  ? "linear-gradient(135deg, rgba(177,52,52,0.15) 0%, rgba(10,10,15,0.98) 50%, rgba(5,5,8,0.99) 100%)"
                  : "linear-gradient(135deg, rgba(15,15,20,0.95) 0%, rgba(5,5,8,0.98) 100%)"
              }}
            >
              {/* Red glow overlay when available */}
              {!hasSpunToday && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#B13434]/20 via-transparent to-transparent pointer-events-none" />
              )}
              {!hasSpunToday && (
                <div className="absolute top-2 right-2 z-20">
                  <span className="px-1.5 py-0.5 rounded bg-[#B13434] text-[8px] font-bold text-white uppercase tracking-wide">New</span>
                </div>
              )}
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <div className="relative mb-3">
                  <div className={`w-14 h-14 rounded-full border-[3px] flex items-center justify-center relative overflow-hidden transition-colors ${
                    !hasSpunToday ? "border-[#B13434]/60" : "border-[#B13434]/30 group-hover:border-[#B13434]/60"
                  }`}>
                    <div className="absolute inset-1 rounded-full overflow-hidden">
                      <div className="absolute inset-0 spin-wheel-segments" />
                    </div>
                    <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-white to-gray-200 flex items-center justify-center z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B13434]" />
                    </div>
                  </div>
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[8px] border-l-transparent border-r-transparent border-t-white drop-shadow-md" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-0.5">Daily Spin</h3>
                <p className={`text-[10px] ${!hasSpunToday ? "text-[#D84F4F] font-medium" : "text-white/50"}`}>
                  {!hasSpunToday ? "Ready to spin!" : "Come back tomorrow"}
                </p>
              </div>
            </motion.button>

            {/* Santa's Gifts Card - 1 column, square */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              onClick={() => setShowGiftsModal(true)}
              className={`relative p-4 rounded-2xl border transition-all group overflow-hidden text-left aspect-square ${
                unclaimedGiftsCount > 0
                  ? "border-[#B13434]/60 shadow-lg shadow-[#B13434]/30"
                  : "border-white/10 hover:border-white/20"
              }`}
              style={{
                background: unclaimedGiftsCount > 0
                  ? "linear-gradient(135deg, rgba(177,52,52,0.15) 0%, rgba(10,10,15,0.98) 50%, rgba(5,5,8,0.99) 100%)"
                  : "linear-gradient(135deg, rgba(15,15,20,0.95) 0%, rgba(5,5,8,0.98) 100%)"
              }}
            >
              {/* Red glow overlay when available */}
              {unclaimedGiftsCount > 0 && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#B13434]/20 via-transparent to-transparent pointer-events-none" />
              )}
              {unclaimedGiftsCount > 0 && (
                <div className="absolute top-2 right-2 z-20">
                  <span className="px-1.5 py-0.5 rounded bg-[#B13434] text-[8px] font-bold text-white uppercase tracking-wide">New</span>
                </div>
              )}
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <div className="relative mb-3">
                  <div className="w-14 h-12 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-4 rounded-t-lg bg-gradient-to-b from-[#B13434] to-[#8a2020] group-hover:translate-y-[-2px] transition-transform">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-full bg-gradient-to-b from-white/40 to-white/20" />
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-5 h-2 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-7 rounded-b-lg bg-gradient-to-b from-[#9a2a2a] to-[#6a1f1f]">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-full bg-gradient-to-b from-white/30 to-white/10" />
                    </div>
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-white mb-0.5">Santa's Gifts</h3>
                <p className={`text-[10px] ${unclaimedGiftsCount > 0 ? "text-[#D84F4F] font-medium" : "text-white/50"}`}>
                  {unclaimedGiftsCount > 0 ? `${unclaimedGiftsCount} ready to claim` : "All claimed!"}
                </p>
              </div>
            </motion.button>

            {/* ============== ROW 2: Tasks (4 cols) | Leaderboard (2 cols) ============== */}

            {/* Tasks Card - spans 4 columns (matches Referrals + Post & Earn) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-4 p-5 rounded-2xl border border-[#B13434]/20 flex flex-col overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(15,15,20,0.95) 0%, rgba(5,5,8,0.98) 100%)", boxShadow: "0 0 30px rgba(177,52,52,0.05)" }}
            >
              <div className="flex items-center gap-3 mb-4 shrink-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0a0a0f] to-[#1a1a1f] border border-[#B13434]/50 flex items-center justify-center">
                  <TasksIcon className="w-4 h-4 text-[#D84F4F]" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Tasks</h2>
                  <p className="text-xs text-white/50">
                    {MOCK_TASKS.filter(t => t.status === "completed").length}/{MOCK_TASKS.length} completed
                  </p>
                </div>
              </div>
              <div className="overflow-y-auto space-y-2 custom-scrollbar pr-1" style={{ maxHeight: "244px" }}>
                {[...MOCK_TASKS]
                  .sort((a, b) => (a.status === "completed" ? 1 : 0) - (b.status === "completed" ? 1 : 0))
                  .map((task) => (
                    <TaskItem key={task.id} task={task} />
                  ))}
              </div>
            </motion.div>

            {/* Leaderboard Card - spans 2 columns (matches Daily Spin + Santa's Gifts) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="lg:col-span-2 p-5 rounded-2xl border border-[#B13434]/20 flex flex-col overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(15,15,20,0.95) 0%, rgba(5,5,8,0.98) 100%)", boxShadow: "0 0 30px rgba(177,52,52,0.05)" }}
            >
              <div className="flex flex-col flex-1 min-h-0">
                <div className="flex items-center gap-2 mb-3 shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0a0a0f] to-[#1a1a1f] border border-[#B13434]/50 flex items-center justify-center">
                    <TrophyIcon className="w-4 h-4 text-[#D84F4F]" />
                  </div>
                  <h2 className="text-base font-bold text-white">Leaderboard</h2>
                </div>

                {/* Column headers */}
                <div className="flex items-center gap-2 px-2 py-1.5 text-[10px] text-white/40 uppercase tracking-wide border-b border-white/10 mb-1 shrink-0">
                  <span className="w-8 text-center">#</span>
                  <span className="flex-1">User</span>
                  <span className="w-16 text-right">Points</span>
                </div>

                {/* Leaderboard entries */}
                <div className="flex-1 min-h-0 space-y-1 overflow-y-auto custom-scrollbar pr-1">
                  {MOCK_LEADERBOARD.map((entry, index) => (
                    <motion.div
                      key={entry.rank}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.03 }}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all ${
                        entry.isCurrentUser
                          ? "bg-[#B13434]/20 border border-[#B13434]/40"
                          : "hover:bg-white/5"
                      }`}
                    >
                      {/* Rank */}
                      <span className={`w-8 text-center text-xs font-medium ${
                        entry.isCurrentUser ? "text-[#D84F4F]" : "text-white/50"
                      }`}>
                        #{entry.rank}
                      </span>

                      {/* User */}
                      <div className="flex-1 min-w-0 flex items-center gap-2">
                        <span className={`text-xs truncate ${entry.isCurrentUser ? "text-white font-medium" : "text-white/80"}`}>
                          @{entry.username}
                        </span>
                        {entry.isCurrentUser && (
                          <span className="px-1.5 py-0.5 rounded bg-[#D84F4F] text-[8px] font-bold text-white uppercase">
                            You
                          </span>
                        )}
                      </div>

                      {/* Points */}
                      <span className={`w-16 text-right text-xs font-semibold ${
                        entry.isCurrentUser ? "text-[#D84F4F]" : "text-white"
                      }`}>
                        {entry.points.toLocaleString()}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SpinModal
        isOpen={showSpinModal}
        onClose={() => setShowSpinModal(false)}
        onSpinComplete={handleSpinComplete}
      />
      <GiftsModal
        isOpen={showGiftsModal}
        onClose={() => setShowGiftsModal(false)}
        gifts={gifts}
        onClaimGift={handleClaimGift}
      />
      <TweetScoutInfoModal
        isOpen={showTweetScoutInfo}
        onClose={() => setShowTweetScoutInfo(false)}
      />
      <ReferralInfoModal
        isOpen={showReferralInfo}
        onClose={() => setShowReferralInfo(false)}
      />
      <SubmitConfirmModal
        isOpen={showSubmitConfirm}
        onClose={() => setShowSubmitConfirm(false)}
        onConfirm={confirmTweetSubmit}
      />

      {/* CSS for animations and custom scrollbar */}
      <style jsx global>{`
        @keyframes bulb-blink {
          0% { opacity: 0.4; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1.1); }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0); }
          25% { transform: translateX(-5px) rotate(-5deg); }
          75% { transform: translateX(5px) rotate(5deg); }
        }

        .animate-shake {
          animation: shake 0.3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(177,52,52,0.5);
          border-radius: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(177,52,52,0.7);
        }

        /* Spin card glow animation */
        .spin-card-glow {
          animation: card-glow 2s ease-in-out infinite;
        }

        @keyframes card-glow {
          0%, 100% {
            box-shadow: 0 0 15px rgba(177,52,52,0.3), 0 0 30px rgba(177,52,52,0.1);
          }
          50% {
            box-shadow: 0 0 25px rgba(177,52,52,0.5), 0 0 50px rgba(177,52,52,0.2);
          }
        }

        /* Gift card glow animation */
        .gift-card-glow {
          animation: card-glow 2s ease-in-out infinite 0.5s;
        }

        /* Rotating light rays */
        .spin-rays {
          animation: rotate-rays 10s linear infinite;
        }

        @keyframes rotate-rays {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* Spin icon slow rotation */
        .spin-icon {
          animation: spin-slow 4s linear infinite;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .group:hover .spin-icon {
          animation: spin-fast 1s linear infinite;
        }

        @keyframes spin-fast {
          from { transform: rotate(0deg) scale(1.1); }
          to { transform: rotate(360deg) scale(1.1); }
        }

        /* Sparkle particles */
        .sparkle-particle {
          animation: sparkle-float 2s ease-in-out infinite;
        }

        @keyframes sparkle-float {
          0%, 100% {
            opacity: 0;
            transform: scale(0) translateY(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.5) translateY(-5px);
          }
        }

        /* Sparkle star */
        .sparkle-star {
          animation: star-twinkle 1.5s ease-in-out infinite;
        }

        @keyframes star-twinkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }

        /* Pulse dot notification */
        .pulse-dot {
          animation: pulse-scale 1.5s ease-in-out infinite;
        }

        @keyframes pulse-scale {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255,255,255,0.7);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 0 6px rgba(255,255,255,0);
          }
        }

        /* Gift shine sweep */
        .gift-shine {
          animation: shine-sweep 3s ease-in-out infinite;
        }

        @keyframes shine-sweep {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          50%, 100% {
            transform: translateX(200%) rotate(45deg);
          }
        }

        /* Gift box hover shake */
        .gift-box-hover {
          animation: gift-wiggle 2s ease-in-out infinite;
        }

        @keyframes gift-wiggle {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(-3deg); }
          20% { transform: rotate(3deg); }
          30% { transform: rotate(-2deg); }
          40% { transform: rotate(2deg); }
          50%, 100% { transform: rotate(0deg); }
        }

        .group:hover .gift-box-hover {
          animation: gift-shake 0.4s ease-in-out infinite;
        }

        @keyframes gift-shake {
          0%, 100% { transform: scale(1.1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(-8deg); }
          75% { transform: scale(1.1) rotate(8deg); }
        }

        /* Premium pulse for indicator dot */
        .premium-pulse {
          animation: premium-pulse 2s ease-in-out infinite;
        }

        @keyframes premium-pulse {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 4px rgba(216, 79, 79, 0.6);
          }
          50% {
            opacity: 0.6;
            box-shadow: 0 0 8px rgba(216, 79, 79, 0.8), 0 0 12px rgba(216, 79, 79, 0.4);
          }
        }

        /* Spin wheel segments visual */
        .spin-wheel-segments {
          background: conic-gradient(
            from 0deg,
            #B13434 0deg 45deg,
            #1a1a2e 45deg 90deg,
            #D84F4F 90deg 135deg,
            #1a1a2e 135deg 180deg,
            #B13434 180deg 225deg,
            #1a1a2e 225deg 270deg,
            #D84F4F 270deg 315deg,
            #1a1a2e 315deg 360deg
          );
        }
      `}</style>
    </main>
  );
}
