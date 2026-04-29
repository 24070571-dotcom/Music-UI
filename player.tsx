import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  ChevronDown,
  Heart,
  Share2,
  MoreHorizontal,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Shuffle,
  Repeat,
} from "lucide-react-native";
import { usePlayer } from "@/components/PlayerContext";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Animated } from "react-native";
import * as Haptics from "expo-haptics";

const { width, height } = Dimensions.get("window");
const ALBUM_SIZE = width - 64;

export default function PlayerScreen() {
  const {
    currentSong,
    isPlaying,
    progress,
    togglePlayPause,
    skipNext,
    skipPrevious,
    isLiked,
    toggleLike,
  } = usePlayer();

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleLike();
  };

  const handlePlay = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    togglePlayPause();
  };

  if (!currentSong) {
    router.back();
    return null;
  }

  const progressWidth = progress * 100;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1a1a2e", "#0a0a0f"]}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
            <ChevronDown size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.playingFrom}>Playing from</Text>
            <Text style={styles.playlistName}>Daily Mix</Text>
          </View>
          <TouchableOpacity style={styles.headerButton}>
            <MoreHorizontal size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Album Art */}
        <View style={styles.albumContainer}>
          <Image
            source={{ uri: currentSong.cover }}
            style={styles.albumArt}
            contentFit="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(10,10,15,0.8)"]}
            style={styles.albumOverlay}
          />
        </View>

        {/* Song Info */}
        <View style={styles.songInfo}>
          <View style={styles.titleRow}>
            <View style={styles.titleContainer}>
              <Text style={styles.songTitle}>{currentSong.title}</Text>
              <Text style={styles.artistName}>{currentSong.artist}</Text>
            </View>
            <TouchableOpacity 
              onPress={handleLike}
              style={[styles.likeButton, isLiked && styles.likeButtonActive]}
            >
              <Heart 
                size={24} 
                color={isLiked ? "#ef4444" : "#fff"} 
                fill={isLiked ? "#ef4444" : "transparent"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressWidth}%` as const }]} />
            <View style={[styles.progressThumb, { left: `${progressWidth}%` as const }]} />
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>
              {Math.floor(progress * 180 / 60)}:{String(Math.floor(progress * 180 % 60)).padStart(2, "0")}
            </Text>
            <Text style={styles.timeText}>3:00</Text>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton}>
            <Shuffle size={20} color="#6b7280" />
          </TouchableOpacity>

          <TouchableOpacity onPress={skipPrevious} style={styles.controlButton}>
            <SkipBack size={28} color="#fff" fill="#fff" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handlePlay}
            style={styles.playButton}
          >
            <LinearGradient
              colors={["#6366f1", "#8b5cf6"]}
              style={styles.playButtonGradient}
            >
              {isPlaying ? (
                <Pause size={32} color="#fff" fill="#fff" />
              ) : (
                <Play size={32} color="#fff" fill="#fff" style={{ marginLeft: 4 }} />
              )}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={skipNext} style={styles.controlButton}>
            <SkipForward size={28} color="#fff" fill="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton}>
            <Repeat size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Extra Actions */}
        <View style={styles.extraActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Share2 size={20} color="#6b7280" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.lyricsButton}>Lyrics</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0f",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    marginBottom: 24,
  },
  headerButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  headerCenter: {
    alignItems: "center",
  },
  playingFrom: {
    fontSize: 12,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  playlistName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginTop: 2,
  },
  albumContainer: {
    width: ALBUM_SIZE,
    height: ALBUM_SIZE,
    alignSelf: "center",
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 32,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 20,
  },
  albumArt: {
    width: "100%",
    height: "100%",
  },
  albumOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  songInfo: {
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  songTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  artistName: {
    fontSize: 16,
    color: "#6b7280",
  },
  likeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  likeButtonActive: {
    backgroundColor: "rgba(239,68,68,0.2)",
  },
  progressContainer: {
    marginBottom: 32,
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 2,
    marginBottom: 8,
    position: "relative",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#8b5cf6",
    borderRadius: 2,
  },
  progressThumb: {
    position: "absolute",
    top: -4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
    marginLeft: -6,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    fontSize: 12,
    color: "#6b7280",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  controlButton: {
    padding: 12,
  },
  playButton: {
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  playButtonGradient: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  extraActions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
  },
  actionButton: {
    padding: 12,
  },
  lyricsButton: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
