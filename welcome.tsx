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
import { Disc3, Music2, Radio, Headphones } from "lucide-react-native";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/register");
  };

  const handleSignIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push("/login");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1a1a2e", "#0a0a0f", "#16213e"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Floating Music Icons */}
      <View style={styles.floatingIcons}>
        <LinearGradient
          colors={["#6366f1", "#8b5cf6"]}
          style={[styles.floatingIcon, styles.icon1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Music2 size={24} color="#fff" />
        </LinearGradient>
        <LinearGradient
          colors={["#ec4899", "#f43f5e"]}
          style={[styles.floatingIcon, styles.icon2]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Headphones size={24} color="#fff" />
        </LinearGradient>
        <LinearGradient
          colors={["#10b981", "#34d399"]}
          style={[styles.floatingIcon, styles.icon3]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Radio size={24} color="#fff" />
        </LinearGradient>
      </View>

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={["#6366f1", "#8b5cf6", "#ec4899"]}
              style={styles.logoGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Disc3 size={64} color="#fff" />
            </LinearGradient>
            <View style={styles.pulseRing} />
            <View style={[styles.pulseRing, styles.pulseRing2]} />
          </View>

          {/* Title */}
          <Text style={styles.title}>Music Discovery</Text>
          <Text style={styles.subtitle}>
            Your personal music companion. Discover, listen, and enjoy your
            favorite tunes.
          </Text>

          {/* Features */}
          <View style={styles.features}>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>
                Personalized recommendations
              </Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Trending charts & new releases</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Create your own playlists</Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#6366f1", "#8b5cf6"]}
              style={styles.primaryButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>
              Already have an account?{" "}
              <Text style={styles.secondaryButtonTextBold}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingIcons: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  floatingIcon: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  icon1: {
    top: height * 0.15,
    left: 30,
    transform: [{ rotate: "-15deg" }],
  },
  icon2: {
    top: height * 0.25,
    right: 30,
    transform: [{ rotate: "15deg" }],
  },
  icon3: {
    top: height * 0.45,
    left: 20,
    transform: [{ rotate: "-10deg" }],
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  logoContainer: {
    marginBottom: 32,
    position: "relative",
  },
  logoGradient: {
    width: 120,
    height: 120,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  pulseRing: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 40,
    backgroundColor: "rgba(139, 92, 246, 0.3)",
    zIndex: 1,
  },
  pulseRing2: {
    width: 140,
    height: 140,
    borderRadius: 48,
    backgroundColor: "rgba(139, 92, 246, 0.1)",
    top: -10,
    left: -10,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  features: {
    gap: 16,
    alignSelf: "stretch",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#8b5cf6",
  },
  featureText: {
    fontSize: 15,
    color: "#d1d5db",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 16,
  },
  primaryButton: {
    borderRadius: 16,
    overflow: "hidden",
  },
  primaryButtonGradient: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  secondaryButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  secondaryButtonText: {
    fontSize: 14,
    color: "#9ca3af",
  },
  secondaryButtonTextBold: {
    color: "#8b5cf6",
    fontWeight: "700",
  },
});
