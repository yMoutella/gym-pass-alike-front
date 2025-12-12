import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/contexts/AuthContext";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface User {
  name: string;
  email: string;
  plan: string;
}

interface Gym {
  id: string;
  name: string;
  address: string;
  distance: string;
}

export default function HomeScreen() {
  const [checkinsCount, setCheckinsCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [gyms, setGyms] = useState<Gym[]>([
    {
      id: "1",
      name: "FitGym Centro",
      address: "Rua Principal, 123",
      distance: "0.5 km",
    },
    {
      id: "2",
      name: "PowerHouse Academia",
      address: "Av. Santos, 456",
      distance: "1.2 km",
    },
    {
      id: "3",
      name: "BodyFit Studio",
      address: "Rua das Flores, 789",
      distance: "2.0 km",
    },
  ]);
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const cardBackground = useThemeColor(
    { light: "#F8F9FA", dark: "#1F2937" },
    "cardBackground"
  );
  const inputBackground = useThemeColor(
    { light: "#FFFFFF", dark: "#1F2937" },
    "inputBackground"
  );
  const inputBorderColor = useThemeColor(
    { light: "#E5E7EB", dark: "#374151" },
    "inputBorder"
  );
  const primaryColor = useThemeColor(
    { light: "#7C3AED", dark: "#7C3AED" },
    "buttonPrimary"
  );

  useEffect(() => {
    // Example: fetch check-ins count from API here when authenticated
    if (isAuthenticated) {
      setCheckinsCount(12);
    }
  }, [isAuthenticated]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleCheckIn = (gymId: string) => {
    // TODO: Implement check-in logic
    console.log("Check-in at gym:", gymId);
  };

  const renderGymCard = ({ item }: { item: Gym }) => (
    <View style={[styles.gymCard, { backgroundColor: cardBackground }]}>
      <View style={styles.gymCardContent}>
        <ThemedText type="subtitle" style={styles.gymName}>
          {item.name}
        </ThemedText>
        <ThemedText style={styles.gymAddress}>{item.address}</ThemedText>
        <ThemedText style={styles.gymDistance}>{item.distance} away</ThemedText>
      </View>
      <TouchableOpacity
        style={[styles.checkInButton, { backgroundColor: primaryColor }]}
        onPress={() => handleCheckIn(item.id)}
      >
        <ThemedText style={styles.checkInButtonText}>Check-in</ThemedText>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  if (!isAuthenticated || !user) {
    router.replace("/(auth)/login");
    return null;
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      {/* Section 1: User Info - 25% of screen */}
      <View style={[styles.userSection, { backgroundColor: cardBackground }]}>
        <View style={styles.userInfoRow}>
          <View style={styles.userLeft}>
            <View
              style={[styles.avatarCircle, { backgroundColor: primaryColor }]}
            >
              <ThemedText style={styles.avatarText}>
                {getInitials(user.name!)}
              </ThemedText>
            </View>
            <View style={styles.userTextContainer}>
              <ThemedText type="defaultSemiBold" style={styles.greeting}>
                Hello, {user.name}
              </ThemedText>
              <ThemedText style={styles.planText}>{user.plan}</ThemedText>
            </View>
          </View>
          <View style={styles.checkinsContainer}>
            <ThemedText
              type="title"
              style={[styles.checkinsCount, { color: primaryColor }]}
            >
              {checkinsCount}
            </ThemedText>
            <ThemedText style={styles.checkinsLabel}>Check-ins</ThemedText>
          </View>
        </View>
      </View>

      {/* Section 2: Search and Gyms List */}
      <ScrollView style={styles.contentSection}>
        <View style={styles.searchContainer}>
          <TextInput
            style={[
              styles.searchInput,
              {
                backgroundColor: inputBackground,
                borderColor: inputBorderColor,
                color: textColor,
              },
            ]}
            placeholder="Search nearby gyms..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.gymsSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Nearby Gyms
          </ThemedText>
          <FlatList
            data={gyms}
            renderItem={renderGymCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.gymsList}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userSection: {
    height: screenHeight * 0.25,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    justifyContent: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  userInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  userTextContainer: {
    marginLeft: 12,
    justifyContent: "center",
  },
  greeting: {
    fontSize: 18,
    marginBottom: 2,
  },
  planText: {
    fontSize: 12,
    opacity: 0.7,
  },
  checkinsContainer: {
    alignItems: "center",
    paddingLeft: 16,
  },
  checkinsCount: {
    fontSize: 32,
    fontWeight: "bold",
  },
  checkinsLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
  contentSection: {
    flex: 1,
    paddingTop: 20,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  gymsSection: {
    paddingLeft: 20,
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: 20,
  },
  gymsList: {
    paddingRight: 20,
  },
  gymCard: {
    width: 280,
    marginRight: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  gymCardContent: {
    marginBottom: 16,
  },
  gymName: {
    fontSize: 18,
    marginBottom: 8,
  },
  gymAddress: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  gymDistance: {
    fontSize: 12,
    opacity: 0.6,
  },
  checkInButton: {
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkInButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
