"use client";

import { useState, useEffect } from "react";
import Envelope from "@/components/scenes/Envelope";
import LetterView from "@/components/scenes/LetterView";
import SurpriseMenu from "@/components/scenes/SurpriseMenu";
import VideoSurprise from "@/components/scenes/surprises/VideoSurprise";
import GiftBox from "@/components/scenes/surprises/GiftBox";
import Proposal from "@/components/scenes/Proposal";
import Ending from "@/components/scenes/Ending";
import MusicPlayer from "@/components/features/MusicPlayer";
import { AnimatePresence, motion } from "framer-motion";

type ViewState = "ENVELOPE" | "LETTER" | "MENU" | "VIDEO" | "GIFT" | "PROPOSAL" | "ENDING";

export default function Home() {
  const [view, setView] = useState<ViewState>("ENVELOPE");
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);
  const [hearts, setHearts] = useState<{ x: string; y: string; scale: number; rotate: number; duration: number; delay: number; left: string; fontSize: string; opacity: number }[]>([]);

  useEffect(() => {
    // Generate hearts only on client to avoid hydration mismatch
    const newHearts = Array.from({ length: 150 }).map(() => ({ // Increased heart count
      x: Math.random() * 100 + "%",
      y: "110vh",
      scale: Math.random() * 0.8 + 0.3,
      rotate: Math.random() * 360,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 10,
      left: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 24 + 10}px`,
      opacity: Math.random() * 0.6 + 0.2 // Slightly more visible
    }));
    setHearts(newHearts);
  }, []);

  const handleOpen = () => {
    setView("LETTER");
    setShouldPlayMusic(true);
  };

  return (
    <main className="min-h-screen w-full relative overflow-hidden flex items-center justify-center bg-[#f0eadd]">
      {/* Vintage Background Texture */}
      <div
        className="absolute inset-0 z-0 opacity-60 pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")`,
          backgroundRepeat: 'repeat',
        }}
      />
      <div
        className="absolute inset-0 z-0 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, #d8cba7 100%)'
        }}
      />

      <MusicPlayer shouldPlay={shouldPlayMusic && view !== "VIDEO"} />

      {/* Global Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {hearts.map((heart, i) => (
          <motion.div
            key={i}
            className="absolute text-deep-red/30 font-handwriting select-none"
            initial={{
              x: heart.x,
              y: "110vh",
              scale: heart.scale,
              rotate: heart.rotate,
              opacity: 0
            }}
            animate={{
              y: "-10vh",
              x: `calc(${heart.x} + ${Math.random() * 100 - 50}px)`,
              opacity: [0, heart.opacity, 0]
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              ease: "linear",
              delay: heart.delay
            }}
            style={{
              left: heart.left,
              fontSize: heart.fontSize
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {view === "ENVELOPE" && (
          <motion.div
            key="envelope"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            <Envelope onOpen={handleOpen} />
          </motion.div>
        )}

        {view === "LETTER" && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="z-10 w-full flex justify-center"
          >
            <LetterView onContinue={() => setView("MENU")} />
          </motion.div>
        )}

        {view === "MENU" && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="z-10"
          >
            <SurpriseMenu
              onSelectVideo={() => setView("VIDEO")}
              onSelectGift={() => setView("GIFT")}
            />
          </motion.div>
        )}

        {view === "VIDEO" && (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-50"
          >
            <VideoSurprise onNext={() => setView("MENU")} />
          </motion.div>
        )}

        {view === "GIFT" && (
          <motion.div
            key="gift"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="z-10"
          >
            <GiftBox onNext={() => setView("PROPOSAL")} />
          </motion.div>
        )}

        {view === "PROPOSAL" && (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="z-10"
          >
            <Proposal onAccept={() => setView("ENDING")} />
          </motion.div>
        )}

        {view === "ENDING" && (
          <motion.div
            key="ending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-50 w-full h-full"
          >
            <Ending onReplay={() => window.location.reload()} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
