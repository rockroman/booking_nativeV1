import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

import React, { useEffect } from "react";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import AuthProvider from "../context/AuthContextProvider";
const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "BaskervvilleSC-Regular": require("../assets/fonts/BaskervvilleSC-Regular.ttf"),
    "Jost-SemiBold": require("../assets/fonts/Jost-SemiBold.ttf"),
    "Jost-Bold": require("../assets/fonts/Jost-Bold.ttf"),
    "Jost-italic": require("../assets/fonts/Jost-Italic.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    <ActivityIndicator size="large" />;
  }
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "Home" }}
        />
        <Stack.Screen
          name="(auth)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            // headerShown: false,
            headerTransparent: true,
            headerStyle: {
              backgroundColor: "#173c35",
            },
            headerBackTitleVisible: false,
            headerBackVisible: false,
            headerTitle: "",
          }}
        />
      </Stack>
      <Toast position="top" topOffset={60} />
    </AuthProvider>
  );
};
export default RootLayout;
