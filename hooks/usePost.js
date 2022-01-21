import React from "react";
import { View, Text, Platform } from "react-native";
import { db } from "../config/firebase";
import {
  addDoc,
  getDocs,
  doc,
  serverTimestamp,
  collection,
} from "@firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "@firebase/storage";
import tw from "tailwind-rn";
import { useToast } from "react-native-toast-notifications";

export const addPost = async ({
  cover,
  title,
  desc,
  time,
  ingredients,
  steps,
}) => {
  try {
    const result = await addDoc(collection(db, "posts"), {
      title,
      desc,
      cover,
      time,
      ingredients,
      steps,
    });
    if (result.id) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const uploadCoverImage = async file => {
  const { uri } = file;
  try {
    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const storageRef = ref(getStorage(), `covers/${filename}`);
    const response = await fetch(uri);
    const blob = await response.blob();
    const task = await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(task.ref);
    return downloadURL;
  } catch (err) {
    console.warn(JSON.stringify(err));
  }
};

export const getPosts = async () => {
  let posts = [];
  try {
    const result = await getDocs(collection(db, "posts"));
    result.forEach(doc => {
      //  posts.push(doc);
      console.log(doc.data());
    });
  } catch (error) {
    console.log(error);
  }
  return posts;
};
