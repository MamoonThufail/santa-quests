"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Types
interface Task {
  id: string;
  type: "follow" | "retweet" | "like" | "discord" | "telegram" | "download";
  title: string;
  description: string;
  points: number;
  status: "pending" | "completed";
  targetUrl?: string;
  targetUsername?: string;
}

// Icons
function XLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
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

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
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

// Triple points multiplier for onboarding
const POINTS_MULTIPLIER = 3;

// Mock data - base points (will be tripled)
const MOCK_TASKS: Task[] = [
  {
    id: "1",
    type: "follow",
    title: "Follow Santa",
    description: "Follow @SantaBrowser on X",
    points: 100,
    status: "pending",
    targetUsername: "SantaBrowser",
  },
  {
    id: "2",
    type: "retweet",
    title: "Retweet This Post",
    description: "Spread the word about Santa Browser",
    points: 75,
    status: "pending",
    targetUrl: "https://twitter.com/SantaBrowser/status/123456789",
  },
  {
    id: "3",
    type: "like",
    title: "Like This Post",
    description: "Show some love to our announcement",
    points: 50,
    status: "pending",
    targetUrl: "https://twitter.com/SantaBrowser/status/123456789",
  },
  {
    id: "4",
    type: "discord",
    title: "Join Discord",
    description: "Join our community on Discord",
    points: 100,
    status: "pending",
    targetUrl: "https://discord.gg/santabrowser",
  },
  {
    id: "5",
    type: "telegram",
    title: "Join Telegram",
    description: "Get updates on Telegram",
    points: 100,
    status: "pending",
    targetUrl: "https://t.me/SantaBrowserCommunity",
  },
];

const MOCK_USER = {
  username: "cryptouser",
  avatarUrl: "",
  points: 0,
};

// Get icon for task type
function getTaskIcon(type: Task["type"], className: string) {
  switch (type) {
    case "follow":
      return <XLogo className={className} />;
    case "retweet":
      return <RetweetIcon className={className} />;
    case "like":
      return <HeartIcon className={className} />;
    case "discord":
      return <DiscordIcon className={className} />;
    case "telegram":
      return <TelegramIcon className={className} />;
    case "download":
      return <DownloadIcon className={className} />;
    default:
      return <XLogo className={className} />;
  }
}

