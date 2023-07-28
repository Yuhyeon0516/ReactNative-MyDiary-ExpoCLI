import React from "react";
import { Pressable } from "react-native";

export function CustomButton({ onPress, hitSlop, children, paddingH, paddingV }) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={hitSlop ?? { left: 0, right: 0, top: 0, bottom: 0 }}
      style={{ paddingHorizontal: paddingH, paddingVertical: paddingV }}
    >
      {children}
    </Pressable>
  );
}
