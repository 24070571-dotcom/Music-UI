import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import {
  Plus,
  Music2,
  MoreVertical,
  Trash2,
  Play,
  Heart,
  Clock,
  ChevronRight,
  X,
  Search,
  Disc3,
} from "lucide-react-native";
import { usePlaylists, Playlist } from "@/components/PlaylistContext";
import { usePlayer } from "@/components/PlayerContext";
import { Image } from "expo-image";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";

function PlaylistCard({
  playlist,
  onPress,
  onDelete,
}: {
  playlist: Playlist;
  onPress: () => void;
  onDelete?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.playlistCard} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.playlistCoverContainer}>
        <Image source={{ uri: playlist.cover }} style={styles.playlistCover} contentFit="cover" />
        <LinearGradient colors={["transparent", "rgba(0,0,0,0.7)"]} style={styles.coverOverlay} />
        <View style={styles.songCountBadge}>
          <Music2 size={12} color="#fff" />
          <Text style={styles.songCountText}>{playlist.songs.length}</Text>
        </View>
      </View>
      <View style={styles.playlistInfo}>
        <Text style={styles.playlistName} numberOfLines={1}>
          {playlist.name}
        </Text>
        <Text style={styles.playlistDescription} numberOfLines={1}>
          {playlist.description || `${playlist.songs.length} songs`}
        </Text>
      </View>
      {onDelete && (
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Trash2 size={18} color="#ef4444" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

function CreatePlaylistModal({
  visible,
  onClose,
  onCreate,
}: {
  visible: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (name.trim()) {
      onCreate(name.trim(), description.trim());
      setName("");
      setDescription("");
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <BlurView intensity={80} style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Create Playlist</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="My Awesome Playlist"
              placeholderTextColor="#6b7280"
              value={name}
              onChangeText={setName}
              autoFocus
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description (optional)</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Add a description..."
              placeholderTextColor="#6b7280"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={3}
            />
          </View>

          <TouchableOpacity style={styles.createButton} onPress={handleCreate} activeOpacity={0.8}>
            <LinearGradient
              colors={["	#6366f1", "#8b5cf6"]}
              style={styles.createButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.createButtonText}>Create</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );
}

export default function LibraryScreen() {
  const { playlists, createPlaylist, deletePlaylist, isLoading } = usePlaylists();
  const { playSong } = usePlayer();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreate = (name: string, description: string) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    createPlaylist(name, description);
  };

  const handleDelete = (playlist: Playlist) => {
    if (playlist.id === "liked" || playlist.id === "recent") return;

    Alert.alert("Delete Playlist", `Are you sure you want to delete "${playlist.name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          deletePlaylist(playlist.id);
        },
      },
    ]);
  };

  const filteredPlaylists = playlists.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const specialPlaylists = filteredPlaylists.filter((p) => p.id === "liked" || p.id === "recent");
  const userPlaylists = filteredPlaylists.filter((p) => p.id !== "liked" && p.id !== "recent");

  return (
    <View style={styles.container}>
      <LinearGradient colors={["	#1a1a2e", "#0a0a0f"]} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Your Library</Text>
              <Text style={styles.subtitle}>{playlists.length} playlists</Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setShowCreateModal(true);
              }}
            >
              <LinearGradient
                colors={["	#6366f1", "#8b5cf6"]}
                style={styles.addButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Plus size={24} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View style={styles.searchContainer}>
            <Search size={20} color="#6b7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search playlists..."
              placeholderTextColor="#6b7280"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Special Playlists (Liked & Recent) */}
          <View style={styles.specialPlaylists}>
            {specialPlaylists.map((playlist) => (
              <TouchableOpacity
                key={playlist.id}
                style={styles.specialCard}
                onPress={() => {}}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={
                    playlist.id === "liked"
                      ? ["#ec4899", "#f43f5e"]
                      : ["#6366f1", "#8b5cf6"]
                  }
                  style={StyleSheet.absoluteFill}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
                <View style={styles.specialIcon}>
                  {playlist.id === "liked" ? (
                    <Heart size={28} color="#fff" fill="#fff" />
                  ) : (
                    <Clock size={28} color="#fff" />
                  )}
                </View>
                <Text style={styles.specialTitle}>{playlist.name}</Text>
                <Text style={styles.specialCount}>{playlist.songs.length} songs</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Your Playlists */}
          <View style={styles.sectionHeader}>
            <Disc3 size={20} color="#8b5cf6" />
            <Text style={styles.sectionTitle}>Your Playlists</Text>
          </View>

          {userPlaylists.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Music2 size={40} color="#8b5cf6" />
              </View>
              <Text style={styles.emptyTitle}>No playlists yet</Text>
              <Text style={styles.emptyText}>Create your first playlist to get started</Text>
            </View>
          ) : (
            <View style={styles.playlistList}>
              {userPlaylists.map((playlist) => (
                <PlaylistCard
                  key={playlist.id}
                  playlist={playlist}
                  onPress={() => {}}
                  onDelete={() => handleDelete(playlist)}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>

      <CreatePlaylistModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreate}
      />
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
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: "hidden",
  },
  addButtonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    marginLeft: 12,
  },
  specialPlaylists: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  specialCard: {
    flex: 1,
    height: 120,
    borderRadius: 16,
    padding: 16,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  specialIcon: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  specialTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  specialCount: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  playlistList: {
    gap: 12,
  },
  playlistCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 12,
    padding: 12,
  },
  playlistCoverContainer: {
    width: 64,
    height: 64,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  playlistCover: {
    width: "100%",
    height: "100%",
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  songCountBadge: {
    position: "absolute",
    bottom: 6,
    left: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  songCountText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "600",
  },
  playlistInfo: {
    flex: 1,
    marginLeft: 12,
  },
  playlistName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 2,
  },
  playlistDescription: {
    fontSize: 13,
    color: "#6b7280",
  },
  deleteButton: {
    padding: 8,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(139, 92, 246, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#6b7280",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#1a1a2e",
    borderRadius: 24,
    padding: 24,
    width: "85%",
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  closeButton: {
    padding: 4,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9ca3af",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: "#fff",
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  createButton: {
    marginTop: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  createButtonGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
