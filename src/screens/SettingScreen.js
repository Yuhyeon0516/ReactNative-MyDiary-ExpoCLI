import { View } from "react-native";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import database from "@react-native-firebase/database";

import { Header } from "../components/Header/Header";
import { useNavigation } from "@react-navigation/native";
import { Spacer } from "../components/Spacer";
import { stateUserInfo } from "../states/stateUserInfo";
import { CustomButton } from "../components/CustomButton";
import { RemoteImage } from "../components/RemoteImage";
import { Typography } from "../components/Typography";
import { useImagePickAndUpload } from "../hooks/useImagePickAndUpload";
import { Divider } from "../components/Divider";
import { Icon } from "../components/Icons";

export default function SettingScreen() {
  const [userInfo, setUserInfo] = useRecoilState(stateUserInfo);
  const runImagePickAndUpload = useImagePickAndUpload(false);

  const navigation = useNavigation();
  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onPressProfile = useCallback(async () => {
    const result = await runImagePickAndUpload();
    if (result.length >= 1) {
      const userDB = `/users/${userInfo.uid}`;

      setUserInfo((prev) => {
        return {
          ...prev,
          profileImage: result[0],
        };
      });

      await database().ref(userDB).update({
        profileImage: result[0],
      });
    }
  }, [userInfo, runImagePickAndUpload]);

  const onPressAddPassword = useCallback(() => {
    navigation.navigate("AddPassword");
  }, []);

  const onPressResetPassword = useCallback(async () => {
    const userDB = `/users/${userInfo.uid}`;
    await database().ref(userDB).update({
      password: "",
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Icon iconName={"arrow-back"} onPress={onPressBack} />
          <Spacer space={12} horizontal />
          <Header.Title title={"Setting"} />
        </Header.Group>
      </Header>
      <View style={{ flex: 1, paddingTop: 32 }}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <CustomButton onPress={onPressProfile}>
            <RemoteImage url={userInfo.profileImage} width={100} height={100} style={{ borderRadius: 50 }} />
          </CustomButton>
          <Spacer space={20} />
          <Typography fontSize={20}>{userInfo.name}</Typography>
        </View>
        <Spacer space={20} />
        <Divider />
        <Spacer space={20} />
        <CustomButton onPress={onPressAddPassword}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 12, paddingHorizontal: 24 }}>
            <Typography fontSize={16}>비밀번호 추가</Typography>
            <Icon iconName={"chevron-forward-outline"} size={16} />
          </View>
        </CustomButton>
        <CustomButton onPress={onPressResetPassword}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 12, paddingHorizontal: 24 }}>
            <Typography fontSize={16}>비밀번호 초기화</Typography>
          </View>
        </CustomButton>
      </View>
    </View>
  );
}
