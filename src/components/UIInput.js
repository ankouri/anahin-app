import React from "react";
import { View, TextInput, Text } from "react-native";
import tw from "tailwind-rn";
import * as Font from "expo-font";
const UIInput = props => {
  const [fontsLoaded, setFontLoaded] = React.useState(false);
  const loadFonts = async () => {
    await Font.loadAsync({
      InterLight: require("../../assets/fonts/Inter/Inter-Light.ttf"),
      InterRegular: require("../../assets/fonts/Inter/Inter-Regular.ttf"),
      InterMedium: require("../../assets/fonts/Inter/Inter-Medium.ttf"),
      InterBold: require("../../assets/fonts/Inter/Inter-Bold.ttf"),
    });
    setFontLoaded(false);
  };
  React.useEffect(() => {
    loadFonts();
  }, []);
  // console.log({ ...props.style, backgroundColor: "green" });
  return fontsLoaded ? (
    <TextInput style={{ ...props.style, backgroundColor: "green" }} />
  ) : (
    <TextInput {...props} />
  );
};

export default UIInput;
