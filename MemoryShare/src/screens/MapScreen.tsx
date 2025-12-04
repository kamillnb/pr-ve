import React, { useMemo, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useMemories } from "../context/MemoriesContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import TagChip from "../components/TagChip";
import { useSettings } from "../context/SettingsContext";
import { t } from "../i18n/translations";

type Nav = NativeStackNavigationProp<RootStackParamList, "Tabs">;

const MapScreen: React.FC = () => {
  const { memories, tags } = useMemories();
  const nav = useNavigation<Nav>();
  const { language } = useSettings();
  const tr = t(language);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const visibleMemories = useMemo(
    () =>
      selectedTag
        ? memories.filter((m) => m.tags.includes(selectedTag))
        : memories,
    [memories, selectedTag]
  );

  const initial = {
    latitude: visibleMemories[0]?.location.latitude ?? 63.4305,
    longitude: visibleMemories[0]?.location.longitude ?? 10.3951,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView horizontal contentContainerStyle={styles.filterRow}>
        <Text style={styles.filterLabel}>{tr("filterByTag")}:</Text>
        <TagChip
          tag={{ id: "all", name: tr("all"), color: "#888" }}
          selected={selectedTag === null}
          onPress={() => setSelectedTag(null)}
        />
        {tags.map((tag) => (
          <TagChip
            key={tag.id}
            tag={tag}
            selected={selectedTag === tag.id}
            onPress={() => setSelectedTag(tag.id)}
          />
        ))}
      </ScrollView>
      <MapView style={styles.map} initialRegion={initial}>
        {visibleMemories.map((m) => (
          <Marker
            key={m.id}
            coordinate={m.location}
            title={m.title}
            onPress={() => nav.navigate("MemoryDetails", { id: m.id })}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: { flex: 1 },
  filterRow: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  filterLabel: { marginRight: 8, fontWeight: "bold" },
});

export default MapScreen;
