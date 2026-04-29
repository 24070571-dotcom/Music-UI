import createContextHook from "@nkzw/create-context-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { Song } from "@/data/songs";

export interface Playlist {
  id: string;
  name: string;
  description: string;
  cover: string;
  songs: Song[];
  createdAt: string;
  updatedAt: string;
}

interface PlaylistState {
  playlists: Playlist[];
  isLoading: boolean;
  createPlaylist: (name: string, description?: string) => Promise<void>;
  deletePlaylist: (id: string) => Promise<void>;
  addSongToPlaylist: (playlistId: string, song: Song) => Promise<void>;
  removeSongFromPlaylist: (playlistId: string, songId: string) => Promise<void>;
  getPlaylist: (id: string) => Playlist | undefined;
}

const PLAYLISTS_STORAGE_KEY = "@music_app_playlists";

const defaultPlaylists: Playlist[] = [
  {
    id: "liked",
    name: "Liked Songs",
    description: "Your favorite tracks",
    cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400&h=400&fit=crop",
    songs: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "recent",
    name: "Recently Played",
    description: "Tracks you've played recently",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    songs: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const [PlaylistProvider, usePlaylists] = createContextHook<PlaylistState>(() => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredPlaylists();
  }, []);

  const loadStoredPlaylists = async () => {
    try {
      const stored = await AsyncStorage.getItem(PLAYLISTS_STORAGE_KEY);
      if (stored) {
        setPlaylists(JSON.parse(stored));
      } else {
        setPlaylists(defaultPlaylists);
        await AsyncStorage.setItem(PLAYLISTS_STORAGE_KEY, JSON.stringify(defaultPlaylists));
      }
    } catch (error) {
      console.error("Failed to load playlists:", error);
      setPlaylists(defaultPlaylists);
    } finally {
      setIsLoading(false);
    }
  };

  const savePlaylists = async (updatedPlaylists: Playlist[]) => {
    try {
      await AsyncStorage.setItem(PLAYLISTS_STORAGE_KEY, JSON.stringify(updatedPlaylists));
    } catch (error) {
      console.error("Failed to save playlists:", error);
    }
  };

  const createPlaylist = async (name: string, description?: string) => {
    const newPlaylist: Playlist = {
      id: "playlist_" + Date.now(),
      name,
      description: description || "",
      cover: `https://images.unsplash.com/photo-${["1493225255756-d9584f8606e9", "1470225620780-dba8ba36b745", "1514525253161-7a46d19cd819", "1614613535308-eb5fbd3d2c17"][Math.floor(Math.random() * 4)]}?w=400&h=400&fit=crop`,
      songs: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [...playlists, newPlaylist];
    setPlaylists(updated);
    await savePlaylists(updated);
  };

  const deletePlaylist = async (id: string) => {
    if (id === "liked" || id === "recent") return;
    const updated = playlists.filter((p) => p.id !== id);
    setPlaylists(updated);
    await savePlaylists(updated);
  };

  const addSongToPlaylist = async (playlistId: string, song: Song) => {
    const updated = playlists.map((p) => {
      if (p.id === playlistId) {
        if (p.songs.some((s) => s.id === song.id)) return p;
        return {
          ...p,
          songs: [...p.songs, song],
          updatedAt: new Date().toISOString(),
        };
      }
      return p;
    });
    setPlaylists(updated);
    await savePlaylists(updated);
  };

  const removeSongFromPlaylist = async (playlistId: string, songId: string) => {
    const updated = playlists.map((p) => {
      if (p.id === playlistId) {
        return {
          ...p,
          songs: p.songs.filter((s) => s.id !== songId),
          updatedAt: new Date().toISOString(),
        };
      }
      return p;
    });
    setPlaylists(updated);
    await savePlaylists(updated);
  };

  const getPlaylist = (id: string) => {
    return playlists.find((p) => p.id === id);
  };

  return {
    playlists,
    isLoading,
    createPlaylist,
    deletePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
    getPlaylist,
  };
});
