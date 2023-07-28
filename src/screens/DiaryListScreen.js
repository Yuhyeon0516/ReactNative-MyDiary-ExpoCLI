import { View } from "react-native";
import { useCallback } from "react";
import { Header } from "../components/Header/Header";
import { useNavigation } from "@react-navigation/native";

export default function DiaryListScreen() {
  const navigation = useNavigation();
  const onPressSettings = useCallback(() => {
    navigation.navigate("Setting");
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title={"Diary List"} />
        </Header.Group>
        <Header.Icon iconName={"settings"} onPress={onPressSettings} />
      </Header>
    </View>
  );
}
