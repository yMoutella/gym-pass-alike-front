import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/contexts/AuthContext";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { searchGyms } from "../util/search-gyms";

type Gym = {
  id: string;
  title: string;
  description?: string;
  phone?: string;
  address?: string;
};

export default function ExploreScreen() {
  const { token, isAuthenticated } = useAuth();
  const [query, setQuery] = useState("");
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

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

  const canQuery = useMemo(
    () => Boolean(isAuthenticated && token),
    [isAuthenticated, token]
  );

  async function runSearch(q: string) {
    if (!canQuery) return;
    setLoading(true);
    try {
      const resp = await searchGyms({ query: q, page: 1, token: token! });
      setGyms(resp.gyms ?? []);
    } catch (e) {
      setGyms([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!initialized && canQuery) {
      setInitialized(true);
      runSearch("");
    }
  }, [initialized, canQuery]);

  useEffect(() => {
    const t = setTimeout(() => {
      runSearch(query.trim());
    }, 350);
    return () => clearTimeout(t);
  }, [query]);

  const renderGymCard = ({ item }: { item: Gym }) => (
    <View style={[styles.gymCard, { backgroundColor: cardBackground }]}>
      <View style={styles.gymCardContent}>
        <ThemedText type="subtitle" style={styles.gymName}>
          {item.title}
        </ThemedText>
        {item.address ? (
          <ThemedText style={styles.gymAddress}>{item.address}</ThemedText>
        ) : null}
        {item.description ? (
          <ThemedText style={styles.gymDescription}>
            {item.description}
          </ThemedText>
        ) : null}
      </View>
      <TouchableOpacity
        style={[styles.detailsButton, { backgroundColor: primaryColor }]}
      >
        <ThemedText style={styles.detailsButtonText}>Details</ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      {/* Section 1: Header - same style as Home userSection */}
      <View style={[styles.headerSection, { backgroundColor: cardBackground }]}>
        <ThemedText type="title" style={styles.headerTitle}>
          Explore
        </ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Search and discover gyms
        </ThemedText>
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
            placeholder="Search all gyms..."
            placeholderTextColor="#9CA3AF"
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />
        </View>

        <View style={styles.gymsSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            All Gyms
          </ThemedText>

          {loading ? (
            <View style={styles.loader}>
              <ActivityIndicator />
            </View>
          ) : (
            <FlatList
              data={gyms}
              renderItem={renderGymCard}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.gymsList}
              ListEmptyComponent={
                <View style={styles.empty}>
                  <ThemedText>No gyms found.</ThemedText>
                </View>
              }
            />
          )}
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
  headerSection: {
    height: screenHeight * 0.2,
    paddingHorizontal: 20,
    paddingTop: 50,
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
  headerTitle: {
    marginBottom: 4,
  },
  headerSubtitle: {
    opacity: 0.7,
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
    paddingHorizontal: 20,
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: 20,
  },
  gymsList: {
    paddingBottom: 24,
    gap: 16,
  },
  gymCard: {
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
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
  gymDescription: {
    fontSize: 12,
    opacity: 0.6,
  },
  detailsButton: {
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  loader: {
    paddingVertical: 40,
    alignItems: "center",
  },
  empty: {
    alignItems: "center",
    paddingTop: 40,
  },
});
