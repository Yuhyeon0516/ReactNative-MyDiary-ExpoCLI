import { FlatList, View, useWindowDimensions } from "react-native";
import { useCallback, useState } from "react";
import { Header } from "../components/Header/Header";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomButton } from "../components/CustomButton";
import { Icon } from "../components/Icons";
import { RemoteImage } from "../components/RemoteImage";
import { Spacer } from "../components/Spacer";
import { Typography } from "../components/Typography";

export default function DiaryListScreen() {
  const navigation = useNavigation();
  const safeAreaInset = useSafeAreaInsets();
  const onPressSettings = useCallback(() => {
    navigation.navigate("Setting");
  }, []);

  const onPressAdd = useCallback(() => {
    navigation.navigate("AddDiary");
  }, []);

  const { width } = useWindowDimensions();

  const [data, setData] = useState([
    {
      id: 0,
      title: "TITLE01",
      content: "CONTENT01",
      createdAt: "2023-06-26",
      updatedAt: "2023-06-26",
      imageUrl: "https://docs.expo.dev/static/images/tutorial/background-image.png",
    },
    {
      id: 1,
      title: "TITLE02",
      content: "CONTENT02",
      createdAt: "2023-06-27",
      updatedAt: "2023-06-27",
      imageUrl: "https://docs.expo.dev/static/images/tutorial/background-image.png",
    },
    {
      id: 2,
      title: "TITLE03",
      content: "CONTENT03",
      createdAt: "2023-06-28",
      updatedAt: "2023-06-28",
      imageUrl: "",
    },
  ]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header>
          <Header.Group>
            <Header.Title title={"Diary List"} />
          </Header.Group>
          <Header.Icon iconName={"settings"} onPress={onPressSettings} />
        </Header>
        <FlatList
          data={data}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingVertical: 32,
          }}
          renderItem={({ item }) => {
            return (
              <CustomButton
                onPress={() => {
                  navigation.navigate, ("DiaryDetail", { item });
                }}
              >
                <View style={{ paddingVertical: 12 }}>
                  {item.imageUrl && (
                    <>
                      <RemoteImage url={item.imageUrl} width={width - 48} height={(width - 48) * 0.5} style={{ borderRadius: 8 }} />
                      <Spacer space={4} />
                    </>
                  )}
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View>
                      <Typography fontSize={18}>{item.title}</Typography>
                      <Spacer space={4} />
                      <Typography fontSize={12}>{item.content}</Typography>
                    </View>
                    <Typography fontSize={12}>{item.updatedAt}</Typography>
                  </View>
                </View>
              </CustomButton>
            );
          }}
          ListFooterComponent={() => <View style={{ height: 50 }}></View>}
        />
      </View>
      <View style={{ position: "absolute", right: 12, bottom: safeAreaInset.bottom + 24 }}>
        <CustomButton onPress={onPressAdd}>
          <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: "black", alignItems: "center", justifyContent: "center" }}>
            <Icon iconName={"add"} color={"white"} size={30} />
          </View>
        </CustomButton>
      </View>
    </View>
  );
}
