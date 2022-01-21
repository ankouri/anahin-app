import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from "react-native";
import UIInput from "./../../components/UIInput";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-rn";
import UIText from "./../../components/UIText";
import { colors } from "./../../theme/colors";
import { FontAwesome, EvilIcons } from "@expo/vector-icons";
import UIButton from "./../../components/UIButton";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/core";
import useAuth from "../../../hooks/useAuth";
import { useToast } from "react-native-toast-notifications";

const LoginScreen = () => {
  const [password, setPassword] = React.useState(true);
  const navigation = useNavigation();
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const { loading, singInWithEmailPassword, messages } = useAuth();
  const toast = useToast();
  const signIn = async () => {
    try {
      if (emailValue && passwordValue) {
        await singInWithEmailPassword(emailValue, passwordValue);
        if (messages.msg !== "") {
          toast.show(messages.msg, {
            type: messages.type,
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in",
          });
        }
      } else {
        toast.show("All fields are required *", {
          type: "danger",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in",
        });
      }
    } catch (err) {}
  };
  return (
    <LoginWrapper>
      <LoginHeaderContainer>
        <LoginHeaderTitle type="bold">Welcome Back !</LoginHeaderTitle>
        <LoginHeaderDesc type="regular">
          Please enter your account here
        </LoginHeaderDesc>
      </LoginHeaderContainer>
      <KeyboardAvoidingView
        behavoir={Platform.OS === "ios" ? "padding" : "height"}
        style={tw("flex-1")}
        keyboardVerticalOffset={10}
      >
        <LoginInputWrapper>
          <InputStartIcon name="envelope" size={30} />
          <LoginInput
            value={emailValue}
            onChangeText={text => setEmailValue(text)}
            placeholder="Email Address"
            placeholderTextColor={colors.secondaryText}
          />
        </LoginInputWrapper>
        <LoginInputWrapper>
          <InputStartIcon name="lock" size={32} />
          <LoginInput
            value={passwordValue}
            onChangeText={text => setPasswordValue(text)}
            placeholder="Password"
            placeholderTextColor={colors.secondaryText}
            secureTextEntry={password}
          />

          {password ? (
            <InputEndIcon
              onPress={() => {
                setPassword(!password);
              }}
            >
              <EvilIcons name="eye" size={30} color={colors.mainText} />
            </InputEndIcon>
          ) : (
            <InputEndIcon
              onPress={() => {
                setPassword(!password);
              }}
            >
              <EvilIcons name="eye" size={30} color={colors.mainText} />
            </InputEndIcon>
          )}
        </LoginInputWrapper>
        <ForgetPasswordWrapper onPress={() => {}}>
          <ForgetPasswordText type="bold">Forget Password ?</ForgetPasswordText>
        </ForgetPasswordWrapper>
        <ButtonWrapper>
          <UIButton
            style={[
              tw("rounded-full flex-1 justify-center items-center"),
              { backgroundColor: colors.primary },
            ]}
            title="Login"
            onPress={signIn}
          />
        </ButtonWrapper>
        <View style={tw("mt-5")}>
          <UIText
            style={[tw("text-sm text-center"), { color: colors.secondaryText }]}
            type="regular"
          >
            Or continue with
          </UIText>
        </View>
        <ButtonWrapper>
          <UIButton
            startIcon={
              <ButtonIcon name="google-plus" size={24} color="white" />
            }
            style={[
              tw("rounded-full flex-1 justify-center items-center"),
              { backgroundColor: colors.secondary },
            ]}
            title="Google"
            onPress={() => {
              console.warn("login");
            }}
          />
        </ButtonWrapper>
        <View style={tw("mt-10 flex-row justify-center items-center")}>
          <UIText
            style={[tw("text-sm text-center"), { color: colors.mainText }]}
            type="bold"
          >
            You don't have an account?
          </UIText>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <UIText
              style={[
                tw("ml-2 text-sm text-center"),
                { color: colors.primary },
              ]}
              type="regular"
            >
              Sign Up
            </UIText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LoginWrapper>
  );
};

export default LoginScreen;

const LoginHeaderContainer = styled.View`
  ${tw("h-1/3 justify-center items-center")};
`;

const LoginWrapper = styled(SafeAreaView)`
  ${tw("flex-1 bg-white")};
`;
const LoginHeaderTitle = styled(UIText)`
  ${tw("py-1 px-1 text-center")};
  color: ${colors.mainText};
  font-size: 30px;
`;
const LoginHeaderDesc = styled(UIText)`
  ${tw("py-1 px-1 text-center")};
  color: ${colors.secondaryText};
  font-size: 20px;
`;
const LoginInputWrapper = styled.View`
  ${tw("relative w-full pr-4 pl-4 mb-5")}
`;
const InputStartIcon = styled(EvilIcons)`
  ${tw("absolute top-4 left-9 z-10")};
  color: ${colors.mainText};
`;
const InputEndIcon = styled(TouchableOpacity)`
  ${tw("absolute top-4 right-9 z-10")};
`;
const LoginInput = styled(UIInput)`
  ${tw("w-full border pl-14 pr-14  h-14")}
  border-radius: 60px;
  border-color: ${colors.secondaryText};
  color: ${colors.mainText};
  font-size: 16px;
`;

const ForgetPasswordWrapper = styled(TouchableOpacity)`
  ${tw("w-40 items-end")}
`;
const ForgetPasswordText = styled(UIText)`
  color: ${colors.mainText};
`;

const ButtonWrapper = styled.View`
  ${tw("w-full px-14 h-12 mt-5")};
`;

const ButtonIcon = styled(FontAwesome)`
  ${tw("absolute top-3 left-9 z-10")}
`;
