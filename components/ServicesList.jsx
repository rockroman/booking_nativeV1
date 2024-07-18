import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
const ServicesList = ({
  services,
  handleActiveService,
  activeService,
}) => {
  return (
    <FlatList
      data={services}
      horizontal={true}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handleActiveService(item.id)}
          className={`mb-5 rounded mx-2 h-[45px] w-[27vw] justify-center items-center ${
            activeService === item.id
              ? "bg-primary"
              : "bg-gray-300 border-2 border-black-100"
          }`}
        >
          <Text
            className={`${
              activeService == item.id
                ? "text-white"
                : "text-black-100"
            }`}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};
export default ServicesList;
