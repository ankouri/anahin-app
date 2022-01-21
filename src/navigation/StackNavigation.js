import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./../screens/HomeScreen/HomeScreen";
import { colors } from "./../theme/colors";
import TabNavigation from "./TabNavigation";
import LoginScreen from "./../screens/AuthScreen/LoginScreen";
import Onboarding from "./../screens/OnboardingScreen/Onboarding";
import SignupScreen from "./../screens/AuthScreen/SignupScreen";
import useAuth from "../../hooks/useAuth";

const AppStack = createNativeStackNavigator();

const StackNavigation = () => {
  const { user } = useAuth();
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: colors.secondary },
      }}
    >
      {user ? (
        <AppStack.Screen name="Home" component={TabNavigation} />
      ) : (
        <>
          <AppStack.Screen name="Onboarding" component={Onboarding} />
          <AppStack.Screen name="Login" component={LoginScreen} />
          <AppStack.Screen name="SignUp" component={SignupScreen} />
        </>
      )}
    </AppStack.Navigator>
  );
};

export default StackNavigation;
