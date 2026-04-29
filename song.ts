export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: string;
  genre: string;
}

export interface Genre {
  id: string;
  name: string;
  count: number;
  gradient: [string, string];
}

export const recommendedSongs: Song[] = [
  {
    id: "1",
    title: "Midnight City",
    artist: "M83",
    album: "Hurry Up, We're Dreaming",
    cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400&h=400&fit=crop",
    duration: "4:03",
    genre: "Electronic",
  },
  {
    id: "2",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400&h=400&fit=crop",
    duration: "3:20",
    genre: "Pop",
  },
  {
    id: "3",
    title: "Nightcall",
    artist: "Kavinsky",
    album: "OutRun",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    duration: "4:18",
    genre: "Electronic",
  },
  {
    id: "4",
    title: "Get Lucky",
    artist: "Daft Punk",
    album: "Random Access Memories",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
    duration: "6:09",
    genre: "Disco",
  },
  {
    id: "5",
    title: "Starboy",
    artist: "The Weeknd",
    album: "Starboy",
    cover: "https://images.unsplash.com/photo-1459749411177-287ce146518c?w=400&h=400&fit=crop",
    duration: "3:50",
    genre: "R&B",
  },
  {
    id: "6",
    title: "Instant Crush",
    artist: "Daft Punk",
    album: "Random Access Memories",
    cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400&h=400&fit=crop",
    duration: "5:37",
    genre: "Electronic",
  },
];

export const trendingSongs: Song[] = [
  {
    id: "7",
    title: "Anti-Hero",
    artist: "Taylor Swift",
    album: "Midnights",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop",
    duration: "3:20",
    genre: "Pop",
  },
  {
    id: "8",
    title: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    cover: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=400&h=400&fit=crop",
    duration: "2:47",
    genre: "Pop",
  },
  {
    id: "9",
    title: "Heat Waves",
    artist: "Glass Animals",
    album: "Dreamland",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop",
    duration: "3:58",
    genre: "Indie",
  },
  {
    id: "10",
    title: "Stay",
    artist: "The Kid LAROI",
    album: "F*CK LOVE 3",
    cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
    duration: "2:21",
    genre: "Pop",
  },
];

export const newReleases: Song[] = [
  {
    id: "11",
    title: "Cruel Summer",
    artist: "Taylor Swift",
    album: "Lover",
    cover: "https://images.unsplash.com/photo-1459749411177-287ce146518c?w=400&h=400&fit=crop",
    duration: "2:58",
    genre: "Pop",
  },
  {
    id: "12",
    title: "Seven",
    artist: "Jung Kook",
    album: "Seven",
    cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400&h=400&fit=crop",
    duration: "3:04",
    genre: "Pop",
  },
  {
    id: "13",
    title: "Vampire",
    artist: "Olivia Rodrigo",
    album: "GUTS",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
    duration: "3:39",
    genre: "Pop",
  },
  {
    id: "14",
    title: "Paint The Town Red",
    artist: "Doja Cat",
    album: "Scarlet",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
    duration: "3:51",
    genre: "Hip Hop",
  },
];

export const genres: Genre[] = [
  {
    id: "1",
    name: "Electronic",
    count: 1240,
    gradient: ["#6366f1", "#8b5cf6"],
  },
  {
    id: "2",
    name: "Pop",
    count: 3420,
    gradient: ["#ec4899", "#f43f5e"],
  },
  {
    id: "3",
    name: "Hip Hop",
    count: 2150,
    gradient: ["#f59e0b", "#ef4444"],
  },
  {
    id: "4",
    name: "Rock",
    count: 1890,
    gradient: ["#10b981", "#3b82f6"],
  },
  {
    id: "5",
    name: "Indie",
    count: 980,
    gradient: ["#8b5cf6", "#d946ef"],
  },
  {
    id: "6",
    name: "R&B",
    count: 1560,
    gradient: ["#06b6d4", "#6366f1"],
  },
];
