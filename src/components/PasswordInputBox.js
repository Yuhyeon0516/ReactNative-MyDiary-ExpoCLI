import { View, Text, TextInput } from "react-native";
import React from "react";

export default function PasswordInputBox({ value, onChangeText }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 24 }}>
      <TextInput
        autoFocus
        value={value}
        onChangeText={onChangeText}
        caretHidden
        keyboardType="number-pad"
        maxLength={4}
        style={{ width: 20, height: 20, opacity: 0, position: "absolute" }}
      />
      {[0, 1, 2, 3].map((item) => {
        return (
          <View
            key={item}
            style={{
              flex: 1,
              height: 100,
              marginRight: item !== 3 ? 12 : 0,
              alignItems: "center",
              justifyContent: "center",
              borderBottomWidth: 2,
              borderBottomColor: "black",
            }}
          >
            {value.length > item && <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "black" }} />}
          </View>
        );
      })}
    </View>
  );
}
