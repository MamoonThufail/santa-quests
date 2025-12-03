"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useCallback } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  layer: number;
}

// Physics-based interactive snow
function SnowParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, prevX: -1000, prevY: -1000 });
  const animationRef = useRef<number | undefined>(undefined);

  const createParticle = useCallback((id: number, startY?: number, forceLayer?: number): Particle => {
    const layer = forceLayer ?? Math.floor(Math.random() * 3);

    const layerProps = {
      0: { size: 0.5 + Math.random() * 0.6, opacity: 0.15 + Math.random() * 0.1, speed: 0.1 + Math.random() * 0.1 },
      1: { size: 0.8 + Math.random() * 0.8, opacity: 0.2 + Math.random() * 0.1, speed: 0.15 + Math.random() * 0.1 },
      2: { size: 1 + Math.random() * 1, opacity: 0.25 + Math.random() * 0.1, speed: 0.2 + Math.random() * 0.15 },
    }[layer] || { size: 0.8, opacity: 0.2, speed: 0.15 };

    return {
      id,
      x: Math.random() * window.innerWidth,
      y: startY ?? -Math.random() * 100,
      vx: 0,
      vy: layerProps.speed,
      size: layerProps.size,
      opacity: layerProps.opacity,
      layer,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particleCount = 150;
    particlesRef.current = Array.from({ length: particleCount }, (_, i) =>
      createParticle(i, Math.random() * window.innerHeight)
    );

    particlesRef.current.sort((a, b) => a.layer - b.layer);

    const interactionRadius = 60;
    const pushStrength = 0.4;
    const maxVelocity = 1.2;

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouseVx = mouseRef.current.x - mouseRef.current.prevX;
      const mouseVy = mouseRef.current.y - mouseRef.current.prevY;
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;

      particlesRef.current.forEach((p) => {
        const baseSpeed = { 0: 0.12, 1: 0.18, 2: 0.25 }[p.layer] || 0.15;

        p.vx *= 0.95;

        if (p.vy < baseSpeed) {
          p.vy += 0.002;
        } else if (p.vy > baseSpeed + 0.15) {
          p.vy *= 0.99;
        }

        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const layerMultiplier = (p.layer + 1) / 3;

        if (distance < interactionRadius && distance > 0) {
          const force = Math.pow(1 - distance / interactionRadius, 2) * pushStrength * layerMultiplier;
          const angle = Math.atan2(dy, dx);

          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;

          p.vx += mouseVx * 0.03 * layerMultiplier;
          p.vy += mouseVy * 0.03 * layerMultiplier;
        }

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > maxVelocity) {
          p.vx = (p.vx / speed) * maxVelocity;
          p.vy = (p.vy / speed) * maxVelocity;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.y > canvas.height + 10) {
          p.y = -5 - Math.random() * 20;
          p.x = Math.random() * canvas.width;
          p.vy = baseSpeed;
          p.vx = 0;
        }

        if (p.x < -10) p.x = canvas.width + 5;
        if (p.x > canvas.width + 10) p.x = -5;

        if (p.y < -20) {
          p.vy += 0.01;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [createParticle]);

  const handleMouseMove = useCallback((e: React.MouseEvent | MouseEvent) => {
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}

// Floating coins with animation
function FloatingCoins() {
  const coins = [
    { id: 1, style: "top-[12%] left-[3%] w-12 h-12", animation: "coin-1", src: "/assets/coinOne.png" },
    { id: 2, style: "top-[25%] right-[10%] w-10 h-10", animation: "coin-2", src: "/assets/coinTwo.png" },
    { id: 3, style: "top-[70%] left-[3%] w-8 h-8", animation: "coin-3", src: "/assets/coinThree.png" },
    { id: 4, style: "top-[45%] right-[6%] w-14 h-14", animation: "coin-4", src: "/assets/coinFour.png" },
    { id: 5, style: "bottom-[15%] left-[25%] w-9 h-9", animation: "coin-5", src: "/assets/coinFive.png" },
    { id: 6, style: "bottom-[35%] right-[15%] w-11 h-11", animation: "coin-1", src: "/assets/coinOne.png" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[5]">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className={`absolute ${coin.style} ${coin.animation}`}
        >
          <Image
            src={coin.src}
            alt=""
            fill
            className="object-contain drop-shadow-lg"
          />
        </div>
      ))}
    </div>
  );
}

// X Logo Icon
function XLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden" style={{ background: "#0a0a0f" }}>
      <SnowParticles />
      <FloatingCoins />

      {/* Background gradient */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(177, 52, 52, 0.12), transparent 50%)",
        }}
      />

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/60 backdrop-blur-md border-b border-white/5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <Image src="/assets/santa-logo-BAegldTM.svg" alt="Santa Quests" width={110} height={30} priority />
            <span className="px-3 py-1 text-sm font-semibold text-[#D84F4F] border border-[#B13434]/40 rounded-md self-center" style={{ background: "linear-gradient(135deg, rgba(177,52,52,0.2) 0%, rgba(10,10,15,0.8) 100%)" }}>
              Quests
            </span>
          </div>
        </div>
      </motion.header>

      {/* Hero Section - Mobile: Full screen CTA */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20 lg:pt-20">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-8 items-start">

          {/* Left Column - Santa Quests (Mobile: centered, full screen) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-0 lg:pt-8 flex flex-col items-start text-left min-h-[80vh] lg:min-h-0 justify-center lg:justify-start"
          >
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-4xl font-bold text-white mb-3 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Complete quests,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B13434] to-[#D84F4F]">earn $SANTA</span>
            </motion.h1>

            <motion.p
              className="text-white/50 text-sm mb-6 max-w-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Earn points by completing tasks, refer friends for bonuses, and unlock Santa's gift boxes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/tasks"
                className="group relative inline-flex items-center gap-3 px-8 py-4 text-base font-semibold text-white rounded-full transition-all duration-300 overflow-hidden cta-gradient-move"
                style={{
                  border: "1px solid rgba(177, 52, 52, 0.5)",
                }}
              >
                <span className="relative z-10">Login with</span>
                <XLogo className="relative z-10 w-5 h-5" />
              </Link>
            </motion.div>

          </motion.div>

          {/* Divider Line - Desktop only */}
          <div className="hidden lg:flex justify-center items-center self-stretch">
            <div className="w-px h-80 bg-gradient-to-b from-transparent via-[#B13434]/30 to-transparent" />
          </div>

          {/* Right Column - Browser Info (Mobile: appears on scroll) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3 pt-8 lg:pt-0"
          >
            <motion.p
              className="text-[#D84F4F] text-sm font-medium uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              surf different
            </motion.p>

            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Rethink What Your Browser Can Do
            </motion.h2>

            <motion.p
              className="text-white/60 text-lg max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Join millions of web users who trust Santa for a faster, safer & more rewarding web.
            </motion.p>

            {/* Platform availability */}
            <motion.div
              className="flex items-center gap-3 pt-1 text-xs text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
            >
              <span>Available On</span>
              <Image src="/assets/windows.svg" alt="Windows" width={14} height={14} />
              <Image src="/assets/app-store.svg" alt="App Store" width={12} height={14} />
              <Image src="/assets/playstore.svg" alt="Play Store" width={13} height={14} />
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {/* Card 1 */}
              <div
                className="p-4 rounded-xl border border-[#B13434]/20"
                style={{ background: "linear-gradient(135deg, rgba(15,15,20,0.9) 0%, rgba(5,5,8,0.95) 100%)" }}
              >
                <p className="text-2xl font-bold text-white mb-1">2500+</p>
                <p className="text-xs text-white/50">Cashback brands connected</p>
              </div>

              {/* Card 2 */}
              <div
                className="p-4 rounded-xl border border-[#B13434]/20"
                style={{ background: "linear-gradient(135deg, rgba(15,15,20,0.9) 0%, rgba(5,5,8,0.95) 100%)" }}
              >
                <p className="text-2xl font-bold text-white mb-1">2M+</p>
                <p className="text-xs text-white/50">Downloads across platforms</p>
              </div>

              {/* Card 3 */}
              <div
                className="p-4 rounded-xl border border-[#B13434]/20"
                style={{ background: "linear-gradient(135deg, rgba(15,15,20,0.9) 0%, rgba(5,5,8,0.95) 100%)" }}
              >
                <p className="text-2xl font-bold text-white mb-1">10M+</p>
                <p className="text-xs text-white/50">Santa points distributed</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
