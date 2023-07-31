import { ScrollView, View, useWindowDimensions } from "react-native";
import { useCallback, useMemo, useState } from "react";
import { Header } from "../components/Header/Header";
import { useNavigation } from "@react-navigation/native";
import { useImagePickAndUpload } from "../hooks/useImagePickAndUpload";
import { CustomButton } from "../components/CustomButton";
import { RemoteImage } from "../components/RemoteImage";
import { Spacer } from "../components/Spacer";
import { Typography } from "../components/Typography";
import DateTimePicker from "react-native-modal-datetime-picker";
import SingleLineInput from "../components/SingleLineInput";
import MultiLineInput from "../components/MultiLineInput";
import { useCreateDiary } from "../hooks/useCreateDiary";

export default function AddDiaryScreen() {
  const { width } = useWindowDimensions();
  const photoSize = useMemo(() => {
    return {
      photoWidth: width,
      photoHeight: width * 0.5,
    };
  }, [width]);

  const runCreateDiary = useCreateDiary();

  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const canSave = useMemo(() => {
    if (!selectedDate) return false;
    if (!title) return false;
    if (!content) return false;
    return true;
  }, [selectedDate, title, content]);

  const runImagePickAndUpload = useImagePickAndUpload();

  const [visibleDatePicker, setVisibleDatePicker] = useState(false);

  const navigation = useNavigation();
  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onPressPhotoItem = useCallback(async () => {
    const result = await runImagePickAndUpload();
    if (result.length >= 1) {
      setSelectedPhotoUrl(result[0]);
    }
  }, []);

  const onPressCalendar = useCallback(() => {
    setVisibleDatePicker(true);
  }, []);

  const onPressSave = useCallback(() => {
    if (!canSave) return;

    runCreateDiary(selectedPhotoUrl, selectedDate, title, content);
    navigation.goBack();
  }, [canSave]);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title={"Add Diary"} />
        </Header.Group>
        <Header.Icon iconName={"close"} onPress={onPressBack} />
      </Header>
      <ScrollView style={{ flex: 1 }}>
        <CustomButton onPress={onPressPhotoItem}>
          {selectedPhotoUrl ? (
            <RemoteImage url={selectedPhotoUrl} width={photoSize.photoWidth} height={photoSize.photoHeight} />
          ) : (
            <View style={{ backgroundColor: "lightgray", width: photoSize.photoWidth, height: photoSize.photoHeight }} />
          )}
        </CustomButton>
        <Spacer space={20} />
        <CustomButton onPress={onPressCalendar}>
          <View style={{ flexDirection: "row", paddingHorizontal: 24, paddingVertical: 12, alignItems: "center", justifyContent: "space-between" }}>
            <Typography fontSize={20}>날짜</Typography>
            <Typography fontSize={16}>
              {selectedDate ? `${selectedDate.getFullYear()}. ${selectedDate.getMonth() + 1}. ${selectedDate.getDate()}` : "날짜를 선택해주세요."}
            </Typography>
          </View>
        </CustomButton>
        <Spacer space={40} />
        <View style={{ paddingHorizontal: 24 }}>
          <SingleLineInput value={title} onChangeText={setTitle} placeholder={"제목을 입력해주세요."} />
        </View>
        <Spacer space={20} />
        <View style={{ paddingHorizontal: 24 }}>
          <MultiLineInput
            value={content}
            onChangeText={(text) => {
              setContent(text);
            }}
            placeholder={"있었던 일을 알려주세요."}
          />
        </View>
        <Spacer space={40} />
        <View style={{ paddingHorizontal: 24 }}>
          <CustomButton onPress={onPressSave}>
            <View
              style={{ paddingVertical: 16, alignItems: "center", justifyContent: "center", backgroundColor: canSave ? "black" : "lightgray", borderRadius: 4 }}
            >
              <Typography color={canSave ? "white" : "gray"} fontSize={20}>
                등록하기
              </Typography>
            </View>
          </CustomButton>
        </View>
      </ScrollView>
      <DateTimePicker
        isVisible={visibleDatePicker}
        mode="date"
        onConfirm={(date) => {
          setSelectedDate(new Date(date));
          setVisibleDatePicker(false);
        }}
        onCancel={() => {
          setVisibleDatePicker(false);
        }}
      />
    </View>
  );
}
