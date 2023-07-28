import { NavigationContainer } from "@react-navigation/native";
import RootStackNavigation from "./navigations/RootStackNavigation";

export default function RootApp() {
  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  );
}
