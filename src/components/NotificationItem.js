import React from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components/native";
import tw from "tailwind-rn";
import { colors } from "./../theme/colors";
import UIText from "./UIText";
import UIButton from "./UIButton";
const NotificationItem = ({ item }) => {
  console.log(item.action);
  return (
    <View>
      <InputWrapper>
        <View style={tw("flex-row justify-between items-center")}>
          {item.users.length > 1 ? (
            <>
              <Image
                style={tw("rounded-full w-16 h-16")}
                source={item.users[0].img}
              />

              <Image
                style={tw("absolute top-6  rounded-full w-12 h-12")}
                source={item.users[1].img}
              />
            </>
          ) : (
            <Image
              style={tw("rounded-full w-16 h-16")}
              source={item.users[0].img}
            />
          )}

          <View style={tw("flex-1")}>
            {item.users.length > 1 ? (
              <>
                <View style={tw("flex-row")}>
                  <UIText
                    style={[tw("text-sm ml-4"), { color: colors.mainText }]}
                    type="bold"
                  >
                    {item.users[0].name}
                  </UIText>
                  <UIText
                    style={[
                      tw("text-sm ml-1"),
                      { color: colors.secondaryText },
                    ]}
                    type="medium"
                  >
                    and
                  </UIText>
                </View>
                <UIText
                  style={[tw("text-sm ml-4"), { color: colors.mainText }]}
                  type="bold"
                >
                  {item.users[1].name}
                </UIText>
              </>
            ) : (
              <UIText
                style={[tw("text-sm ml-4"), { color: colors.mainText }]}
                type="bold"
              >
                {item.users[0].name}
              </UIText>
            )}
            <View style={tw("flex-row")}>
              <UIText
                style={[tw("text-sm ml-4"), { color: colors.secondaryText }]}
                type="medium"
              >
                {item.action}
              </UIText>
              <UIText
                style={[tw("text-sm ml-4"), { color: colors.secondaryText }]}
                type="medium"
              >
                {item.time}
              </UIText>
            </View>
          </View>
          <UIButton
            style={[
              tw("rounded-full justify-center items-center px-6 py-2"),
              { backgroundColor: colors.primary },
            ]}
            title="Follow"
            onPress={() => {}}
          />
        </View>
      </InputWrapper>
    </View>
  );
};

export default NotificationItem;

const InputWrapper = styled.View`
  ${tw("w-full px-5 py-4")}
`;
