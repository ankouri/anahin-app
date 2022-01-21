import React from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-rn";
import { Entypo } from "@expo/vector-icons";
import { colors } from "./../../theme/colors";
import UIText from "./../../components/UIText";
import PostItem from "./../../components/PostItem";
import UIButton from "./../../components/UIButton";
import useAuth from "../../../hooks/useAuth";
const posts = [
  {
    id: 1123,
    image: require("../../../assets/images/onboarding/1.jpg"),
    name: "Pancake",
    time: ">60 mins",
    category: "Food",
    user: {
      id: 1,
      name: "Calum Lewis",
      img: require("../../../assets/images/profiles/1.jpeg"),
    },
    isFavorite: true,
  },
  {
    id: 1376,
    image: require("../../../assets/images/onboarding/2.jpg"),
    name: "Salade",
    time: ">60 mins",
    category: "Food",
    user: {
      id: 2,
      name: "Eilif Sonas",
      img: require("../../../assets/images/profiles/2.jpeg"),
    },
    isFavorite: false,
  },
  {
    id: 1113,
    image: require("../../../assets/images/onboarding/3.jpg"),
    name: "Pancake",
    time: ">60 mins",
    category: "Food",
    user: {
      id: 3,
      name: "Elena Shelby",
      img: require("../../../assets/images/profiles/3.jpeg"),
    },
    isFavorite: false,
  },
  {
    id: 1646,
    image: require("../../../assets/images/onboarding/1.jpg"),
    name: "Pancake",
    time: ">60 mins",
    category: "Food",
    user: {
      id: 4,
      name: "John Priyadi",
      img: require("../../../assets/images/profiles/4.jpeg"),
    },
    isFavorite: false,
  },
  {
    id: 1423,
    image: require("../../../assets/images/onboarding/2.jpg"),
    name: "Pancake",
    time: ">60 mins",
    category: "Food",
    user: {
      id: 5,
      name: "Eilif Sonas",
      img: require("../../../assets/images/profiles/5.jpeg"),
    },
    isFavorite: false,
  },
  {
    id: 1326,
    image: require("../../../assets/images/onboarding/3.jpg"),
    name: "Pancake",
    time: ">60 mins",
    category: "Drink",
    user: {
      id: 2,
      name: "Eilif Sonas",
      img: require("../../../assets/images/profiles/6.jpeg"),
    },
    isFavorite: false,
  },
];
const ProfileScreen = () => {
  const { logout } = useAuth();
  return (
    <SafeAreaView style={tw("flex-1 bg-white")}>
      <TouchableOpacity
        onPress={() => {
          console.warn("share");
        }}
        style={tw("items-end pr-4 pt-2")}
      >
        <Entypo name="share" size={30} color={colors.mainText} />
      </TouchableOpacity>
      <View style={tw("h-60 w-full justify-center items-center")}>
        <Image
          style={tw("h-20 w-20 rounded-full")}
          source={require("../../../assets/images/profiles/4.jpeg")}
        />
        <UIText
          type="bold"
          style={[tw("text-xl mt-4"), { color: colors.mainText }]}
        >
          Choirul Syafrill
        </UIText>

        <View style={[tw(" flex-row w-full justify-evenly py-4 items-center")]}>
          <View style={tw("justify-center items-center")}>
            <UIText
              type="bold"
              style={[tw("text-xl"), { color: colors.mainText }]}
            >
              32
            </UIText>
            <UIText
              type="medium"
              style={[tw("text-sm"), { color: colors.secondaryText }]}
            >
              Recipes
            </UIText>
          </View>
          <View style={tw("justify-center items-center")}>
            <UIText
              type="bold"
              style={[tw("text-xl"), { color: colors.mainText }]}
            >
              782
            </UIText>
            <UIText
              type="medium"
              style={[tw("text-sm"), { color: colors.secondaryText }]}
            >
              Following
            </UIText>
          </View>
          <View style={tw("justify-center items-center")}>
            <UIText
              type="bold"
              style={[tw("text-xl"), { color: colors.mainText }]}
            >
              1.2K
            </UIText>
            <UIText
              type="medium"
              style={[tw("text-sm"), { color: colors.secondaryText }]}
            >
              Followers
            </UIText>
          </View>
        </View>
        <View style={tw("mt-2 mb-2")}>
          <UIButton
            style={[
              tw("px-16 py-2 mb-4 rounded-full justify-center items-center"),
              { backgroundColor: colors.primary },
            ]}
            title="Follow"
            onPress={logout}
          />
        </View>
      </View>
      <FlatList
        style={tw("flex-1 w-full")}
        data={posts}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={post => {
          return <PostItem post={post} withProfile={false} />;
        }}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
