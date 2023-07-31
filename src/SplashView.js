import { Platform, View } from "react-native";
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { useCallback, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import database, { firebase } from "@react-native-firebase/database";
import { useRecoilState } from "recoil";
import { stateUserInfo } from "./states/stateUserInfo";

export default function SplashView({ onFinishLoad }) {
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [_, setUserInfo] = useRecoilState(stateUserInfo);
  const signinUserIdentify = useCallback(async (idToken) => {
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const result = await auth().signInWithCredential(googleCredential);

    const userDBRefKey = `/users/${result.user.uid}`;
    const userResult = await database()
      .ref(userDBRefKey)
      .once("value")
      .then((snapshot) => snapshot.val());

    const now = new Date().toISOString();

    if (!userResult) {
      await database().ref(userDBRefKey).set({
        name: result.additionalUserInfo.profile.name,
        profileImage: result.additionalUserInfo.profile.picture,
        uid: result.user.uid,
        password: "",
        createdAt: now,
        lastLoginAt: now,
      });
    } else {
      await database().ref(userDBRefKey).update({
        lastLoginAt: now,
      });
    }

    const userInfo = await database()
      .ref(userDBRefKey)
      .once("value")
      .then((snapshot) => snapshot.val());

    setUserInfo(userInfo);

    onFinishLoad();
  }, []);

  const onPressGoogleLogin = useCallback(async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    signinUserIdentify(idToken);
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
