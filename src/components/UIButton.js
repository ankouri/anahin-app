import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import UIText from "./UIText";
import tw from "tailwind-rn";
import { colors } from "./../theme/colors";

const UIButton = ({ loading, onPress, style, title, startIcon }) => {
  console.log();
  return (
    <TouchableOpacity onPress={loading ? () => {} : onPress} style={style}>
      {startIcon}
      <UIText style={[tw("text-white")]} type="bold">
        {title}
      </UIText>
    </TouchableOpacity>
  );
};

export default UIButton;
