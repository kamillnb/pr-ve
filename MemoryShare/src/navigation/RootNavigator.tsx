import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import CreateScreen from "../screens/CreateScreen";
import SettingsScreen from "../screens/SettingsScreen";
import MemoryDetailsScreen from "../screens/MemoryDetailsScreen";
import { useSettings } from "../context/SettingsContext";
import { t } from "../i18n/translations";

export type RootStackParamList = {
  Tabs: undefined;
  MemoryDetails: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { language } = useSettings();
  const tr = t(language);

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: tr("homeTab"), tabBarLabel: tr("homeTab") }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ title: tr("mapTab"), tabBarLabel: tr("mapTab") }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{ title: tr("createTab"), tabBarLabel: tr("createTab") }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: tr("settingsTab"), tabBarLabel: tr("settingsTab") }}
      />
    </Tab.Navigator>
  );
};

const RootNavigator: React.FC = () => {
  const { theme } = useSettings();

  return (
    <NavigationContainer theme={theme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="MemoryDetails" component={MemoryDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
