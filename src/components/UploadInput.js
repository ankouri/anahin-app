import React from "react";
import { View, Text, Image } from "react-native";
import tw from "tailwind-rn";
import styled from "styled-components/native";
import UIText from "./UIText";
import { colors } from "../theme/colors";

const UploadInput = ({ onPress, cover }) => {
  const { uri } = cover;
  console.log(uri);
  return (
    <UploadArea onPress={onPress}>
      {uri !== undefined ? (
        <Image
          source={{ uri: uri }}
          style={tw("w-full h-full rounded-xl")}
          resizeMode="cover"
        />
      ) : (
        <>
          <Image source={require("../../assets/Image.png")} />
          <UIText
            style={[tw("text-lg"), { color: colors.mainText }]}
            type="bold"
          >
            Add Cover Photo
          </UIText>
          <UIText
            style={[tw("text-xs mt-2"), { color: colors.secondaryText }]}
            type="regular"
          >
            (up to 10Mb)
          </UIText>
        </>
      )}
    </UploadArea>
  );
};

export default UploadInput;

const UploadArea = styled.Pressable`
  ${[
    tw("justify-center items-center h-40 mx-5 rounded-xl "),
    {
      borderStyle: "dashed",
      borderWidth: 2,
      borderColor: colors.secondaryText,
      backgroundColor: colors.form,
    },
  ]}
`;