// Task Modal Component with triple points display
function TaskModal({ task, onClose, onComplete }: { task: Task; onClose: () => void; onComplete: (task: Task) => void }) {
  const multipliedPoints = task.points * POINTS_MULTIPLIER;

  const handleAction = () => {
    if (task.type === "follow" && task.targetUsername) {
      window.open(`https://twitter.com/intent/follow?screen_name=${task.targetUsername}`, "_blank");
    } else if (task.type === "retweet" && task.targetUrl) {
      window.open(task.targetUrl, "_blank");
    } else if (task.type === "like" && task.targetUrl) {
      window.open(task.targetUrl, "_blank");
    } else if (task.type === "discord" && task.targetUrl) {
      window.open(task.targetUrl, "_blank");
    } else if (task.type === "telegram" && task.targetUrl) {
      window.open(task.targetUrl, "_blank");
    }
    onComplete(task);
  };

  const getActionText = () => {
    switch (task.type) {
      case "follow": return "Follow";
      case "retweet": return "Retweet";
      case "like": return "Like";
      case "discord": return "Join Discord";
      case "telegram": return "Join Telegram";
      default: return "Complete";
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-md rounded-2xl border border-white/10 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(15,15,20,0.98) 0%, rgba(5,5,8,0.99) 100%)",
          boxShadow: "0 0 40px rgba(177, 52, 52, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)"
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* Gradient top */}
        <div className="h-1 santa-button-gradient" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <CloseIcon className="w-4 h-4 text-white/60" />
        </button>

        <div className="p-6">
          {/* Task icon */}
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
            {getTaskIcon(task.type, "w-7 h-7 text-white")}
          </div>

          {/* Title & description */}
          <h3 className="text-xl font-semibold text-white mb-2">{task.title}</h3>
          <p className="text-white/50 text-sm mb-6">{task.description}</p>

          {/* Points with triple bonus */}
          <div
            className="flex items-center gap-2 mb-6 px-4 py-3 rounded-xl border border-[#B13434]/30"
            style={{
              background: "linear-gradient(135deg, rgba(177, 52, 52, 0.1) 0%, rgba(177, 52, 52, 0.05) 100%)"
            }}
          >
            <span className="text-white font-bold text-lg">+{multipliedPoints}</span>
            <span className="text-white/40">points</span>
            <span className="ml-auto px-2 py-0.5 rounded-full bg-[#B13434]/20 text-[#D84F4F] text-xs font-bold border border-[#B13434]/30">TRIPLE</span>
          </div>

          {/* Action button */}
          {task.status === "completed" ? (
            <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 text-white border border-white/20">
              <CheckIcon className="w-5 h-5" />
              <span className="font-medium">Completed</span>
            </div>
          ) : (
            <button
              onClick={handleAction}
              className="w-full py-3 rounded-xl santa-button-gradient text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              style={{
                boxShadow: "0 4px 20px rgba(177, 52, 52, 0.3)"
              }}
            >
              {getTaskIcon(task.type, "w-4 h-4")}
              {getActionText()}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Download Modal with platform selection
function DownloadModal({ task, onClose, onComplete }: { task: Task; onClose: () => void; onComplete: (task: Task) => void }) {
  const multipliedPoints = task.points * POINTS_MULTIPLIER;

  const platforms = [
    {
      id: "windows",
      name: "Windows",
      icon: "/assets/windows.svg",
      url: "https://santabrowser.com/download/windows",
    },
    {
      id: "ios",
      name: "App Store",
      icon: "/assets/app-store.svg",
      url: "https://apps.apple.com/app/santa-browser",
    },
    {
      id: "android",
      name: "Play Store",
      icon: "/assets/playstore.svg",
      url: "https://play.google.com/store/apps/details?id=com.santabrowser",
    },
  ];

  const handlePlatformClick = (url: string) => {
    window.open(url, "_blank");
    onComplete(task);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-md rounded-2xl border border-white/10 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(15,15,20,0.98) 0%, rgba(5,5,8,0.99) 100%)",
          boxShadow: "0 0 40px rgba(177, 52, 52, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)"
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* Gradient top */}
        <div className="h-1 santa-button-gradient" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <CloseIcon className="w-4 h-4 text-white/60" />
        </button>

        <div className="p-6">
          {/* Task icon */}
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
            <DownloadIcon className="w-7 h-7 text-white" />
          </div>

          {/* Title & description */}
          <h3 className="text-xl font-semibold text-white mb-2">{task.title}</h3>
          <p className="text-white/50 text-sm mb-4">{task.description}</p>

          {/* Points with triple bonus */}
          <div
            className="flex items-center gap-2 mb-6 px-4 py-3 rounded-xl border border-[#B13434]/30"
            style={{
              background: "linear-gradient(135deg, rgba(177, 52, 52, 0.1) 0%, rgba(177, 52, 52, 0.05) 100%)"
            }}
          >
            <span className="text-white font-bold text-lg">+{multipliedPoints}</span>
            <span className="text-white/40">points</span>
            <span className="ml-auto px-2 py-0.5 rounded-full bg-[#B13434]/20 text-[#D84F4F] text-xs font-bold border border-[#B13434]/30">TRIPLE</span>
          </div>

          {/* Platform Selection */}
          <p className="text-white/60 text-sm mb-3">Choose your platform:</p>
          <div className="grid grid-cols-3 gap-3">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => handlePlatformClick(platform.url)}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#B13434]/40 transition-all group"
              >
                <div className="w-10 h-10 relative">
                  <Image
                    src={platform.icon}
                    alt={platform.name}
                    fill
                    className="object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <span className="text-white/70 text-xs font-medium group-hover:text-white transition-colors">{platform.name}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Task Card matching dashboard TaskItem style
