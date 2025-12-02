import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useMemories } from "../context/MemoriesContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";

type Nav = NativeStackNavigationProp<RootStackParamList, "Tabs">;

const MapScreen: React.FC = () => {
  const { memories } = useMemories();
  const nav = useNavigation<Nav>();

  const initial = {
    latitude: memories[0]?.location.latitude ?? 63.4305,
    longitude: memories[0]?.location.longitude ?? 10.3951,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView style={styles.map} initialRegion={initial}>
        {memories.map((m) => (
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
});

export default MapScreen;
