import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-rn";
import { colors } from "./../../theme/colors";
import UIText from "../../components/UIText";
import UIButton from "./../../components/UIButton";
import { useNavigation } from "@react-navigation/core";
const styles = StyleSheet.create({
  wrapper: {},
  textBold: { fontWeight: "bold" },
  itemTitle: tw("py-2 px-2 text-2xl text-center"),
});

const Onboarding = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw("flex-1")}>
      <View style={tw("w-full h-2/3")}>
        <Image
          style={tw("flex-1 w-full h-full")}
          resizeMode="cover"
          source={require("../../../assets/images/onboarding/4.png")}
        />
      </View>
      <View style={tw("w-full h-1/3")}>
        <UIText
          style={[
            tw("py-2 px-2 text-3xl text-center"),
            { color: colors.mainText },
          ]}
          type="bold"
        >
          Start Cooking
        </UIText>
        <UIText
          style={[
            tw("py-2 px-14 text-xl text-center"),
            { color: colors.secondaryText },
          ]}
          type="medium"
        >
          Let's join our community to cook better food!
        </UIText>
        <View style={tw("w-full px-20 h-10 mt-10")}>
          <UIButton
            style={[
              tw("rounded-full flex-1 justify-center items-center"),
              { backgroundColor: colors.primary },
            ]}
            title="Get Started"
            onPress={() => {
              navigation.navigate("Login");
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
