import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Provider as StoreProvider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

import fonts from "./config/fonts";
import Navigation from "./navigation";
import { store } from "./redux/store";

export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) return null;

  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <SafeAreaProvider>
          <ApplicationProvider {...eva} theme={eva.light}>
            <Navigation />
            <StatusBar />
          </ApplicationProvider>
        </SafeAreaProvider>
      </PaperProvider>
    </StoreProvider>
  );
}
