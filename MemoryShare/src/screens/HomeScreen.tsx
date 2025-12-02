import React, { useMemo, useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import { useMemories } from "../context/MemoriesContext";
import { useSettings } from "../context/SettingsContext";
import { t } from "../i18n/translations";
import MemoryCard from "../components/MemoryCard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";

type Nav = NativeStackNavigationProp<RootStackParamList, "Tabs">;

const HomeScreen: React.FC = () => {
  const { memories } = useMemories();
  const { language } = useSettings();
  const tr = t(language);
  const [query, setQuery] = useState("");
  const nav = useNavigation<Nav>();

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return memories.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        (m.description ?? "").toLowerCase().includes(q)
    );
  }, [memories, query]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{tr("homeTitle")}</Text>
      <TextInput
        style={styles.search}
        placeholder={tr("searchPlaceholder")}
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MemoryCard
            memory={item}
            onPress={() => nav.navigate("MemoryDetails", { id: item.id })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  search: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
});

export default HomeScreen;
