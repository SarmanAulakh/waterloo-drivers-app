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
import { StripeProvider } from "@stripe/stripe-react-native";

const stripe_pb_key =
  "pk_test_51ObmddIjD8jpShaM8DjkSxcAmQ6sRxxyVpZs0wla06LQgi44uTdGgRu9YHO8EzJebRlIl7BkScGlw2AVuSJFVaas003UHzq3LK";

export default function App() {
  const [fontsLoaded] = useFonts(fonts);

  if (!fontsLoaded) return null;

  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <SafeAreaProvider>
          <ApplicationProvider {...eva} theme={eva.light}>
            <StripeProvider publishableKey={stripe_pb_key} urlScheme="">
              <Navigation />
            </StripeProvider>
            <StatusBar />
          </ApplicationProvider>
        </SafeAreaProvider>
      </PaperProvider>
    </StoreProvider>
  );
}
