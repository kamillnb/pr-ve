import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Tag } from "../types/memory";

type Props = {
  tag: Tag;
  selected?: boolean;
  onPress?: () => void;
};

const TagChip: React.FC<Props> = ({ tag, selected, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        { backgroundColor: tag.color },
        selected && styles.selected,
      ]}
    >
      <Text style={styles.text}>{tag.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 6,
    marginBottom: 6,
  },
  text: { color: "#fff", fontSize: 12 },
  selected: { borderWidth: 2, borderColor: "#000" },
});

export default TagChip;
