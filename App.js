import { SafeAreaProvider } from "react-native-safe-area-context";
import RootApp from "./src/RootApp";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

// GoogleSignin.configure({ webClientId: "534055512781-45f09hdil6rhd0r77898q7b9frfbu462.apps.googleusercontent.com" });
// GoogleSignin.configure({ webClientId: "918717064633-6a6qbaedc3hnbr5cm87bdsr0m2iied32.apps.googleusercontent.com" });
export default function App() {
  return (
    <SafeAreaProvider>
      <RootApp />
    </SafeAreaProvider>
  );
}
