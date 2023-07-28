import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DiaryStackNavigation from "./DiaryStackNavigation";
import AddDiaryScreen from "../screens/AddDiaryScreen";

const Stack = createNativeStackNavigator();

export default function RootStackNavigation() {
  return (
    <Stack.Navigator initialRouteName="DiaryStack" screenOptions={{ headerShown: false, presentation: "containedModal" }}>
      <Stack.Screen name="DiaryStack" component={DiaryStackNavigation} />
      <Stack.Screen name="AddDiary" component={AddDiaryScreen} />
    </Stack.Navigator>
  );
}
