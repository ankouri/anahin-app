import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import tw from "tailwind-rn";
import styled from "styled-components/native";
import UIText from "./UIText";
import { colors } from "../theme/colors";
import UploadInput from "./UploadInput";
import UIInput from "./UIInput";
import { Slider } from "@miblanchard/react-native-slider";
import UIButton from "./UIButton";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useToast } from "react-native-toast-notifications";
const NewPostPage1 = ({ setPost, post, stepCounter, setStepCounter }) => {
  const [foodTime, setFoodTime] = React.useState([0.4]);
  const [foodCover, setFoodCover] = React.useState({});
  const [foodTitle, setFoodTitle] = React.useState("");
  const [foodDesc, setFoodDesc] = React.useState("");

  const toast = useToast();

  const coverTime = progress => {
    return (progress[0] * 100 * 60) / 100;
  };

  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled && result.type === "image") {
      console.log(result);
      setFoodCover(result);
    } else {
      setFoodCover(null);
    }
  };

  const moreInfomations = () => {
    if (foodTime && foodCover && foodDesc && foodTitle) {
      setPost({
        title: foodTitle,
        desc: foodDesc,
        cover: foodCover,
        time: foodTime,
      });
      setStepCounter(2);
    } else {
      toast.show("All fields are required", {
        type: "danger",
        placement: "bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      });
    }
  };

  return (
    <ScrollView style={tw("py-4")}>
      <UploadInput onPress={uploadImage} cover={foodCover} />
      <InputWrapper>
        <UIText style={[tw("text-xl"), { color: colors.mainText }]} type="bold">
          Food Name
        </UIText>
        <InputFoodName
          value={foodTitle}
          onChangeText={text => setFoodTitle(text)}
          placeholderTextColor={colors.secondaryText}
          placeholder="Enter food name"
        />
      </InputWrapper>
      <InputWrapper>
        <UIText style={[tw("text-xl"), { color: colors.mainText }]} type="bold">
          Discription
        </UIText>
        <InputDescription
          value={foodDesc}
          onChangeText={text => setFoodDesc(text)}
          multiline={true}
          numberOfLines={4}
          placeholderTextColor={colors.secondaryText}
          placeholder="Tell a little about your food"
        />
      </InputWrapper>

      <InputWrapper>
        <UIText style={[tw("text-xl"), { color: colors.mainText }]} type="bold">
          Cooking Duration (mins)
        </UIText>
        <TimeWrapper>
          <UIText
            style={[tw("text-xl mt-2"), { color: colors.primary }]}
            type="bold"
          >
            {`< 10`}
          </UIText>
          <UIText
            style={[tw("text-xl mt-2"), { color: colors.primary }]}
            type="bold"
          >
            {` 30`}
          </UIText>
          <UIText
            style={[tw("text-xl mt-2"), { color: colors.primary }]}
            type="bold"
          >
            {`> 60`}
          </UIText>
        </TimeWrapper>
        <Slider
          step={0}
          thumbStyle={{
            backgroundColor: colors.primary,
          }}
          trackClickable={true}
          trackStyle={{
            backgroundColor: colors.secondaryText,
            height: 8,
          }}
          minimumTrackTintColor={colors.primary}
          animationType="spring"
          animateTransitions={true}
          value={foodTime}
          onValueChange={value => setFoodTime(coverTime(value))}
        />
      </InputWrapper>
      <InputWrapper>
        <UIButton
          style={[
            tw("rounded-full justify-center items-center px-4 py-4 mb-5"),
            { backgroundColor: colors.primary },
          ]}
          title="Next"
          onPress={moreInfomations}
        />
      </InputWrapper>
    </ScrollView>
  );
};

export default NewPostPage1;

const UploadHeader = styled.View`
  ${tw("px-3 py-3 justify-between items-center flex-row")}
`;
const InputWrapper = styled.View`
  ${tw("w-full px-5 py-4")}
`;

const InputFoodName = styled(UIInput)`
  ${tw("w-full border pl-5 pr-5 h-14 mt-3")}
  border-radius: 60px;
  border-color: ${colors.secondaryText};
  color: ${colors.mainText};
  font-size: 16px;
`;

const InputDescription = styled(UIInput)`
  ${tw("w-full border rounded-xl pl-5 pr-1 h-20 mt-3")}
  border-color: ${colors.secondaryText};
  color: ${colors.mainText};
  font-size: 16px;
`;

const TimeWrapper = styled.View`
  ${tw("flex-row justify-between items-center")}
`;
