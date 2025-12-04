import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
// ❌ Geolocation fjernet fordi det ikke fungerer i Expo managed workflow
// import Geolocation from "@react-native-community/geolocation";

import { useMemories } from "../context/MemoriesContext";
import { useSettings } from "../context/SettingsContext";
import { t } from "../i18n/translations";
import TagChip from "../components/TagChip";
import { Location } from "../types/memory";

const CreateScreen: React.FC = () => {
  const { tags, addMemory } = useMemories();
  const { language } = useSettings();
  const tr = useMemo(() => t(language), [language]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [location, setLocation] = useState<Location | null>(null);
  const [locStatus, setLocStatus] = useState<string>("");

  // ❗ EXPO SAFE: Disabled geolocation (native library not supported in Expo)
  useEffect(() => {
    // Midlertidig fallback-lokasjon så appen fungerer:
    setLocation({
      latitude: 0,
      longitude: 0,
    });
    setLocStatus(tr("locationStatus"));
  }, [tr]);

  const toggleTag = (id: string) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleImagePick = async (mode: "camera" | "library") => {
    const result =
      mode === "camera"
        ? await launchCamera({ mediaType: "photo", includeBase64: false })
        : await launchImageLibrary({ mediaType: "photo", selectionLimit: 1 });

    if (result.didCancel) return;
    const uri = result.assets?.[0]?.uri;
    if (uri) setImageUri(uri);
  };

  const handleSave = () => {
    if (!title || !imageUri || !location) {
      Alert.alert(tr("missingDataTitle"), tr("missingDataBody"));
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
    setLocation(null);
    setLocStatus("");

    Alert.alert(tr("savedTitle"), tr("savedBody"));
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

      <View style={styles.row}>
        <Button title={tr("takePhoto")} onPress={() => handleImagePick("camera")} />
        <Button
          title={tr("pickFromGallery")}
          onPress={() => handleImagePick("library")}
        />
      </View>

      {imageUri ? <Image source={{ uri: imageUri }} style={styles.preview} /> : null}

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

      <Text style={styles.subtitle}>{tr("locationStatus")}</Text>
      <Text>
        {location
          ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
          : locStatus || tr("locationPending")}
      </Text>

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
  preview: {
    width: "100%",
    height: 200,
    marginBottom: 12,
    borderRadius: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
});

export default CreateScreen;
