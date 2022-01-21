import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import Avatar from "./Avatar";
import tw from "tailwind-rn";
import UIText from "./UIText";
import { colors } from "./../theme/colors";
import { FontAwesome } from "@expo/vector-icons";
const PostItem = ({ post, withProfile }) => {
  const [favorite, setFavorite] = React.useState(post.item.isFavorite);
  return (
    <View style={tw("w-1/2 mb-5 justify-start items-center relative")}>
      {withProfile && (
        <Avatar
          onPress={() => {
            console.warn("profile");
          }}
          img={post.item.user.img}
          title={post.item.user.name}
        />
      )}
      <View style={tw("relative w-40 h-40")}>
        <Image
          style={tw("w-40 h-40 rounded-xl mt-4")}
          source={post.item.image}
          resizeMode="cover"
        />
        <Pressable
          onPress={() => setFavorite(!favorite)}
          style={tw("absolute right-4 top-8")}
        >
          {favorite ? (
            <FontAwesome
              style={[
                tw("bg-black px-2 py-2 rounded-lg"),
                { backgroundColor: "#e3e3e399" },
              ]}
              name="heart"
              size={20}
              color="white"
            />
          ) : (
            <FontAwesome
              style={[
                tw("bg-black px-2 py-2 rounded-lg"),
                { backgroundColor: "#e3e3e373" },
              ]}
              name="heart-o"
              size={20}
              color="white"
            />
          )}
        </Pressable>
      </View>
      <UIText
        style={[tw("text-xl mt-4"), { color: colors.mainText }]}
        type="bold"
      >
        {post.item.name}
      </UIText>
      <View style={tw("flex-row items-center")}>
        <UIText
          style={[tw("text-xs mt-1"), { color: colors.secondaryText }]}
          type="bold"
        >
          {post.item.category}
        </UIText>
        <View
          style={[
            tw("mr-1 ml-1 mt-1 w-1 h-1 bg-black rounded-full"),
            { backgroundColor: colors.secondaryText },
          ]}
        />
        <UIText
          style={[tw("text-xs mt-1"), { color: colors.secondaryText }]}
          type="bold"
        >
          {post.item.time}
        </UIText>
      </View>
    </View>
  );
};

export default PostItem;
