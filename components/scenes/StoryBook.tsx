"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { storyChapters } from "@/data/story";
import VideoSurprise from "@/components/scenes/surprises/VideoSurprise";
import VintageLetter from "@/components/scenes/surprises/VintageLetter";
import GiftBox from "@/components/scenes/surprises/GiftBox";
import ForeverCountdown from "@/components/scenes/Countdown";
import Ending from "@/components/scenes/Ending";
import BookPage from "@/components/ui/BookPage";
import { Tape, DoodleHeart, DoodleStar } from "@/components/ui/Decorations";

interface StoryBookProps {
    onEnding: () => void;
}

export default function StoryBook({ onEnding }: StoryBookProps) {
    const [currentChapter, setCurrentChapter] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);

    const chapter = storyChapters[currentChapter];

    const handleNext = () => {
        if (currentChapter < storyChapters.length - 1 && !isFlipping) {
            setIsFlipping(true);
            setTimeout(() => {
                setCurrentChapter((prev) => prev + 1);
                setIsFlipping(false);
            }, 600);
        }
    };

    const handlePrev = () => {
        if (currentChapter > 0 && !isFlipping) {
            setIsFlipping(true);
            setTimeout(() => {
                setCurrentChapter((prev) => prev - 1);
                setIsFlipping(false);
            }, 600);
        }
    };

    const handleReplay = () => {
        setCurrentChapter(0);
    };

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center p-4 md:p-8">

            {/* Book Container - Clean & Minimal */}
            <div className="relative w-full max-w-5xl aspect-[3/2] flex bg-[#fff9f0] rounded-r-lg rounded-l-sm shadow-2xl p-3 md:p-6 perspective-[2000px]">

                {/* Subtle Book Cover/Shadow */}
                <div className="absolute inset-0 rounded-r-lg rounded-l-sm shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] pointer-events-none" />

                <div className="relative w-full h-full flex bg-[#fffbf0] shadow-inner rounded overflow-hidden border border-stone-100">

                    {/* Left Page (Previous or Left Content) */}
                    <div className="w-1/2 h-full border-r border-stone-200 relative">
                        <Tape className="-top-4 left-10 rotate-[-2deg]" />
                        <BookPage pageNum={currentChapter * 2}>
                            <DoodleStar className="absolute top-4 left-4" />
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                {chapter.type === "cover" ? (
                                    <>
                                        <h1 className="font-handwriting text-5xl md:text-7xl text-deep-red mb-6">Our Love</h1>
                                        <p className="font-typewriter text-stone-500 tracking-widest text-sm uppercase">Volume I</p>
                                    </>
                                ) : chapter.type === "book-page" ? (
                                    <>
                                        <h2 className="font-handwriting text-3xl md:text-4xl text-deep-red mb-6">{chapter.title}</h2>
                                        <p className="font-typewriter text-sm md:text-base leading-loose text-stone-700">
                                            {chapter.text}
                                        </p>
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <p className="font-typewriter text-stone-400 italic">Interlude...</p>
                                    </div>
                                )}
                            </div>
                        </BookPage>
                    </div>

                    {/* Right Page (Current Content) */}
                    <div className="w-1/2 h-full relative">
                        <Tape className="-bottom-4 right-10 rotate-[2deg]" />
                        <BookPage pageNum={currentChapter * 2 + 1}>
                            <div className="flex flex-col items-center justify-center h-full w-full">
                                {chapter.type === "cover" ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-32 h-32 rounded-full border-4 border-deep-red/20 flex items-center justify-center">
                                            <span className="text-4xl">❤️</span>
                                        </div>
                                        <p className="font-typewriter text-stone-500 text-xs mt-4">Written specifically for you</p>
                                    </div>
                                ) : chapter.type === "book-page" && chapter.image ? (
                                    <div className="relative w-full h-64 md:h-80 overflow-hidden rounded shadow-inner sepia-[0.3]">
                                        <img src={chapter.image} alt={chapter.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                    </div>
                                ) : chapter.type === "surprise-vhs" ? (
                                    <VideoSurprise onNext={handleNext} />
                                ) : chapter.type === "surprise-letter" ? (
                                    <VintageLetter onNext={handleNext} />
                                ) : chapter.type === "surprise-gift" ? (
                                    <GiftBox onNext={handleNext} />
                                ) : chapter.type === "countdown" ? (
                                    <ForeverCountdown onNext={handleNext} />
                                ) : chapter.type === "ending" ? (
                                    <Ending onReplay={handleReplay} />
                                ) : (
                                    <p className="font-typewriter text-stone-500">...</p>
                                )}
                            </div>
                        </BookPage>

                        {/* Navigation Overlay (Invisible usually, but explicit buttons for clarity) */}
                        <div className="absolute bottom-8 right-8 z-30">
                            {currentChapter < storyChapters.length - 1 && (
                                <button onClick={handleNext} className="flex items-center gap-2 text-deep-red/60 hover:text-deep-red transition-colors font-typewriter text-xs uppercase tracking-widest group">
                                    Next Page <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Page Turn Animation Overlay (3D Effect) */}
                <AnimatePresence>
                    {isFlipping && (
                        <motion.div
                            initial={{ transformOrigin: "left", rotateY: 0, zIndex: 50 }}
                            animate={{ rotateY: -180 }}
                            exit={{ opacity: 0, transition: { duration: 0.2 } }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="absolute top-2 bottom-2 right-1/2 w-[calc(50%-16px)] bg-[#fdfbf7] shadow-xl border-l border-stone-200"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Front of the flipping page */}
                            <div className="absolute inset-0 bg-[#f8f5f0] backface-hidden" style={{ backfaceVisibility: "hidden" }}>
                                <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
                            </div>

                            {/* Back of the flipping page */}
                            <div className="absolute inset-0 bg-[#f8f5f0] flex items-center justify-center backface-hidden"
                                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-l from-black/5 to-transparent pointer-events-none" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Previous Button */}
                <div className="absolute bottom-8 left-8 z-30">
                    {currentChapter > 0 && (
                        <button onClick={handlePrev} className="flex items-center gap-2 text-deep-red/60 hover:text-deep-red transition-colors font-typewriter text-xs uppercase tracking-widest group">
                            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Previous
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
