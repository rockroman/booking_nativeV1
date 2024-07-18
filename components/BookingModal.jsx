import { useState } from "react";
import {
  Alert,
  Modal,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import CustomButton from "./CustomButton";
import TabIcon from "./TabIcon";
import { Icon, Button } from "react-native-paper";
import { useAuthContext } from "../context/AuthContextProvider";
import { axiosReq, axiosRes } from "../api/axiosDefault";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

const BookingModal = ({
  modalVisible,
  setModalVisible,
  currentService,
  selectedDay,
  pickedTimeSlotTime,
  selectedTimeSlot,
}) => {
  const { user } = useAuthContext();
  // console.log("curr user= ", user);
  const bookingData = {
    user: user?.pk,
    service: currentService?.id,
    time_slot: selectedTimeSlot?.id,
  };
  // showing success messages
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: `Thank you ${user?.username} for your booking`,
      text2: "This is some something 👋",
    });
  };

  const confirmBooking = async () => {
    try {
      await axiosRes.post("bookings/", bookingData);
      console.log("success");
      setModalVisible(false);
      router.push("/home");
      showToast();
    } catch (error) {
      console.log("this is error on booking = ", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(
          "Response data:",
          error.response.data
        );
        console.error(
          "Response status:",
          error.response.status
        );
        console.error(
          "Response headers:",
          error.response.headers
        );
      }
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View className="bg-fields rounded  h-[60vh] mt-[20vh] w-[95vw] mx-auto pb-3">
        <TouchableOpacity
          className="w-[10vw] ml-auto"
          onPress={() => setModalVisible(!modalVisible)}
        >
          <TabIcon
            source={"close-thick"}
            containerStyles={`w-[11vw] h-[4vh] pt-2 pr-2`}
            color={"white"}
          />
        </TouchableOpacity>
        <View className=" h-[60%] flex flex-col mt-[7vh]">
          <Text className="text-white font-jostB text-3xl text-center">
            You will book
          </Text>
          {/* <Text className="text-white">
            This is user=={user?.username}
          </Text>
          <Text className="text-white">
            This is user=={user?.pk}
          </Text> */}
          <View className="mt-6 flex flex-row  w-[85vw] mx-auto pl-3 align-middle pt-6">
            <TabIcon
              source={"check-bold"}
              color={"#F9FEFB"}
            />
            <Text className="text-2xl text-primButton font-bold  ml-3">
              {currentService?.name}
            </Text>
          </View>
          <View className="mt-4 flex flex-row  w-[85vw] mx-auto pl-3 align-middle">
            <TabIcon
              source={"check-bold"}
              color={"#F9FEFB"}
            />
            <Text className="text-white text-2xl font-bold  ml-3">
              For {selectedDay}
            </Text>
          </View>
          <View className="mt-4 flex flex-row w-[85vw] mx-auto pl-3 align-middle">
            <TabIcon
              source={"check-bold"}
              color={"#F9FEFB"}
            />
            <Text className="text-white font-bold text-2xl  ml-3">
              At {pickedTimeSlotTime}
            </Text>
          </View>
        </View>
        <View className="flex flex-row justify-between px-2">
          <CustomButton
            title="Confirm Appointment"
            containerStyles={`w-[55vw] mt-[12%]`}
            handlePress={confirmBooking}
          />
          <CustomButton
            title="Cancel"
            containerStyles={`w-[30vw] mt-[12%] bg-black border-slate-50 border-2`}
            textStyles={`text-white`}
            handlePress={() =>
              setModalVisible(!modalVisible)
            }
          />
        </View>
      </View>
    </Modal>
  );
};

export default BookingModal;
