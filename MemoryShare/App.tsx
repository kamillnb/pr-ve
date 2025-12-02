import React from "react";
import RootNavigator from "./src/navigation/RootNavigator";
import { SettingsProvider } from "./src/context/SettingsContext";
import { MemoriesProvider } from "./src/context/MemoriesContext";

const App = () => {
  return (
    <SettingsProvider>
      <MemoriesProvider>
        <RootNavigator />
      </MemoriesProvider>
    </SettingsProvider>
  );
};

export default App;
