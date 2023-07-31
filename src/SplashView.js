import { Platform, View } from "react-native";
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { useCallback, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";

export default function SplashView({ onFinishLoad }) {
  const [showLoginButton, setShowLoginButton] = useState(false);
  const signinUserIdentify = useCallback(async (idToken) => {
    try {
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const result = await auth().signInWithCredential(googleCredential);

      console.log(`${Platform.OS}`, result);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onPressGoogleLogin = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      signinUserIdentify(idToken);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const userSilentLogin = useCallback(async () => {
    try {
      const { idToken } = await GoogleSignin.signInSilently();
      signinUserIdentify(idToken);
    } catch (error) {
      setShowLoginButton(true);
    }
  }, []);

  useEffect(() => {
    userSilentLogin();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>{showLoginButton && <GoogleSigninButton onPress={onPressGoogleLogin} />}</View>
  );
}
