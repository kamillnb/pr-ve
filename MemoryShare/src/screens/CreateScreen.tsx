import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useMemories } from "../context/MemoriesContext";
import { useSettings } from "../context/SettingsContext";
import { t } from "../i18n/translations";
import TagChip from "../components/TagChip";
import { Location } from "../types/memory";

const CreateScreen: React.FC = () => {
  const { tags, addMemory } = useMemories();
  const { language } = useSettings();
  const tr = t(language);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [location] = useState<Location>({
    // dummy location (Trondheim)
    latitude: 63.4305,
    longitude: 10.3951,
  });

  const toggleTag = (id: string) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    if (!title || !imageUri) {
      Alert.alert("Missing data", "Title and image URL are required.");
      return;
    }
    addMemory({
      title,
      description,
      imageUri,
      tags: selectedTags,
      location,
    });
    setTitle("");
    setDescription("");
    setImageUri("");
    setSelectedTags([]);
    Alert.alert("OK", "Memory saved!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{tr("createTitle")}</Text>
      <TextInput
        placeholder={tr("titlePlaceholder")}
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder={tr("descriptionPlaceholder")}
        style={[styles.input, styles.multiline]}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        placeholder={tr("imageUrlPlaceholder")}
        style={styles.input}
        value={imageUri}
        onChangeText={setImageUri}
      />

      <Text style={styles.subtitle}>{tr("tags")}</Text>
      <View style={styles.tagRow}>
        {tags.map((tag) => (
          <TagChip
            key={tag.id}
            tag={tag}
            selected={selectedTags.includes(tag.id)}
            onPress={() => toggleTag(tag.id)}
          />
        ))}
      </View>

      <Button title={tr("save")} onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  multiline: { minHeight: 80 },
  subtitle: { fontWeight: "bold", marginTop: 8, marginBottom: 4 },
  tagRow: { flexDirection: "row", flexWrap: "wrap" },
});

export default CreateScreen;
