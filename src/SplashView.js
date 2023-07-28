import { View } from "react-native";
import { Typography } from "./components/Typography";
import { useEffect } from "react";

export default function SplashView({ onFinishLoad }) {
  useEffect(() => {
    setTimeout(() => {
      onFinishLoad();
    }, 2000);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Typography fontSize={26}>Splash</Typography>
    </View>
  );
}
