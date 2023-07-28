import { NavigationContainer } from "@react-navigation/native";
import RootStackNavigation from "./navigations/RootStackNavigation";
import { useState } from "react";
import SplashView from "./SplashView";

export default function RootApp() {
  const [initialized, setInitialized] = useState(false);

  if (!initialized) {
    return <SplashView onFinishLoad={() => setInitialized(true)} />;
  }

  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  );
}
