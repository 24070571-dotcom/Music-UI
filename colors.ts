export const colors = {
  background: "#0a0a0f",
  surface: "#1a1a2e",
  surfaceLight: "#252545",
  
  primary: "#8b5cf6",
  primaryDark: "#6366f1",
  secondary: "#ec4899",
  accent: "#06b6d4",
  
  text: "#ffffff",
  textSecondary: "#a1a1aa",
  textMuted: "#6b7280",
  
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
  
  gradients: {
    primary: ["#6366f1", "#8b5cf6"] as const,
    sunset: ["#f59e0b", "#ef4444"] as const,
    ocean: ["#06b6d4", "#6366f1"] as const,
    berry: ["#ec4899", "#8b5cf6"] as const,
  },
};

export default colors;
