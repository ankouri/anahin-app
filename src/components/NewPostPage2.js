import React from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-rn";
import styled from "styled-components/native";
import UIText from "./UIText";
import { colors } from "./../theme/colors";
import UIInput from "./UIInput";
import UIButton from "./UIButton";
import { useToast } from "react-native-toast-notifications";
import AppLoading from "expo-app-loading";
import { uploadCoverImage, addPost } from "../../hooks/usePost";
import { useNavigation } from "@react-navigation/core";
import UILoading from "./UILoading";
const NewPostPage2 = ({ setPost, post, setStepCounter }) => {
  const [ingredients, setIngredient] = React.useState([]);
  const [steps, setSteps] = React.useState([]);
  const [singleIngredient, setSingleIngredient] = React.useState("");
  const [singleStep, setSingleStep] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();
  const toast = useToast();

  const handleAddStep = async () => {
    if (steps.length !== 0 && ingredients.length !== 0) {
      setLoading(!loading);
      const downloadURL = await uploadCoverImage(post.cover);
      const result = addPost({
        title: post.title,
        desc: post.desc,
        cover: downloadURL,
        time: post.time,
        ingredients: ingredients,
        steps: steps,
      });
      if (result) {
        toast.show("Post added successfully", {
          type: "success",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in",
        });
        navigation.navigate("Main");
        setStepCounter(1);
      } else {
        throw new Error("Somethings went wrong! please try again.");
      }
    } else {
      toast.show("All fields are required", {
        type: "danger",
        placement: "bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      });
    }
    setLoading(!loading);
  };

  return (
    <View style={tw("h-full bg-white flex-1 relative")}>
      <UILoading loading={loading} />
      <KeyboardAvoidingView
        behavoir={Platform.OS === "ios" ? "padding" : "height"}
        style={tw("flex-1")}
        keyboardVerticalOffset={10}
      >
        <InputWrapper style={tw("flex-initial")}>
          <UIText
            style={[tw("text-xl"), { color: colors.mainText }]}
            type="bold"
          >
            Ingredients
          </UIText>
          <InputFoodName
            style={tw("mb-3")}
            onSubmitEditing={event => {
              setIngredient([
                ...ingredients,
                {
                  id: `${event.nativeEvent.text}+${new Date().valueOf()}`,
                  name: event.nativeEvent.text,
                },
              ]);
              setSingleIngredient("");
            }}
            value={singleIngredient}
            onChangeText={text => setSingleIngredient(text)}
            placeholderTextColor={colors.secondaryText}
            placeholder="ingredient"
          />
          <FlatList
            style={[
              tw("w-full  rounded-xl  py-2 px-2"),
              { backgroundColor: colors.form },
            ]}
            data={ingredients}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={[
                    tw("bg-white px-5 py-2 mb-2 border rounded-xl"),
                    { borderColor: colors.secondaryText },
                  ]}
                >
                  <UIText
                    style={[tw("text-sm"), { color: colors.mainText }]}
                    type="bold"
                  >
                    {index + 1 + " - " + item.name}
                  </UIText>
                </View>
              );
            }}
          />
        </InputWrapper>

        <InputWrapper style={tw("flex-initial")}>
          <UIText
            style={[tw("text-xl"), { color: colors.mainText }]}
            type="bold"
          >
            Cooking Steps
          </UIText>
          <InputFoodName
            style={tw("mb-3")}
            onSubmitEditing={event => {
              setSteps([
                ...steps,
                {
                  id: `${event.nativeEvent.text}+${new Date().valueOf()}`,
                  name: event.nativeEvent.text,
                },
              ]);
              setSingleStep("");
            }}
            value={singleStep}
            onChangeText={text => setSingleStep(text)}
            placeholderTextColor={colors.secondaryText}
            placeholder="Steps "
          />
          <FlatList
            style={[
              tw("w-full h-40 rounded-xl py-2 px-2"),
              { backgroundColor: colors.form },
            ]}
            data={steps}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={[
                    tw("bg-white px-5 py-2 mb-2 border rounded-xl"),
                    { borderColor: colors.secondaryText },
                  ]}
                >
                  <UIText
                    style={[tw("text-sm"), { color: colors.mainText }]}
                    type="bold"
                  >
                    {index + 1 + " - " + item.name}
                  </UIText>
                </View>
              );
            }}
          />
        </InputWrapper>
        <InputWrapper style={tw("flex-auto")}>
          <View style={tw("flex-row justify-between items-center")}>
            <UIButton
              style={[
                tw("rounded-full justify-center items-center px-16 py-2 mt-4"),
                { backgroundColor: colors.secondaryText },
              ]}
              title="Back"
              onPress={() => {
                setStepCounter(1);
              }}
            />
            <UIButton
              style={[
                tw("rounded-full justify-center items-center px-16 py-2 mt-4"),
                { backgroundColor: colors.primary },
              ]}
              title="Add"
              onPress={handleAddStep}
            />
          </View>
        </InputWrapper>
      </KeyboardAvoidingView>
    </View>
  );
};

export default NewPostPage2;

const InputWrapper = styled.View`
  ${tw("w-full px-5 py-4")}
`;

const InputFoodName = styled(UIInput)`
  ${tw("w-full border pl-5 pr-5 h-10 mt-3")}
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
