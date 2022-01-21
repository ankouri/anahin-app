import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "tailwind-rn";

const UIStartIcon = props => {
  return <Ionicons style={tw("absolute top-2 right-2")} {...props} />;
};

export default UIStartIcon;
