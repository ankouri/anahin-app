import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { Camera } from "expo-camera";
import tw from "tailwind-rn";
import UIText from "./../../components/UIText";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { colors } from "./../../theme/colors";
import { useNavigation } from "@react-navigation/core";

const ScanScreen = () => {
  const [startCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState(null);
  const [flashMode, setFlashMode] = React.useState("off");
  const [savePicture, setSavePicture] = React.useState(null);
  let camera = "";
  const navigation = useNavigation();
  const _startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setStartCamera(true);
    } else {
      alert("Access denied");
    }
  };
  const _takePicture = async () => {
    const photo = await camera.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const _retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    _startCamera();
  };
  const _handleNextImage = () => {
    console.log(capturedImage);
  };
  const _handleFlashMode = () => {
    if (flashMode === "on") {
      setFlashMode("off");
    } else if (flashMode === "off") {
      setFlashMode("on");
    } else {
      setFlashMode("auto");
    }
  };
  React.useEffect(() => {
    _startCamera();
  }, []);
  return (
    <View style={tw("flex-1")}>
      {startCamera ? (
        previewVisible && capturedImage ? (
          <CameraPreview
            next={_handleNextImage}
            photo={capturedImage}
            retake={_retakePicture}
          />
        ) : (
          <Camera
            onMountError={err => {
              console.log(err);
            }}
            flashMode={flashMode}
            style={{ flex: 1, width: "100%" }}
            onCameraReady={() => {
              console.log("ready");
            }}
            autoFocus="on"
            ref={r => {
              camera = r;
            }}
          >
            <View style={tw("absolute left-5 top-10")}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={[
                  tw("w-10 h-10 rounded-full justify-center items-center"),
                  { backgroundColor: colors.primary },
                ]}
              >
                <MaterialIcons
                  name="arrow-back"
                  size={24}
                  color={colors.form}
                />
              </TouchableOpacity>
            </View>
            <View style={tw("absolute left-5 top-24")}>
              <TouchableOpacity
                onPress={_handleFlashMode}
                style={[
                  tw("w-10 h-10 rounded-full justify-center items-center"),
                  ,
                  { backgroundColor: colors.primary },
                ]}
              >
                {flashMode === "auto" ? (
                  <MaterialIcons
                    name="flash-auto"
                    size={24}
                    color={colors.form}
                  />
                ) : flashMode === "on" ? (
                  <MaterialIcons
                    name="flash-on"
                    size={24}
                    color={colors.form}
                  />
                ) : (
                  <MaterialIcons
                    name="flash-off"
                    size={24}
                    color={colors.form}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={tw(
                "absolute bottom-0 flex-row flex-1 w-full justify-center items-center p-10"
              )}
            >
              <TouchableOpacity
                onPress={_takePicture}
                style={[
                  tw("w-16 h-16 bottom-0 rounded-full"),
                  { backgroundColor: colors.primary },
                ]}
              ></TouchableOpacity>
            </View>
          </Camera>
        )
      ) : (
        <Text>Permission denied</Text>
      )}
    </View>
  );
};

const CameraPreview = ({ photo, retake, next }) => {
  return (
    <View style={tw("flex-1")}>
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={tw("flex-1")}
      >
        <View
          style={tw(
            "absolute bottom-2 flex-row w-full justify-between px-8 py-4 items-center"
          )}
        >
          <TouchableOpacity onPress={retake} style={tw("")}>
            <AntDesign
              style={tw("text-white")}
              name="closecircleo"
              size={40}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={next}>
            <AntDesign
              style={tw("text-white")}
              name="checkcircleo"
              size={40}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ScanScreen;
