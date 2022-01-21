import React from "react";
import { View, Text } from "react-native";
import UIInput from "./UIInput";
import tw from "tailwind-rn";
import { FontAwesome, EvilIcons } from "@expo/vector-icons";
import { colors } from "./../theme/colors";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/core";

const SearchInput = () => {
  return (
    <LoginInputWrapper>
      <InputStartIcon name="search" size={30} />
      <LoginInput
        placeholder="Search"
        onFocus={() => {
          console.warn("yupp");
        }}
        placeholderTextColor={colors.secondaryText}
      />
    </LoginInputWrapper>
  );
};

export default SearchInput;

const InputStartIcon = styled(EvilIcons)`
  ${tw("absolute top-3 left-9 z-10")};
  color: ${colors.mainText};
`;

const LoginInputWrapper = styled.View`
  ${tw("relative w-full pr-4 pl-4 mb-5 mt-5")}
`;

const LoginInput = styled(UIInput)`
  ${tw("w-full border pl-14 pr-14  h-12")}
  border-radius: 60px;
  border-color: ${colors.secondaryText};
  color: ${colors.mainText};
  font-size: 16px;
  background-color: ${colors.form};
`;
