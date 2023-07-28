import React from "react";
import { Image as RNImage } from "react-native";

export function LocalImage({ localAsset, style, width, height }) {
  return (
    <RNImage
      source={localAsset}
      style={[
        style,
        {
          width: width,
          height: height,
        },
      ]}
    />
  );
}
