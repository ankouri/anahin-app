import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-rn";
import NotificationItem from "./../../components/NotificationItem";
import UIText from "./../../components/UIText";
import { colors } from "./../../theme/colors";

const Notifications = () => {
  const data = [
    {
      id: 123,
      users: [
        {
          id: 234,
          name: "Dean Winchester",
          img: require("../../../assets/images/profiles/2.jpeg"),
        },
      ],
      action: "Now following you",
      time: "1h ago",
    },
    {
      id: 234,
      users: [
        {
          id: 423,
          name: "John Steve",
          img: require("../../../assets/images/profiles/4.jpeg"),
        },
        {
          id: 423,
          name: "Sam Winchester",
          img: require("../../../assets/images/profiles/6.jpeg"),
        },
      ],
      action: "Liked you recipe",
      time: "20 min",
    },
    {
      id: 645,
      users: [
        {
          id: 354,
          name: "Dean Winchester",
          img: require("../../../assets/images/profiles/6.jpeg"),
        },
      ],
      action: "Now following you",
      time: "1h ago",
    },
  ];
  return (
    <SafeAreaView style={tw("flex-1 bg-white")}>
      <View style={tw("w-full px-5 py-4")}>
        <UIText style={[tw("text-xl"), { color: colors.mainText }]} type="bold">
          New
        </UIText>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <NotificationItem item={item} />}
      />
    </SafeAreaView>
  );
};

export default Notifications;
