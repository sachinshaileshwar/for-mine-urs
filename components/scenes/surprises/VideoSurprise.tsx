"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";

export default function VideoSurprise({ onNext }: { onNext: () => void }) {
    const [playing, setPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const startVideo = () => {
        setPlaying(true);
        setTimeout(() => {
            videoRef.current?.play();
        }, 300);
    };

    const closeVideo = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
        onNext();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
            {/* Close / Back button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={closeVideo}
                className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
            >
                <X className="w-5 h-5 text-white/70" />
            </motion.button>

            {!playing ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full h-full flex items-center justify-center bg-stone-950 cursor-pointer group"
                    onClick={startVideo}
                >
                    {/* Grain overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                    {/* Play button */}
                    <div className="flex flex-col items-center gap-8">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-24 h-24 rounded-full border-2 border-white/20 flex items-center justify-center backdrop-blur-sm bg-white/5 shadow-[0_0_60px_rgba(255,255,255,0.08)]"
                        >
                            <Play className="fill-white text-white ml-2 w-10 h-10 opacity-80" />
                        </motion.div>
                        <p className="font-typewriter text-stone-500 tracking-[0.4em] text-sm uppercase">
                            Play Our Memories
                        </p>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                >
                    <video
                        ref={videoRef}
                        className="w-full h-full object-contain"
                        controls
                        playsInline
                        src="/video/feb14video.MOV"
                        onEnded={closeVideo}
                        onError={() => {
                            console.error("Video failed to load");
                        }}
                    />

                    {/* Subtle scanlines */}
                    <div className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px]" />
                </motion.div>
            )}
        </div>
    );
}
