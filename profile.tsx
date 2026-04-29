import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import {
  User,
  Mail,
  Crown,
  Music2,
  Bell,
  Moon,
  Globe,
  ChevronRight,
  LogOut,
  Check,
  Zap,
  Users,
  GraduationCap,
  Sparkles,
} from "lucide-react-native";
import { useAuth } from "@/components/AuthContext";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";

type PlanType = "free" | "student" | "family" | "premium";

interface Plan {
  id: PlanType;
  name: string;
  icon: React.ReactNode;
  price: string;
  period: string;
  color: string[];
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    icon: <Music2 size={24} color="#fff" />,
    price: "$0",
    period: "/month",
    color: ["#6b7280", "#4b5563"],
    features: ["Shuffle play", "Ad-supported", "Basic audio quality", "Limited skips"],
  },
  {
    id: "student",
    name: "Student",
    icon: <GraduationCap size={24} color="#fff" />,
    price: "$4.99",
    period: "/month",
    color: ["#10b981", "#059669"],
    features: ["Ad-free music", "Offline mode", "High quality audio", "Student verified"],
  },
  {
    id: "family",
    name: "Family",
    icon: <Users size={24} color="#fff" />,
    price: "$14.99",
    period: "/month",
    color: ["#f59e0b", "#d97706"],
    features: ["Up to 6 accounts", "Parental controls", "Shared playlist", "Premium features"],
  },
  {
    id: "premium",
    name: "Premium",
    icon: <Crown size={24} color="#fff" />,
    price: "$9.99",
    period: "/month",
    color: ["#6366f1", "#8b5cf6"],
    popular: true,
    features: [
      "Ad-free music",
      "Offline downloads",
      "HiFi audio quality",
      "Unlimited skips",
      "Early access to features",
    ],
  },
];

