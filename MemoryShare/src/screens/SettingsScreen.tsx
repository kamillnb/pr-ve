import React from "react";
import { View, Text, StyleSheet, Button, TextInput, Alert } from "react-native";
import { useSettings } from "../context/SettingsContext";
import { useMemories } from "../context/MemoriesContext";
import { t } from "../i18n/translations";
import { Tag } from "../types/memory";

const SettingsScreen: React.FC = () => {
  const { language, theme, setLanguage, setTheme } = useSettings();
  const { tags, addTag, editTag, deleteTag } = useMemories();
  const tr = t(language);

  const [newTag, setNewTag] = React.useState<{ name: string; color: string }>({
    name: "",
    color: "#FFD700",
  });

  const [drafts, setDrafts] = React.useState<Record<string, Tag>>(() => {
    const map: Record<string, Tag> = {};
    tags.forEach((t) => (map[t.id] = t));
    return map;
  });

  React.useEffect(() => {
    const map: Record<string, Tag> = {};
    tags.forEach((t) => (map[t.id] = t));
    setDrafts(map);
  }, [tags]);

  const handleAddTag = () => {
    try {
      if (!newTag.name || !newTag.color) {
        Alert.alert(tr("missingDataTitle"), tr("missingDataBody"));
        return;
      }
      addTag(newTag.name, newTag.color);
      setNewTag({ name: "", color: "#FFD700" });
    } catch (err) {
      Alert.alert("Oops", (err as Error).message);
    }
  };

  const handleUpdate = (id: string) => {
    try {
      const draft = drafts[id];
      if (draft) {
        editTag(id, draft.name, draft.color);
      }
    } catch (err) {
      Alert.alert("Oops", (err as Error).message);
    }
  };

  const handleDelete = (id: string) => {
    deleteTag(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{tr("settingsTitle")}</Text>

      <Text style={styles.sectionTitle}>{tr("language")}</Text>
      <View style={styles.row}>
        <Button
          title="English"
          onPress={() => setLanguage("en")}
          color={language === "en" ? "#007AFF" : undefined}
        />
        <Button
          title="Norsk"
          onPress={() => setLanguage("no")}
          color={language === "no" ? "#007AFF" : undefined}
        />
      </View>

      <Text style={styles.sectionTitle}>{tr("theme")}</Text>
      <View style={styles.row}>
        <Button
          title={tr("light")}
          onPress={() => setTheme("light")}
          color={theme === "light" ? "#007AFF" : undefined}
        />
        <Button
          title={tr("dark")}
          onPress={() => setTheme("dark")}
          color={theme === "dark" ? "#007AFF" : undefined}
        />
      </View>

      <Text style={styles.sectionTitle}>{tr("manageTags")}</Text>
      {tags.map((tag) => (
        <View key={tag.id} style={styles.tagRow}>
          <TextInput
            style={styles.tagInput}
            value={drafts[tag.id]?.name ?? tag.name}
            onChangeText={(text) =>
              setDrafts((prev) => ({
                ...prev,
                [tag.id]: { ...(prev[tag.id] ?? tag), name: text },
              }))
            }
            placeholder={tr("name")}
          />
          <TextInput
            style={styles.tagInput}
            value={drafts[tag.id]?.color ?? tag.color}
            onChangeText={(text) =>
              setDrafts((prev) => ({
                ...prev,
                [tag.id]: { ...(prev[tag.id] ?? tag), color: text },
              }))
            }
            placeholder={tr("color")}
          />
          <Button title={tr("update")} onPress={() => handleUpdate(tag.id)} />
          <Button title={tr("delete")} onPress={() => handleDelete(tag.id)} />
        </View>
      ))}

      <Text style={styles.sectionTitle}>{tr("addTag")}</Text>
      <View style={styles.tagRow}>
        <TextInput
          style={styles.tagInput}
          placeholder={tr("name")}
          value={newTag.name}
          onChangeText={(text) =>
            setNewTag((prev) => ({ ...prev, name: text }))
          }
        />
        <TextInput
          style={styles.tagInput}
          placeholder={tr("color")}
          value={newTag.color}
          onChangeText={(text) =>
            setNewTag((prev) => ({ ...prev, color: text }))
          }
        />
        <Button title={tr("save")} onPress={handleAddTag} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  sectionTitle: { fontWeight: "bold", marginTop: 12, marginBottom: 4 },
  row: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
    flexWrap: "wrap",
  },
  tagInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    minWidth: 120,
  },
});

export default SettingsScreen;
