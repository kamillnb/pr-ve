import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useSettings } from "../context/SettingsContext";
import { useMemories } from "../context/MemoriesContext";
import { t } from "../i18n/translations";

const SettingsScreen: React.FC = () => {
  const { language, theme, setLanguage, setTheme } = useSettings();
  const { tags } = useMemories();
  const tr = t(language);

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

      <Text style={styles.sectionTitle}>{tr("tags")}</Text>
      {tags.map((tag) => (
        <Text key={tag.id}>
          {tag.name} ({tag.color})
        </Text>
      ))}
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
});

export default SettingsScreen;
