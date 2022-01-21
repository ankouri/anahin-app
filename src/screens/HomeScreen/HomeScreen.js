import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "./../../components/SearchInput";
import tw from "tailwind-rn";
import Categories from "./../../components/Categories";
import { NavigationContainer } from "@react-navigation/native";
import PostItem from "./../../components/PostItem";
import { getPosts } from "../../../hooks/usePost";
// const posts = [
//   {
//     id: 1123,
//     image: require("../../../assets/images/onboarding/1.jpg"),
//     name: "Pancake",
//     time: ">60 mins",
//     category: "Food",
//     user: {
//       id: 1,
//       name: "Calum Lewis",
//       img: require("../../../assets/images/profiles/1.jpeg"),
//     },
//     isFavorite: true,
//   },
//   {
//     id: 1376,
//     image: require("../../../assets/images/onboarding/2.jpg"),
//     name: "Salade",
//     time: ">60 mins",
//     category: "Food",
//     user: {
//       id: 2,
//       name: "Eilif Sonas",
//       img: require("../../../assets/images/profiles/2.jpeg"),
//     },
//     isFavorite: false,
//   },
//   {
//     id: 1113,
//     image: require("../../../assets/images/onboarding/3.jpg"),
//     name: "Pancake",
//     time: ">60 mins",
//     category: "Food",
//     user: {
//       id: 3,
//       name: "Elena Shelby",
//       img: require("../../../assets/images/profiles/3.jpeg"),
//     },
//     isFavorite: false,
//   },
//   {
//     id: 1646,
//     image: require("../../../assets/images/onboarding/1.jpg"),
//     name: "Pancake",
//     time: ">60 mins",
//     category: "Food",
//     user: {
//       id: 4,
//       name: "John Priyadi",
//       img: require("../../../assets/images/profiles/4.jpeg"),
//     },
//     isFavorite: false,
//   },
//   {
//     id: 1423,
//     image: require("../../../assets/images/onboarding/2.jpg"),
//     name: "Pancake",
//     time: ">60 mins",
//     category: "Food",
//     user: {
//       id: 5,
//       name: "Eilif Sonas",
//       img: require("../../../assets/images/profiles/5.jpeg"),
//     },
//     isFavorite: false,
//   },
//   {
//     id: 1326,
//     image: require("../../../assets/images/onboarding/3.jpg"),
//     name: "Pancake",
//     time: ">60 mins",
//     category: "Drink",
//     user: {
//       id: 2,
//       name: "Eilif Sonas",
//       img: require("../../../assets/images/profiles/6.jpeg"),
//     },
//     isFavorite: false,
//   },
// ];

const HomeScreen = () => {
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    const result = getPosts();
    console.log(result);
  }, []);
  return (
    <SafeAreaView style={tw("bg-white flex-1")}>
      <SearchInput />
      <Categories />

      <FlatList
        style={tw("flex-1 w-full")}
        data={posts}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={post => {
          return <PostItem post={post} withProfile={true} />;
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
