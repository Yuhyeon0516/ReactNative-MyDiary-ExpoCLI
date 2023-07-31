import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import database from "@react-native-firebase/database";
import { stateDiaryList } from "../states/stateDiaryList";

export function useGetDiaryList() {
  const setDiaryList = useSetRecoilState(stateDiaryList);

  return useCallback(async (userInfo) => {
    const userDiaryDB = database().ref(`/diarys/${userInfo.uid}`);

    const diaryListResult = await userDiaryDB.once("value").then((snapshot) => {
      return snapshot.val();
    });

    const list = Object.keys(diaryListResult).map((key) => diaryListResult[key]);

    setDiaryList(list);
  }, []);
}
