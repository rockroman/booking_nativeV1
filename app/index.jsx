import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { getAccessToken } from "../utils/storageUtils";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContextProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";

import images from "../constants/images";
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const [accessToken, setAccessToken] = useState(null);
  const { user, setUser } = useAuthContext();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getAccessToken();
        setAccessToken(token);
        console.log("this is access token", token);
      } catch (error) {
        console.error(
          "Error retrieving access token:",
          error
        );
      }
    };

    fetchToken();
  }, []);
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
          justifyContent: "start",
          alignItems: "center",
          // backgroundColor: "lightgrey",
        }}
      >
        <View className=" my-3 pb-3 h-[20vh] flex flex-col items-center justify-center">
          {/* <Text className="text-4xl text-white font-jostB mt-10">
            Book it
          </Text> */}
          <Image
            source={images.hero4}
            className="w-[250px] h-[160px] rounded"
            resizeMode="contain"
          />
          <StatusBar style="auto" />
        </View>

        <View className=" rounded border-gray-500 h-[45vh] w-[90vw] bg-fields px-2 pt-5 flex flex-col items-center justify-center">
          <Text className="font-bold font-jostItal text-5xl text-primButton text-center">
            It takes a minute to
          </Text>
          <Text className="mt-2 text-5xl text-white font-extrabold text-center">
            Book it
          </Text>
          <Text className="w-[80vw] mt-8 text-white leading-1 text-lg text-center font-jostItal">
            pick one of ours amazing services where our
            professionals will take care of you and make you
            feel like at home
          </Text>
        </View>
        {/* <Link href="/signUp" style={{ color: "red" }}>
          Go to signup
        </Link> */}
        <Link href="/home" style={{ color: "red" }}>
          Home
        </Link>
        <CustomButton
          title="Get Started"
          containerStyles="w-[90vw] bg-white mt-8"
          textStyles="text-2xl"
          handlePress={() => {
            router.push("/signUp");
          }}
        />
        {/* <Toast position="top" bottomOffset={20} /> */}
      </ScrollView>
    </SafeAreaView>
  );
}
