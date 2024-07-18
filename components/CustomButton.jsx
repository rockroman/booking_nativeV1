import { View, Text, TouchableOpacity } from "react-native";
const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      className={`bg-primButton rounded-xl h-[60px] justify-center items-center
        ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text
        className={`text-center text-black font-jostB font-bold"
      text-lg ${textStyles}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
export default CustomButton;
