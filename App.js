import { SafeAreaProvider } from "react-native-safe-area-context";
import RootApp from "./src/RootApp";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({ webClientId: "918717064633-6a6qbaedc3hnbr5cm87bdsr0m2iied32.apps.googleusercontent.com" });

export default function App() {
  return (
    <SafeAreaProvider>
      <RootApp />
    </SafeAreaProvider>
  );
}