function PlanCard({
  plan,
  isActive,
  onSelect,
}: {
  plan: Plan;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.planCard, isActive && styles.planCardActive]}
      onPress={onSelect}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={plan.color as [string, string]}
        style={styles.planGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {plan.popular && (
          <View style={styles.popularBadge}>
            <Sparkles size={12} color="#fff" />
            <Text style={styles.popularText}>Popular</Text>
          </View>
        )}

        <View style={styles.planHeader}>
          <View style={styles.planIcon}>{plan.icon}</View>
          <View>
            <Text style={styles.planName}>{plan.name}</Text>
            <View style={styles.priceRow}>
              <Text style={styles.planPrice}>{plan.price}</Text>
              <Text style={styles.planPeriod}>{plan.period}</Text>
            </View>
          </View>
        </View>

        <View style={styles.featuresList}>
          {plan.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.checkIcon}>
                <Check size={12} color="#fff" />
              </View>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {isActive && (
          <View style={styles.activeBadge}>
            <Text style={styles.activeText}>Current Plan</Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

function SettingsItem({
  icon: Icon,
  label,
  value,
  onPress,
  showArrow = true,
}: {
  icon: typeof User;
  label: string;
  value?: string;
  onPress?: () => void;
  showArrow?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.settingsIcon}>
        <Icon size={20} color="#8b5cf6" />
      </View>
      <Text style={styles.settingsLabel}>{label}</Text>
      {value && <Text style={styles.settingsValue}>{value}</Text>}
      {showArrow && <ChevronRight size={20} color="#6b7280" />}
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [currentPlan, setCurrentPlan] = React.useState<PlanType>("free");
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(true);
  const [offlineMode, setOfflineMode] = React.useState(false);

  const handleLogout = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await logout();
    router.replace("/welcome");
  };

  const handlePlanSelect = (planId: PlanType) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCurrentPlan(planId);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["	#1a1a2e", "#0a0a0f"]} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Profile</Text>
          </View>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            <LinearGradient
              colors={["	#6366f1", "#8b5cf6"]}
              style={styles.profileGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <User size={40} color="#fff" />
                </View>
                <View style={styles.avatarRing} />
              </View>

              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{user?.name || "Music Lover"}</Text>
                <Text style={styles.profileEmail}>{user?.email || "user@example.com"}</Text>
              </View>

              <View style={styles.planBadge}>
                <Crown size={14} color="#fff" />
                <Text style={styles.planBadgeText}>
                  {currentPlan === "free"
                    ? "Free"
                    : currentPlan === "premium"
                    ? "Premium"
                    : currentPlan === "student"
                    ? "Student"
                    : "Family"}
                </Text>
              </View>
            </LinearGradient>
          </View>

          {/* Subscription Plans */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Zap size={20} color="#8b5cf6" />
              <Text style={styles.sectionTitle}>Subscription Plans</Text>
            </View>

            <Text style={styles.sectionSubtitle}>Choose the plan that fits you best</Text>

            <View style={styles.plansContainer}>
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  isActive={currentPlan === plan.id}
                  onSelect={() => handlePlanSelect(plan.id)}
                />
              ))}
            </View>
          </View>

          {/* Quick Settings */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Bell size={20} color="#8b5cf6" />
              <Text style={styles.sectionTitle}>Quick Settings</Text>
            </View>

            <BlurView intensity={20} style={styles.settingsCard}>
              <View style={styles.toggleItem}>
                <View style={styles.toggleLeft}>
                  <Bell size={20} color="#fff" />
                  <Text style={styles.toggleLabel}>Notifications</Text>
                </View>
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: "#374151", true: "#8b5cf6" }}
                  thumbColor={notifications ? "#fff" : "#9ca3af"}
                />
              </View>

              <View style={styles.divider} />

              <View style={styles.toggleItem}>
                <View style={styles.toggleLeft}>
                  <Moon size={20} color="#fff" />
                  <Text style={styles.toggleLabel}>Dark Mode</Text>
                </View>
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: "#374151", true: "#8b5cf6" }}
                  thumbColor={darkMode ? "#fff" : "#9ca3af"}
                />
              </View>

              <View style={styles.divider} />

              <View style={styles.toggleItem}>
                <View style={styles.toggleLeft}>
                  <Globe size={20} color="#fff" />
                  <Text style={styles.toggleLabel}>Offline Mode</Text>
                </View>
                <Switch
                  value={offlineMode}
                  onValueChange={setOfflineMode}
                  trackColor={{ false: "#374151", true: "#8b5cf6" }}
                  thumbColor={offlineMode ? "#fff" : "#9ca3af"}
                />
              </View>
            </BlurView>
          </View>

          {/* Logout */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
            <LogOut size={20} color="#ef4444" />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>

          <Text style={styles.versionText}>Version 1.0.0 (Demo)</Text>
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
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },
  profileCard: {
    marginBottom: 32,
    borderRadius: 24,
    overflow: "hidden",
  },
  profileGradient: {
    padding: 24,
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  avatarRing: {
    position: "absolute",
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 16,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
  },
  planBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  planBadgeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 16,
  },
  plansContainer: {
    gap: 12,
  },
  planCard: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
  planCardActive: {
    borderColor: "#8b5cf6",
  },
  planGradient: {
    padding: 20,
  },
  popularBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#fff",
  },
  planHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  planIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  planName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 2,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  planPrice: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  planPeriod: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  featureText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
  },
  activeBadge: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "rgba(255,255,255,0.3)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  activeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
  },
  settingsCard: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 16,
    overflow: "hidden",
  },
  toggleItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  toggleLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  toggleLabel: {
    fontSize: 16,
    color: "#fff",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginHorizontal: 16,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 12,
    marginBottom: 8,
  },
  settingsIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(139, 92, 246, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingsLabel: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
  },
  settingsValue: {
    fontSize: 14,
    color: "#6b7280",
    marginRight: 8,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ef4444",
  },
  versionText: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 24,
  },
});
