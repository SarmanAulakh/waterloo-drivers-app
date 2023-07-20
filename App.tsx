import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Provider as StoreProvider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { PersistGate } from 'redux-persist/integration/react';

import fonts from "./config/fonts";
import Navigation from "./navigation";
import { store, persistor } from './redux/store';

export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) return null;

  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      </PaperProvider>
    </StoreProvider>
  );
}
