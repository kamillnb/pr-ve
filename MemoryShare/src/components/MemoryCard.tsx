import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Memory } from "../types/memory";

type Props = {
  memory: Memory;
  onPress?: () => void;
};

const MemoryCard: React.FC<Props> = ({ memory, onPress }) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: memory.imageUri }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{memory.title}</Text>
        {memory.description ? (
          <Text numberOfLines={2} style={styles.description}>
            {memory.description}
          </Text>
        ) : null}
        <Text style={styles.date}>
          {new Date(memory.createdAt).toLocaleString()}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
  },
  image: { width: 100, height: 100 },
  content: { flex: 1, padding: 8 },
  title: { fontWeight: "bold", marginBottom: 4 },
  description: { fontSize: 12, marginBottom: 4 },
  date: { fontSize: 10, color: "#666" },
});

export default MemoryCard;
