import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Provider as StoreProvider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { ThemeProvider, createTheme } from "@rneui/themed";

import fonts from "./config/fonts";
import Navigation from "./navigation";
import { store } from "./redux/store";

const theme = createTheme({
  lightColors: {},
  darkColors: {},
});

export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) return null;

  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <SafeAreaProvider>
          <ThemeProvider theme={theme}>
            <Navigation />
            <StatusBar />
          </ThemeProvider>
        </SafeAreaProvider>
      </PaperProvider>
    </StoreProvider>
  );
}
