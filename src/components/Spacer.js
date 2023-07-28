import React from "react";
import { View } from "react-native";

export function Spacer({ horizontal, space }) {
  if (horizontal) {
    return <View style={{ marginLeft: space }} />;
  }

  return <View style={{ marginTop: space }} />;
}