function TaskCard({ task, onClick }: { task: Task; onClick: () => void }) {
  const isCompleted = task.status === "completed";

  return (
    <motion.button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-2.5 rounded-lg border transition-all text-left ${
        isCompleted
          ? "border-white/5 bg-white/[0.02]"
          : "border-white/[0.06] bg-white/[0.03] hover:border-[#B13434]/30 cursor-pointer"
      }`}
      whileTap={!isCompleted ? { scale: 0.99 } : undefined}
    >
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
        isCompleted ? "bg-white/10 text-white/50" : "bg-white/5 text-white/70"
      }`}>
        {isCompleted ? (
          <CheckIcon className="w-3.5 h-3.5" />
        ) : (
          getTaskIcon(task.type, "w-3.5 h-3.5")
        )}
      </div>
      <h4 className={`flex-1 text-sm font-medium truncate ${isCompleted ? "text-white/40" : "text-white"}`}>
        {task.title}
      </h4>
      <div className="flex items-center gap-2 shrink-0">
        {!isCompleted && (
          <span className="px-1.5 py-0.5 rounded bg-[#B13434]/20 text-[#D84F4F] text-[10px] font-bold border border-[#B13434]/30">3X</span>
        )}
        <span className={`text-sm font-semibold ${isCompleted ? "text-white/30" : "text-white"}`}>
          +{task.points}
        </span>
      </div>
    </motion.button>
  );
}

