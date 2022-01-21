import React from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UploadScreen from "./../screens/HomeScreen/UploadScreen";
import {
  Feather,
  Entypo,
  Ionicons,
  FontAwesome5,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import { colors } from "./../theme/colors";
import tw from "tailwind-rn";
import UIText from "./../components/UIText";
import HomeScreen from "./../screens/HomeScreen/HomeScreen";
import ScanScreen from "./../screens/CameraScreen/ScanScreen";
import Notifications from "./../screens/NotificationScreen/Notifications";
import ProfileScreen from "./../screens/ProfileScreen/ProfileScreen";

const Tab = createBottomTabNavigator();

const TabBarButton = ({ children, onPress }) => {
  return (
    <Pressable
      style={{
        top: -16,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 35,
          backgroundColor: colors.primary,
          paddingTop: 4,
        }}
      >
        {children}
      </View>
    </Pressable>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondaryText,
        headerShown: false,
        headerStyle: { backgroundColor: colors.secondary },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={tw("justify-center items-center")}>
              <Entypo name="home" color={color} size={25} />
              <UIText style={[tw("text-xs"), { color: color }]} type="medium">
                Home
              </UIText>
            </View>
          ),
        }}
        name="Main"
        component={HomeScreen}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={tw("justify-center items-center")}>
              <FontAwesome5 name="pencil-ruler" color={color} size={23} />
              <UIText style={[tw("text-xs"), { color: color }]} type="medium">
                Upload
              </UIText>
            </View>
          ),
        }}
        name="Upload"
        component={UploadScreen}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View style={tw("mt-5")}>
              <AntDesign name="scan1" color={colors.form} size={28} />
              <UIText
                style={[tw("text-xs text-center mt-3"), { color: color }]}
                type="medium"
              >
                Scan
              </UIText>
            </View>
          ),
          tabBarButton: props => {
            return <TabBarButton {...props} />;
          },
          tabBarStyle: { display: "none" },
        }}
        name="Scan"
        component={ScanScreen}
      />

      <Tab.Screen
        options={{
          tabBarBadge: "+99",
          tabBarBadgeStyle: { backgroundColor: "red" },
          tabBarIcon: ({ color, size }) => (
            <View style={tw("justify-center items-center")}>
              <Ionicons name="md-notifications" color={color} size={25} />
              <UIText style={[tw("text-xs"), { color: color }]} type="medium">
                Notifications
              </UIText>
            </View>
          ),
        }}
        name="Notifcations"
        component={Notifications}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <View style={tw("justify-center items-center")}>
              <FontAwesome name="user" color={color} size={25} />
              <UIText style={[tw("text-xs"), { color: color }]} type="medium">
                Profile
              </UIText>
            </View>
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
