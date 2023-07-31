import { useCallback } from "react";
import database from "@react-native-firebase/database";
import { useRecoilState, useRecoilValue } from "recoil";
import { stateUserInfo } from "../states/stateUserInfo";
import { stateDiaryList } from "../states/stateDiaryList";

export function useCreateDiary() {
  const userInfo = useRecoilValue(stateUserInfo);
  const [_, setDiaryList] = useRecoilState(stateDiaryList);

  return useCallback(async (photoUrl, date, title, content) => {
    if (!date) return;

    if (!content || !title) return;

    const now = new Date().toISOString();
    const userDiaryDB = database().ref(`/diarys/${userInfo.uid}`).push();
    const saveItem = {
      photoUrl,
      title,
      content,
      date: date.toISOString(),
      createdAt: now,
      updatedAt: now,
    };

    await userDiaryDB.set(saveItem);

    setDiaryList((prev) => {
      return prev.concat([saveItem]);
    });
  }, []);
}
