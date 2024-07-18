import { View, Text } from "react-native";
import { Tabs, Redirect } from "expo-router";
import TabIcon from "../../components/TabIcon";
const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#10362d",
          },
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                source={"home"}
                color={"#F9FEFB"}
                focused={focused}
                name={"home"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="services"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                source={"hand-heart-outline"}
                color={"#F9FEFB"}
                focused={focused}
                name={"services"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="appointments"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                source={"calendar-month"}
                color={"#F9FEFB"}
                focused={focused}
                name={"calendar"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                source={"cog"}
                color={"#F9FEFB"}
                focused={focused}
                name={"account"}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};
export default TabsLayout;
