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
import { useAuthContext } from "../../context/AuthContextProvider";
import {
  setTokenTimestamp,
  storeTokens,
} from "../../utils/storageUtils";
const login = () => {
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const { username, password } = signInData;

  const { user, setUser } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosInstance.post(
        "/dj-rest-auth/login/",
        signInData
      );
      console.log("this is data in login", data);
      setUser(data.user);
      console.log("access  token in login= ", data.access);
      console.log(
        "refresh  token in login= ",
        data.refresh
      );
      await storeTokens(data.access, data.refresh);
      await setTokenTimestamp(data);

      router.replace("/");
    } catch (err) {
      console.log(err);
      console.log(err.response?.data);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[80vh] px-4 ">
          <Text className="text-2xl text-center font-semibold text-white font-jostB">
            Log in to Book it
          </Text>
          <FormField
            title="Username"
            value={username}
            handleChangeText={(e) =>
              setSignInData({ ...signInData, username: e })
            }
            customStyles="mt-10"
          />
          {errors.username?.map((message, idx) => (
            <Alert key={idx} variant="warning">
              {message}
            </Alert>
          ))}

          <FormField
            title="Password"
            // placeholder="password"
            value={password}
            handleChangeText={(e) =>
              setSignInData({ ...signInData, password: e })
            }
            customStyles="mt-7"
          />
          {errors.password?.map((message, idx) => (
            <Alert key={idx} variant="warning">
              {message}
            </Alert>
          ))}

          <CustomButton
            title="Log In"
            handlePress={handleSubmit}
            containerStyles="mt-7"
          />
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't Have an account ?
            </Text>
            <Link
              href="/signUp"
              className="text-lg font-psemibold text-primButton"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default login;
