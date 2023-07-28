import React from "react";
import { CustomButton } from "../CustomButton";
import { Icon } from "../Icons";

export function HeaderIcon({ onPress, iconName }) {
  return (
    <CustomButton onPress={onPress}>
      <Icon iconName={iconName} size={28} color="black" />
    </CustomButton>
  );
}
