import React from "react";
import { View, Text } from "react-native";
import * as Google from "expo-google-app-auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";

import { auth, db } from "../config/firebase";
import { setDoc, doc, serverTimestamp } from "@firebase/firestore";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastProvider } from "react-native-toast-notifications";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import tw from "tailwind-rn";

const AuthContext = React.createContext({});

const googleAuthConfig = {
  androidClientId: ANDROID_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loadingInitial, setLoadingInitial] = React.useState(true);
  const [messages, setMessages] = React.useState({ type: "", msg: "" });
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();

  React.useEffect(
    () =>
      onAuthStateChanged(auth, user => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setLoadingInitial(false);
      }),
    []
  );

  const logout = async () => {
    setLoading(true);
    signOut(auth)
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  };

  const singInWithEmailPassword = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      setMessages({
        type: "success",
        msg: "You succesfully Login.",
      });
    } catch (err) {
      setMessages({ type: "danger", msg: err.message });
    }
  };

  const signUpWithEmailPassword = async (name, email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await saveUser(name, result.user);
    } catch (err) {
      setMessages({
        type: "danger",
        msg: err.message,
      });
    }
    setLoading(false);
  };

  const saveUser = async (name, user) => {
    try {
      const result = await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        name: name,
        email: user.email,
        follow: [],
        following: [],
        timestamp: serverTimestamp(),
      });
      setMessages({
        type: "success",
        msg: "You succesfully sing up. Please login now",
      });
      navigation.navigate("Login");
    } catch (error) {
      setMessages({
        type: "danger",
        msg: error.message,
      });
    }
  };

  const memoedValue = React.useMemo(
    () => ({
      signUpWithEmailPassword,
      singInWithEmailPassword,
      user,
      logout,
      loading,
      messages,
    }),
    [user, loading, messages]
  );
  return (
    <AuthContext.Provider value={memoedValue}>
      <ToastProvider
        dangerIcon={
          <AntDesign
            name="closecircleo"
            style={tw("ml-2 mr-2")}
            size={20}
            color="white"
          />
        }
      >
        {!loadingInitial && children}
      </ToastProvider>
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return React.useContext(AuthContext);
}
