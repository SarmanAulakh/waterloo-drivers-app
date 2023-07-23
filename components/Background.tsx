import { KeyboardAvoidingView } from "react-native";
import React from "react";
import { makeStyles} from "@rneui/themed";


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
    width: '100%',
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    padding: 20,
  },
}));
