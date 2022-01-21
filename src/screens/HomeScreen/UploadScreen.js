import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-rn";
import styled from "styled-components/native";
import NewPostPage1 from "./../../components/NewPostPage1";
import NewPostPage2 from "./../../components/NewPostPage2";
import UIText from "./../../components/UIText";
import { colors } from "./../../theme/colors";
import { useNavigation } from "@react-navigation/core";
const UploadScreen = () => {
  const [stepCounter, setStepCounter] = React.useState(1);
  const [post, setPost] = React.useState({
    title: "",
    desc: "",
    cover: "",
    time: "",
    ingredients: "",
    steps: "",
  });

  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw("flex-1 bg-white")}>
      <UploadHeader>
        <Pressable
          onPress={() => {
            navigation.goBack();
            setStepCounter(1);
          }}
        >
          <UIText style={[tw("text-lg"), { color: "red" }]} type="bold">
            Cancel
          </UIText>
        </Pressable>
        <UIText style={[tw("text-lg"), { color: colors.mainText }]} type="bold">
          {stepCounter} / 2
        </UIText>
      </UploadHeader>
      {stepCounter === 1 ? (
        <NewPostPage1
          stepCounter={stepCounter}
          setStepCounter={setStepCounter}
          post={post}
          setPost={setPost}
        />
      ) : (
        <NewPostPage2
          setStepCounter={setStepCounter}
          setPost={setPost}
          post={post}
        />
      )}
    </SafeAreaView>
  );
};

export default UploadScreen;

const UploadHeader = styled.View`
  ${tw("px-3 py-3 justify-between items-center flex-row")}
`;
