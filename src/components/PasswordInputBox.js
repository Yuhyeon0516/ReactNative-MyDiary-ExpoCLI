import { View, Text, TextInput } from "react-native";
import React from "react";
import { Spacer } from "./Spacer";
import { Typography } from "./Typography";

export default function PasswordInputBox({ value, onChangeText, errorMessage }) {
  return (
    <>
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
                borderBottomColor: errorMessage ? "red" : "black",
              }}
            >
              {value.length > item && <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: errorMessage ? "red" : "black" }} />}
            </View>
          );
        })}
      </View>
      {errorMessage && (
        <>
          <Spacer space={12} />
          <View style={{ flexDirection: "row", paddingHorizontal: 24 }}>
            <Typography fontSize={16} color={"red"}>
              {errorMessage}
            </Typography>
          </View>
        </>
      )}
    </>
  );
}
