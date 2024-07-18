import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { axiosReq } from "../../api/axiosDefault";
import { Avatar, Button, Card } from "react-native-paper";
import CustomButton from "../../components/CustomButton";
import { useFocusEffect } from "expo-router";
import useService from "../../hooks/useService";
import ServicesList from "../../components/ServicesList";
import Toast from "react-native-toast-message";
const Services = () => {
  const {
    services,
    handleActiveService,
    activeService,
    currentService,
  } = useService();

  // helper function to have text truncated or expanded
  // due to better UI of card
  const [isExpanded, setIsExpanded] = useState(false);
  const wordLimit = 22;

  const truncateText = (text, wordLimit) => {
    if (!text) {
      console.log("no text");
      return;
    }
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  // showing success messages
  // const showToast = () => {
  //   Toast.show({
  //     type: "success",
  //     text1: `Thank you for your booking`,
  //     text2: "This is some something 👋",
  //   });
  // };

  return (
    <SafeAreaView className="border h-full  flex flex-col">
      <ScrollView className="">
        <View className="my-3 pb-3 h-[15vh] flex flex-col items-center justify-center">
          <Text className="text-black font-jostSB text-4xl mt-8">
            OUR SERVICES
          </Text>
        </View>
        <ServicesList
          services={services}
          handleActiveService={handleActiveService}
          activeService={activeService}
        />
        <View className=" h-[55vh] items-center mt-3 ">
          <Card className=" flex flex-col  bg-fields w-[95vw] h-[51vh]">
            <View className="flex flex-row justify-between mb-3">
              <Text className="text-white font-jostB text-3xl mt-3 ml-3">
                {currentService?.name}
              </Text>
              <Text className="text-white font-jostItal text-2xl mt-3 mr-3">
                {currentService?.duration_minutes} min
              </Text>
            </View>

            <Card.Content className="h-[37vh]">
              <Text
                variant="titleLarge"
                className="text-white font-jostItal text-lg"
              >
                {isExpanded
                  ? currentService?.description
                  : truncateText(
                      currentService?.description,
                      wordLimit
                    )}
              </Text>
              <TouchableOpacity
                onPress={() => setIsExpanded(!isExpanded)}
                className="w-[95px] px-2 py-2 border-2 rounded border-primButton"
              >
                <Text className="text-primButton">
                  {isExpanded ? "Show Less" : "Read More"}
                </Text>
              </TouchableOpacity>
              {/* <Text variant="bodyMedium">Card content</Text> */}
            </Card.Content>

            <View className="mt-1 flex-row justify-between items-center">
              <Text className="text-white text-2xl ml-2">
                price: {currentService?.price} €
              </Text>
              <CustomButton
                title="book"
                containerStyles={"w-[35vw] h-[40px] mx-2"}
              />
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Services;
