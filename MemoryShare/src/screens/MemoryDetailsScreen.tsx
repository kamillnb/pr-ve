import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/RootNavigator";
import { useMemories } from "../context/MemoriesContext";

type Route = RouteProp<RootStackParamList, "MemoryDetails">;

const MemoryDetailsScreen: React.FC = () => {
  const route = useRoute<Route>();
  const { id } = route.params;
  const { getMemoryById, tags } = useMemories();

  const memory = getMemoryById(id);

  if (!memory) {
    return (
      <View style={styles.center}>
        <Text>Memory not found</Text>
      </View>
    );
  }

  const memoryTags = tags.filter((t) => memory.tags.includes(t.id));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: memory.imageUri }} style={styles.image} />
      <Text style={styles.title}>{memory.title}</Text>
      {memory.description ? (
        <Text style={styles.description}>{memory.description}</Text>
      ) : null}
      <Text style={styles.date}>
        {new Date(memory.createdAt).toLocaleString()}
      </Text>
      <Text style={styles.sectionTitle}>Tags</Text>
      <View style={styles.tagsRow}>
        {memoryTags.map((tag) => (
          <View
            key={tag.id}
            style={[styles.tagBadge, { backgroundColor: tag.color }]}
          >
            <Text style={styles.tagText}>{tag.name}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.sectionTitle}>Location</Text>
      <Text>
        {memory.location.latitude.toFixed(4)},{" "}
        {memory.location.longitude.toFixed(4)}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  container: { padding: 16 },
  image: { width: "100%", height: 220, borderRadius: 8, marginBottom: 12 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  description: { fontSize: 14, marginBottom: 8 },
  date: { fontSize: 12, color: "#666", marginBottom: 16 },
  sectionTitle: { fontWeight: "bold", marginTop: 8, marginBottom: 4 },
  tagsRow: { flexDirection: "row", flexWrap: "wrap" },
  tagBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: { color: "#fff", fontSize: 12 },
});

export default MemoryDetailsScreen;
