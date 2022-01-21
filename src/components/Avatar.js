import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import tw from "tailwind-rn";
import UIText from "./UIText";
import { colors } from "./../theme/colors";

const Avatar = ({ onPress, img, title }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw("justify-start items-center flex-row w-40")}
    >
      <Image style={tw("rounded-xl w-10 h-10")} source={img} />
      <UIText
        style={[tw("ml-2 text-sm"), { color: colors.mainText }]}
        type="medium"
      >
        {title}
      </UIText>
    </TouchableOpacity>
  );
};

export default Avatar;
