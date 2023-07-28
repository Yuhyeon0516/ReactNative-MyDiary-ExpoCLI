import { Ionicons } from "@expo/vector-icons";
import React from "react";

export function Icon({ iconName, size, color }) {
  return <Ionicons name={iconName} size={size} color={color} />;
}
