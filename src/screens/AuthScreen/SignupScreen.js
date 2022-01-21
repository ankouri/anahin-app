import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
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

const SignupScreen = () => {
  const [password, setPassword] = React.useState(true);
  const navigation = useNavigation();
  const { signUpWithEmailPassword, messages, loading } = useAuth();
  const [emailValue, setEmailValue] = React.useState("");
  const [passwordValue, setPasswordValue] = React.useState("");
  const [nameValue, setNameValue] = React.useState("");
  const toast = useToast();
  const signUp = async () => {
    try {
      if (emailValue && passwordValue && nameValue) {
        await signUpWithEmailPassword(nameValue, emailValue, passwordValue);
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
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {}, []);
  console.log(loading);
  return (
    <LoginWrapper>
      <LoginHeaderContainer>
        <LoginHeaderTitle type="bold">Create Account!</LoginHeaderTitle>
        <LoginHeaderDesc type="regular">
          Please enter your account info
        </LoginHeaderDesc>
      </LoginHeaderContainer>
      <KeyboardAvoidingView
        behavoir={Platform.OS === "ios" ? "padding" : "height"}
        style={tw("flex-1")}
        keyboardVerticalOffset={10}
      >
        <LoginInputWrapper>
          <InputStartIcon name="user" size={30} />
          <LoginInput
            editable={!loading}
            placeholder="Full Name"
            value={nameValue}
            onChangeText={text => setNameValue(text)}
            placeholderTextColor={colors.secondaryText}
          />
        </LoginInputWrapper>
        <LoginInputWrapper>
          <InputStartIcon name="envelope" size={30} />
          <LoginInput
            editable={!loading}
            placeholder="Email Address"
            value={emailValue}
            onChangeText={text => setEmailValue(text)}
            placeholderTextColor={colors.secondaryText}
          />
        </LoginInputWrapper>
        <LoginInputWrapper>
          <InputStartIcon name="lock" size={32} />
          <LoginInput
            editable={!loading}
            placeholder="Password"
            value={passwordValue}
            onChangeText={text => setPasswordValue(text)}
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

        <ButtonWrapper>
          <UIButton
            style={[
              tw("rounded-full flex-1 justify-center items-center"),
              { backgroundColor: colors.primary },
            ]}
            title="Sign Up"
            onPress={signUp}
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
            loading={loading}
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
            You already have an account?
          </UIText>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <UIText
              style={[
                tw("ml-2 text-sm text-center"),
                { color: colors.primary },
              ]}
              type="regular"
            >
              Sign In
            </UIText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LoginWrapper>
  );
};

export default SignupScreen;

const LoginHeaderContainer = styled.View`
  ${tw("h-1/4 justify-center items-center")};
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

const ButtonWrapper = styled.View`
  ${tw("w-full px-14 h-12 mt-5")};
`;

const ButtonIcon = styled(FontAwesome)`
  ${tw("absolute top-3 left-9 z-10")}
`;
