import React, {useMemo} from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface ICustomButton {
  title: string | Element;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const CustomButton = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
}: ICustomButton) => {
  const content = useMemo(() => {
    if (typeof title === 'string') {
      return <Text style={textStyle}>{title}</Text>;
    }
    return title;
  }, [title, textStyle]);
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      {content}
    </TouchableOpacity>
  );
};
