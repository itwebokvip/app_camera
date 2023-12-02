import Icon from 'components/images/Icon';
import {colors, sizes, Style} from 'core';
import {throttle} from 'lodash';
import React, {useMemo} from 'react';
import {
  Keyboard,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Source} from 'react-native-fast-image';
import Device from 'utils/Device';
type TypeButtonProps = {
  title?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  type?: 'primary' | 'secondary' | 'outline' | 'bluePrimary';
  size?: 'large' | 'medium' | 'small';
  disabled?: boolean;
  isSafe?: boolean;
  textStyle?: TextStyle;
  icon?: Source;
  sizeIcon?: number;
  styleIcon?: any;
  iconColor?: string;
  isReady?: boolean;
};
const Button: React.FC<TypeButtonProps> = ({
  title,
  onPress,
  type = 'primary',
  size = 'large',
  disabled = false,
  isSafe,
  style,
  textStyle,
  icon,
  styleIcon,
  sizeIcon = sizes.s16,
  iconColor,
  isReady = false,
}) => {
  const getDisableStyle = () => {
    if (disabled) {
      return {
        // button: type === 'primary' ? styles.btn_primary_disable : styles.btn_disabled,
        icon: styles.icon_disabled,
        text: styles.text_disabled,
      };
    }
  };

  const getStyle = useMemo(() => {
    const buttonStyle = {
      backgroundColor:
        type === 'outline'
          ? colors.white
          : type === 'primary'
          ? colors.primary
          : type === 'secondary'
          ? colors.white
          : colors.bluePrimary,
      borderColor:
        type === 'outline'
          ? colors.bluePrimary
          : type === 'secondary'
          ? colors.white
          : type === 'bluePrimary'
          ? colors.bluePrimary
          : colors.primary,
    };
    const color =
      type === 'primary'
        ? colors.gray1000
        : type === 'outline'
        ? colors.bluePrimary
        : type === 'secondary'
        ? colors.gray700
        : type === 'bluePrimary'
        ? colors.white
        : colors.gray1000;
    switch (size) {
      case 'medium':
        return {
          button: {
            paddingVertical: sizes.s6,
            ...Style.ph16,
            ...Style.border,
            ...buttonStyle,
          },
          icon: {
            ...Style.icon20,
            ...Style.right8,
            tintColor: color,
          },
          text: {
            ...Style.txt14,
            color: color,
            ...Style.bold,
          },
        };
      case 'small':
        return {
          button: {
            height: sizes.s36,
            ...Style.ph16,
            ...Style.border,
            ...buttonStyle,
          },
          icon: {
            ...Style.icon16,
            marginRight: sizes.s6,
            tintColor: color,
          },
          text: {
            ...Style.txt14,
            color: color,
          },
        };
      default:
        return {
          button: {
            height: sizes.s48,
            ...Style.ph24,
            ...buttonStyle,
          },
          icon: {
            ...Style.icon24,
            ...Style.right8,
            tintColor: color,
          },
          text: {
            ...Style.txt16_bold,
            color: color,
          },
        };
    }
  }, [size, type]);

  const disbleStyle = {
    button: {
      backgroundColor: colors.gray300,
      borderColor: colors.gray300,
    },
    text: {
      color: colors.gray700,
    },
  };

  const onPressButton = (action?: () => void) =>
    throttle(
      () => {
        Keyboard.dismiss();
        action && action();
      },
      500,
      {leading: true, trailing: false},
    );

  const renderIcon = () => {
    if (icon) {
      return (
        <Icon
          size={sizeIcon}
          source={icon}
          style={styleIcon}
          tintColor={
            iconColor ||
            getDisableStyle()?.icon?.tintColor ||
            getStyle.icon.tintColor
          }
        />
      );
    }
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.9}
      onPress={onPressButton(onPress)}
      style={[
        styles.container,
        getStyle.button,
        style,
        isSafe && styles.isSubmit,
        disabled && disbleStyle.button,
      ]}>
      {renderIcon()}
      <Text
        style={[
          styles.title,
          getStyle.text,
          textStyle,
          disabled && disbleStyle.text,
        ]}>
        {title}
      </Text>

      {isReady && (
        <View
          style={{
            height: 15,
            width: 15,
            backgroundColor: isReady ? '#4FAF48' : 'white',
            borderRadius: 10,
            position: 'absolute',
            right: 5,
            borderWidth: 0.5,
            borderColor: 'white',
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default React.memo(Button);

const styles = StyleSheet.create({
  container: {
    borderRadius: sizes.s8,
    paddingVertical: sizes.s12,
    borderWidth: 1,
    ...Style.row_center,
  },
  title: {
    ...Style.txt16_bold,
    textAlign: 'center',
  },
  isSubmit: {
    marginBottom: sizes.s16 + Device.getBottomSpace(),
  },
  icon_disabled: {
    tintColor: colors.disable_text,
  },
  text_disabled: {
    color: colors.disable_text,
  },
});
