import React from "react";
import { View } from "react-native";

export function Divider() {
  return (
    <View
      style={{
        alignSelf: "stretch",
        borderWidth: 0.5,
        marginHorizontal: 24,
        borderColor: "gray",
      }}
    />
  );
}
