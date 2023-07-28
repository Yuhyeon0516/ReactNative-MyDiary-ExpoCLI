import { View } from "react-native";
import { useCallback } from "react";
import { Header } from "../components/Header/Header";
import { useNavigation } from "@react-navigation/native";

export default function AddDiaryScreen() {
  const navigation = useNavigation();
  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title={"Add Diary"} />
        </Header.Group>
        <Header.Icon iconName={"close"} onPress={onPressBack} />
      </Header>
    </View>
  );
}