// Welcome Modal - shown on first visit
function WelcomeModal({ onStay, onSkip }: { onStay: () => void; onSkip: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <motion.div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, rgba(8,8,12,0.99) 0%, rgba(2,2,4,1) 100%)",
          boxShadow: "0 0 80px rgba(177,52,52,0.25), 0 0 120px rgba(177,52,52,0.1), inset 0 1px 0 rgba(255,255,255,0.03)",
          border: "1px solid rgba(177,52,52,0.3)"
        }}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Glow effects */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#B13434]/15 rounded-full blur-[80px]" />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#B13434]/10 rounded-full blur-[60px]" />

        <div className="relative p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
              style={{
                background: "transparent",
                border: "1px solid rgba(177,52,52,0.4)",
              }}
            >
              <span className="text-[#D84F4F] text-xs font-bold tracking-wide">LIMITED TIME</span>
              <span className="w-2 h-2 rounded-full bg-[#D84F4F] animate-pulse shadow-lg shadow-[#D84F4F]/50" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Welcome to Santa Quests!</h2>
            <p className="text-white/50 text-sm leading-relaxed">
              Complete quick tasks and earn <span className="text-[#D84F4F] font-bold">3X bonus points</span>
            </p>
          </div>

          {/* Points preview card */}
          <div
            className="rounded-xl p-4 mb-6"
            style={{
              background: "linear-gradient(135deg, rgba(177,52,52,0.08) 0%, rgba(5,5,8,0.9) 100%)",
              border: "1px solid rgba(177,52,52,0.2)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)"
            }}
          >
            <div className="flex items-center justify-between text-sm mb-3 pb-3 border-b border-white/[0.06]">
              <span className="text-white/50">Complete all tasks</span>
              <span className="text-white font-bold">+1,500 pts</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/50">With 3X bonus</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#B13434]/30 text-[#D84F4F] text-[10px] font-bold border border-[#B13434]/40">3X</span>
                <span className="text-[#D84F4F] font-bold text-lg">+4,500 pts</span>
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={onStay}
            className="w-full py-3.5 rounded-xl text-white font-semibold cta-gradient-move overflow-hidden"
            style={{
              border: "1px solid rgba(177, 52, 52, 0.5)",
            }}
          >
            Earn 3X Points Now
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [user] = useState(MOCK_USER);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleSkipToDashboard = () => {
    router.push("/dashboard");
  };

  const handleTaskComplete = (task: Task) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: "completed" as const } : t))
    );
    setSelectedTask(null);
  };

  const completedTasks = tasks.filter(t => t.status === "completed");
  const totalPoints = completedTasks.reduce((sum, t) => sum + (t.points * POINTS_MULTIPLIER), 0);
  const allTasksCompleted = completedTasks.length === tasks.length;

  return (
    <main className="relative h-screen overflow-hidden" style={{ background: "#050508" }}>
      {/* Background gradient */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(177, 52, 52, 0.08), transparent 50%)",
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050508]/60 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <Image src="/assets/santa-logo-BAegldTM.svg" alt="Santa Quests" width={110} height={30} priority />
            <span className="px-3 py-1 text-sm font-semibold text-[#D84F4F] border border-[#B13434]/40 rounded-md self-center" style={{ background: "linear-gradient(135deg, rgba(177,52,52,0.2) 0%, rgba(10,10,15,0.8) 100%)" }}>
              Quests
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Points badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <span className="text-white font-semibold text-sm">{totalPoints}</span>
              <span className="text-white/40 text-xs">pts</span>
            </div>

            {/* User avatar */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full santa-button-gradient" />
              <span className="text-white/80 text-sm font-medium hidden sm:block">@{user.username}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col pt-20 pb-6 px-6">
        <div className="max-w-md mx-auto w-full flex flex-col h-full">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
            {/* Compact Header with Progress */}
            <div className="mb-4 mt-2 flex-shrink-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">TRIPLE YOUR POINTS</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#B13434]/30 text-[#D84F4F] text-[10px] font-bold animate-pulse">ACTIVE</span>
                </div>
                <span className="text-white/50 text-xs">{completedTasks.length}/{tasks.length} done</span>
              </div>
              <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full santa-button-gradient"
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedTasks.length / tasks.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Tasks - Scrollable Container */}
            <div
              className="flex-1 min-h-0 mb-4 p-5 rounded-2xl border border-[#B13434]/20 flex flex-col overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(15,15,20,0.95) 0%, rgba(5,5,8,0.98) 100%)", boxShadow: "0 0 30px rgba(177,52,52,0.05)" }}
            >
              <div className="flex-1 min-h-0 overflow-y-auto space-y-2 custom-scrollbar pr-1">
                {tasks.map((task, i) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <TaskCard task={task} onClick={() => setSelectedTask(task)} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Go to Dashboard */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link
                href="/dashboard"
                className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl transition-all border font-medium ${
                  allTasksCompleted
                    ? "santa-button-gradient text-white font-semibold hover:opacity-90 border-transparent"
                    : "bg-white/[0.03] text-white hover:bg-white/[0.06] border-[#B13434]/30 hover:border-[#B13434]/50"
                }`}
                style={allTasksCompleted ? {
                  boxShadow: "0 4px 20px rgba(177, 52, 52, 0.3)"
                } : {
                  boxShadow: "0 0 20px rgba(177, 52, 52, 0.1)"
                }}
              >
                <span>{allTasksCompleted ? "Continue to Dashboard" : "Go to Dashboard"}</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              {!allTasksCompleted && (
                <p className="text-center text-white/40 text-xs mt-2">
                  Complete tasks above to earn <span className="text-[#D84F4F] font-medium">3X bonus points</span>
                </p>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Welcome Modal */}
      <AnimatePresence>
        {showWelcome && (
          <WelcomeModal
            onStay={() => setShowWelcome(false)}
            onSkip={handleSkipToDashboard}
          />
        )}
      </AnimatePresence>

      {/* Task Modals */}
      <AnimatePresence>
        {selectedTask && selectedTask.type !== "download" && (
          <TaskModal
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onComplete={handleTaskComplete}
          />
        )}
        {selectedTask && selectedTask.type === "download" && (
          <DownloadModal
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onComplete={handleTaskComplete}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
