import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';

import styles from '../styles';
import {colors, Style} from 'core/index';

const MyTabBar: React.FC<MaterialTopTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.topTabContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label: any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        // const { snapperRequest }: any = route?.params || {};
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tabBar, isFocused && styles.activeTabBar]}>
            <View style={Style.row}>
              <Text
                style={[
                  styles.label,
                  isFocused && {color: colors.bluePrimary},
                ]}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MyTabBar;
