import {TextInput, TextInputProps} from 'react-native';
import React, {useState} from 'react';
import {colors, sizes} from 'core';

const AppTextInput: React.FC<TextInputProps> = ({...otherProps}) => {
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <TextInput
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      //onChangeText={}
      placeholderTextColor={colors.darkText}
      style={[
        {
          padding: sizes.s10,
          borderRadius: sizes.s10,
          marginVertical: sizes.s10,
          backgroundColor: colors.lightBlue,
        },
        focused && {
          borderWidth: 3,
          borderColor: colors.bluePrimary,
          shadowOffset: {width: 4, height: sizes.s10},
          shadowColor: colors.bluePrimary,
          shadowOpacity: 0.2,
          shadowRadius: sizes.s10,
        },
      ]}
      {...otherProps}
    />
  );
};

export default AppTextInput;
