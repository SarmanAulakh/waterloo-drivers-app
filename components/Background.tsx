import { KeyboardAvoidingView } from "react-native";
import React from "react";
import { makeStyles } from "@rneui/themed";
import Colors from "../constants/Colors";

export default function Background({ children }: any) {
  const styles = useStyles();
  return (
    <KeyboardAvoidingView style={styles.container}>
      {children}
    </KeyboardAvoidingView>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    backgroundColor: Colors.background,
    alignItems: "center",
    alignSelf: "center",
    padding: 20,
  },
}));
