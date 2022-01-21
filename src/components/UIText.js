import React from "react";
import { View, Text } from "react-native";
import * as Font from "expo-font";
import styled from "styled-components/native";

const UIText = props => {
  const [fontsLoaded, setFontLoaded] = React.useState(false);
  const { type } = props;
  const loadFonts = async () => {
    await Font.loadAsync({
      InterLight: require("../../assets/fonts/Inter/Inter-Light.ttf"),
      InterRegular: require("../../assets/fonts/Inter/Inter-Regular.ttf"),
      InterMedium: require("../../assets/fonts/Inter/Inter-Medium.ttf"),
      InterBold: require("../../assets/fonts/Inter/Inter-Bold.ttf"),
    });
    setFontLoaded(true);
  };

  React.useEffect(() => {
    loadFonts();
  }, []);
  return fontsLoaded ? (
    <TextEl
      style={[
        ...props.style,
        type === "bold"
          ? { fontFamily: "InterBold" }
          : type === "medium"
          ? { fontFamily: "InterMedium" }
          : type === "light"
          ? { fontFamily: "InterLight" }
          : { fontFamily: "InterRegular" },
      ]}
    >
      {props.children}
    </TextEl>
  ) : (
    <Text style={props.style}>{props.children}</Text>
  );
};

export default UIText;

const TextEl = styled(Text)`
  /* background-color: red; */
`;
