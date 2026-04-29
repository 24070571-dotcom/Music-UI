import React, { createContext, useContext, useState, useCallback } from "react";
import { Song, recommendedSongs } from "@/data/songs";

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  isLiked: boolean;
  playSong: (song: Song) => void;
  togglePlayPause: () => void;
  skipNext: () => void;
  skipPrevious: () => void;
  toggleLike: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const playSong = useCallback((song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setProgress(0);
    setIsLiked(false);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const skipNext = useCallback(() => {
    const currentIndex = recommendedSongs.findIndex((s) => s.id === currentSong?.id);
    const nextIndex = (currentIndex + 1) % recommendedSongs.length;
    setCurrentSong(recommendedSongs[nextIndex]);
    setProgress(0);
  }, [currentSong]);

  const skipPrevious = useCallback(() => {
    const currentIndex = recommendedSongs.findIndex((s) => s.id === currentSong?.id);
    const prevIndex = currentIndex <= 0 ? recommendedSongs.length - 1 : currentIndex - 1;
    setCurrentSong(recommendedSongs[prevIndex]);
    setProgress(0);
  }, [currentSong]);

  const toggleLike = useCallback(() => {
    setIsLiked((prev) => !prev);
  }, []);

  // Simulate progress
  React.useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) {
          return 0;
        }
        return prev + 0.005;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        progress,
        isLiked,
        playSong,
        togglePlayPause,
        skipNext,
        skipPrevious,
        toggleLike,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
