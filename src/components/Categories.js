import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import UIText from "./UIText";
import tw from "tailwind-rn";
import { colors } from "./../theme/colors";
const data = [
  {
    id: 231,
    name: "All",
  },
  {
    id: 123,
    name: "Food",
  },
  {
    id: 324,
    name: "Drink",
  },
  {
    id: 314,
    name: "Drink",
  },
  {
    id: 524,
    name: "Drink",
  },
  {
    id: 624,
    name: "Drink",
  },
];

const Categories = () => {
  const [selected, setSelected] = React.useState(231);

  const renderCategoryItem = ({ item }) => {
    const backgroundColor = item.id === selected ? colors.primary : colors.form;
    const color = item.id === selected ? "white" : colors.secondaryText;

    return (
      <Pressable
        onPress={() => setSelected(item.id)}
        style={[
          tw("ml-5  rounded-xl items-center"),
          { backgroundColor: backgroundColor },
        ]}
      >
        <UIText style={[tw("py-2 px-4 text-xs"), { color: color }]} type="bold">
          {item.name}
        </UIText>
      </Pressable>
    );
  };
  return (
    <View>
      <UIText
        style={[tw("ml-5 text-xl mb-4"), { color: colors.mainText }]}
        type="bold"
      >
        Category
      </UIText>
      <FlatList
        style={tw("w-full mb-5")}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={data}
        renderItem={renderCategoryItem}
        extraData={selected}
      />
    </View>
  );
};

export default Categories;
