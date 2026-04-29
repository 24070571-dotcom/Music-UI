import React, { useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { 
  Play, 
  Heart, 
  Search, 
  User, 
  TrendingUp,
  Disc3,
  Music2,
  Sparkles,
  Flame
} from "lucide-react-native";
import { usePlayer } from "@/components/PlayerContext";
import { useAuth } from "@/components/AuthContext";
import { Song, Genre, recommendedSongs, trendingSongs, newReleases, genres } from "@/data/songs";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

const { width } = Dimensions.get("window");
const SONG_CARD_WIDTH = 140;
const GENRE_CARD_SIZE = (width - 48) / 2;

function SongCard({ song, onPress }: { song: Song; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.songCard} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.albumContainer}>
        <Image
          source={{ uri: song.cover }}
          style={styles.albumArt}
          contentFit="cover"
        />
        <BlurView intensity={80} style={styles.playOverlay}>
          <Play size={20} color="#fff" fill="#fff" />
        </BlurView>
      </View>
      <Text style={styles.songTitle} numberOfLines={1}>{song.title}</Text>
      <Text style={styles.artistName} numberOfLines={1}>{song.artist}</Text>
    </TouchableOpacity>
  );
}

function GenreCard({ genre }: { genre: Genre }) {
  return (
    <TouchableOpacity 
      style={styles.genreCard}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={genre.gradient}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.genreIcon}>
        <Music2 size={24} color="#fff" />
      </View>
      <Text style={styles.genreName}>{genre.name}</Text>
      <Text style={styles.genreCount}>{genre.count} songs</Text>
    </TouchableOpacity>
  );
}

function SectionHeader({ title, icon: Icon }: { title: string; icon: any }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleContainer}>
        <Icon size={20} color="#8b5cf6" />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.seeAll}>See all</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function HomeScreen() {
  const { playSong, currentSong, isPlaying } = usePlayer();
  const { user, isLoading, isAuthenticated } = useAuth();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/welcome");
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient
          colors={["#1a1a2e", "#0a0a0f"]}
          style={StyleSheet.absoluteFill}
        />
        <ActivityIndicator size="large" color="#8b5cf6" />
      </View>
    );
  }

  const handlePlay = (song: Song) => {
    playSong(song);
    router.push("/player");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1a1a2e", "#0a0a0f"]}
        style={StyleSheet.absoluteFill}
      />
      
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Good evening</Text>
              <Text style={styles.username}>{user?.name || "Discover your vibe"}</Text>
            </View>
            <TouchableOpacity style={styles.iconButton}>
              <Search size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Daily Mix Card */}
          <TouchableOpacity style={styles.dailyMixCard} activeOpacity={0.9}>
            <LinearGradient
              colors={["#6366f1", "#8b5cf6", "#a855f7"]}
              style={styles.dailyMixGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.dailyMixContent}>
                <View style={styles.dailyMixBadge}>
                  <Sparkles size={14} color="#fff" />
                  <Text style={styles.dailyMixBadgeText}>Daily Mix</Text>
                </View>
                <Text style={styles.dailyMixTitle}>Made For You</Text>
                <Text style={styles.dailyMixSubtitle}>Based on your recent listening</Text>
                <View style={styles.dailyMixStats}>
                  <View style={styles.stat}>
                    <Text style={styles.statValue}>24</Text>
                    <Text style={styles.statLabel}>songs</Text>
                  </View>
                  <View style={styles.stat}>
                    <Text style={styles.statValue}>1.5h</Text>
                    <Text style={styles.statLabel}>duration</Text>
                  </View>
                </View>
              </View>
              <View style={styles.waveDecoration}>
                <View style={styles.waveLine} />
                <View style={[styles.waveLine, { height: 40, opacity: 0.6 }]} />
                <View style={[styles.waveLine, { height: 60, opacity: 0.4 }]} />
                <View style={[styles.waveLine, { height: 30, opacity: 0.8 }]} />
                <View style={[styles.waveLine, { height: 50, opacity: 0.5 }]} />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Recommended For You */}
          <SectionHeader title="Recommended" icon={Disc3} />
          <FlatList
            data={recommendedSongs}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.songList}
            renderItem={({ item }) => (
              <SongCard 
                song={item} 
                onPress={() => handlePlay(item)}
              />
            )}
            keyExtractor={(item) => item.id}
          />

          {/* Trending Now */}
          <SectionHeader title="Trending" icon={Flame} />
          <FlatList
            data={trendingSongs}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.songList}
            renderItem={({ item }) => (
              <SongCard 
                song={item} 
                onPress={() => handlePlay(item)}
              />
            )}
            keyExtractor={(item) => item.id}
          />

          {/* Explore by Genre */}
          <SectionHeader title="Explore by Genre" icon={TrendingUp} />
          <View style={styles.genreGrid}>
            {genres.map((genre) => (
              <GenreCard key={genre.id} genre={genre} />
            ))}
          </View>

          {/* New Releases */}
          <SectionHeader title="New Releases" icon={Disc3} />
          <FlatList
            data={newReleases}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.songList}
            renderItem={({ item }) => (
              <SongCard 
                song={item} 
                onPress={() => handlePlay(item)}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0f",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  username: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },
  headerActions: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  dailyMixCard: {
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 24,
    overflow: "hidden",
  },
  dailyMixGradient: {
    padding: 24,
    minHeight: 180,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dailyMixContent: {
    flex: 1,
  },
  dailyMixBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  dailyMixBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  dailyMixTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  dailyMixSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 16,
  },
  dailyMixStats: {
    flexDirection: "row",
    gap: 24,
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
  },
  waveDecoration: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
    height: 60,
  },
  waveLine: {
    width: 6,
    height: 20,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  seeAll: {
    fontSize: 14,
    color: "#8b5cf6",
    fontWeight: "600",
  },
  songList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  songCard: {
    width: SONG_CARD_WIDTH,
  },
  albumContainer: {
    width: SONG_CARD_WIDTH,
    height: SONG_CARD_WIDTH,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
    position: "relative",
  },
  albumArt: {
    width: "100%",
    height: "100%",
  },
  playOverlay: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  songTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  artistName: {
    fontSize: 12,
    color: "#6b7280",
  },
  genreGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 12,
  },
  genreCard: {
    width: GENRE_CARD_SIZE,
    height: GENRE_CARD_SIZE * 0.6,
    borderRadius: 16,
    padding: 16,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  genreIcon: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  genreName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  genreCount: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    marginTop: 2,
  },
});
