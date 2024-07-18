import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { axiosReq, axiosRes } from "../../api/axiosDefault";
import useService from "../../hooks/useService";
import ServicesList from "../../components/ServicesList";
import { filterDates } from "../../utils/compareDates";
import { set } from "date-fns";
const Appointments = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDay, SetSelectedDay] = useState(null);
  const [isDaySelected, setIsDaySelected] = useState(false);
  const {
    services,
    handleActiveService,
    activeService,
    currentService,
  } = useService();

  const fetchTimeslots = async () => {
    try {
      const { data } = await axiosRes.get(
        "services/timeslots/"
      );
      // console.log("timeslots = ", data.results);
      // const dates = data.results.map((item) => item.date);
      const activeServicesObj = data.results.filter(
        (item) => item.service.id === activeService
      );
      // console.log("active serv obj = ", activeServicesObj);
      const dates = activeServicesObj.map(
        (item) => item.date
      );

      setAvailableDates(filterDates(dates));
      // console.log("dates of timeslot = ", dates);
      setTimeSlots(data.results);
    } catch (error) {
      console.log("error in fetch timeslots", error);
    }
  };

  // filter timeslots of current service
  const timeSlotsOfCurrentService = timeSlots.filter(
    (slot) => slot.service.id === activeService
  );

  // get only timeslots for selected day
  const timeSlotsOfCurrentServiceForDay =
    timeSlotsOfCurrentService.filter(
      (slot) => slot.date === selectedDay
    );
  console.log(
    "timeslots of curr service= ",
    timeSlotsOfCurrentServiceForDay
  );

  // mark only available dates where there is service
  // const serviceDates = {};
  // availableDates.forEach((val) => {
  //   serviceDates[val] = { selected: true };
  // });
  const serviceDates = {};
  availableDates.forEach((val) => {
    serviceDates[val] = {
      dotColor: "#0c652e",

      marked: true,

      customStyles: {
        container: {
          borderBottomWidth: 7, // Underline thickness
          borderBottomColor: "green", // Underline color
        },
        text: {
          color: "#2d4150",
          fontWeight: "900",
        },
      },
    };
  });

  useEffect(() => {
    setIsDaySelected(false);
    SetSelectedDay(null);
    fetchTimeslots();
  }, [activeService]);

  const handleDayPress = (day) => {
    SetSelectedDay(day.dateString);
    setIsDaySelected(true);
  };

  const mergedDates = {
    ...serviceDates,
    [selectedDay]: {
      customStyles: {
        container: {
          backgroundColor: "#175b1c", // Highlight color for selected day
        },
        text: {
          color: "white", // Text color for selected day
        },
      },
    },
  };

  return (
    <SafeAreaView className=" w-full h-full bg-white">
      <ScrollView className="h-full pt-6">
        <Text className="mt-8 mb-4 text-black font-jostSB text-3xl text-center py-3 uppercase">
          Book Appointment
        </Text>

        <View className="h-[8vh] mb-4 mx-1 pt-3">
          <ServicesList
            services={services}
            handleActiveService={handleActiveService}
            activeService={activeService}
          />
        </View>
        <Calendar
          className="mx-2"
          theme={{
            indicatorColor: "red",
            dayTextColor: "#2d4150",
            selectedDayBackgroundColor: "#175b1c",
            textDayFontWeight: "500",
          }}
          // dayComponent={(color = "red")}
          marking={"circle"}
          markingType={"custom"}
          onDayPress={handleDayPress}
          markedDates={
            isDaySelected ? mergedDates : serviceDates
          }
          // markedDates={serviceDates}
          // onDayPress={(day) => {
          //   console.log("this is day ", day);
          //   console.log(day.dateString);
          //   setIsDaySelected(true);
          //   SetSelectedDay(day.dateString);

          //   const chosen = availableDates.find(
          //     (el) => el === day.dateString
          //   );
          //   console.log(chosen);
          // }}
        />
        <View className="h-[18vh] mt-1 mx-1">
          {!isDaySelected ? (
            <Text className="text-primary mb-2 text-2xl font-jostB text-center ">
              No Day Selected
            </Text>
          ) : (
            <Text className="text-primary mb-2 text-2xl font-jostB text-center ">
              Select time for {selectedDay}
            </Text>
          )}

          <FlatList
            data={timeSlotsOfCurrentServiceForDay}
            horizontal={true}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {}}
                className={`mt-2 px-4  rounded mx-2 h-[45px] w-[30vw] justify-around items-center ${"bg-primary"}`}
              >
                <Text className={`${"text-white"}`}>
                  {item.start_time}
                </Text>
                <Text className={`${"text-white"}`}>
                  {item.end_time}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Appointments;
