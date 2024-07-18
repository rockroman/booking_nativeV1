import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import icons from "../constants/icons";
// import { icons } from "../constants";
const FormField = ({
  title,
  handleChangeText,
  value,
  customStyles,
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`${customStyles}`}>
      <Text className="text-base text-white font-pmedium">
        {title}
      </Text>
      <View
        className="w-full h-16 bg-fields rounded-2xl
       focus:border-secondary-100
       border border-gray-500 flex flex-row items-center focus:border-secondary"
      >
        <TextInput
          className="flex-1 text-white font-psemibold text-base px-4"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#484b4c"
          onChangeText={handleChangeText}
          secureTextEntry={
            title === "Password" && !showPassword
          }
        />
        {title === "Password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={
                !showPassword ? icons.eye : icons.eyeHide
              }
              className="w-6 h-6 mr-3"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default FormField;
