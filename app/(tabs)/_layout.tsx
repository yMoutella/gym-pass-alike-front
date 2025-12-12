import { useAuth } from "@/contexts/AuthContext";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  const tabBarActiveTintColor = useThemeColor(
    { light: "#7C3AED", dark: "#A78BFA" },
    "primary"
  );
  const tabBarInactiveTintColor = useThemeColor(
    { light: "#9CA3AF", dark: "#6B7280" },
    "tabIconDefault"
  );
  const tabBarBackgroundColor = useThemeColor(
    { light: "#FFFFFF", dark: "#1F2937" },
    "cardBackground"
  );

  if (isLoading) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
        headerShown: false,
        tabBarLabelPosition: "below-icon",
        tabBarLabelStyle: {
          textAlign: "center",
        },
        tabBarIconStyle: {
          margin: 0,
        },
        tabBarStyle: {
          backgroundColor: tabBarBackgroundColor,
          display: isAuthenticated ? "flex" : "none",
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          href: "/(tabs)",
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
          href: "/(tabs)/explore",
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          href: "/(tabs)/account",
        }}
      />
    </Tabs>
  );
}
