import { View } from "react-native";
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { useCallback } from "react";

export default function SplashView({ onFinishLoad }) {
  const onPressGoogleLogin = useCallback(async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <GoogleSigninButton onPress={onPressGoogleLogin} />
    </View>
  );
}
