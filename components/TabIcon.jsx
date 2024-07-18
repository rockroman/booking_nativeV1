import { View, Text } from "react-native";
import { Button, Icon } from "react-native-paper";
const TabIcon = ({
  source,
  color,
  focused,
  name,
  extraStyles,
  containerStyles,
}) => {
  return (
    <View
      className={`flex flex-col items-center pt-2" ${containerStyles}`}
    >
      <Icon
        source={source}
        size={30}
        color={color}
        focused={focused}
      />
      <Text className={`text-white ${extraStyles}`}>
        {name}
      </Text>
    </View>
  );
};
export default TabIcon;
