import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FormField from "../../components/FormField";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import axiosInstance from "../../api/axiosDefault";

const signUp = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const handleChange = (name, value) => {
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const { username, email, password1, password2 } =
    signUpData;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosInstance.post(
        "/dj-rest-auth/registration/",
        signUpData
      );
      router.replace("/login");
    } catch (err) {
      console.log(err);
      console.log(err.response?.data);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[80vh] px-4 pt-3">
          <Text className="text-2xl text-center  mt-3 text-white font-jostB ">
            Sign up to Book it
          </Text>
          <FormField
            title="Username"
            value={username}
            handleChangeText={(e) =>
              setSignUpData({ ...signUpData, username: e })
            }
            customStyles="mt-8"
          />
          <FormField
            title="Email"
            value={email}
            handleChangeText={(e) =>
              setSignUpData({ ...signUpData, email: e })
            }
            customStyles="mt-3"
            keyboardType="email-address"
          />
          <FormField
            // title="Password"
            placeholder="password"
            value={password1}
            handleChangeText={(e) =>
              setSignUpData({ ...signUpData, password1: e })
            }
            customStyles="mt-3"
          />
          <FormField
            // title="Password"
            placeholder="your password again"
            value={password2}
            handleChangeText={(e) =>
              setSignUpData({ ...signUpData, password2: e })
            }
            customStyles="mt-3"
          />
          <CustomButton
            title="Sign Up"
            handlePress={handleSubmit}
            containerStyles="mt-7"
          />
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-jostItal">
              Have an account already?
            </Text>
            <Link
              href="/login"
              className="text-lg font-psemibold text-primButton"
            >
              Log in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default signUp;
