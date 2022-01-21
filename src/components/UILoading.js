import React from "react";
import { View, Text } from "react-native";
import tw from "tailwind-rn";
import UIText from "./UIText";
import * as Progress from "react-native-progress";
import { colors } from "./../theme/colors";
const UILoading = ({ loading }) => {
  console.log(loading);
  return (
    <View
      style={[
        loading
          ? tw("absolute z-20 justify-center items-center w-full h-full")
          : tw("hidden"),
        { backgroundColor: "#0000008c" },
      ]}
    >
      <Progress.CircleSnail
        size={80}
        color={[colors.primary, colors.mainText, colors.secondary]}
        thickness={6}
      />
      <UIText type="bold" style={[tw("text-2xl mt-4 text-white ")]}>
        Loading...
      </UIText>
    </View>
  );
};

export default UILoading;
