import { sizes } from 'core';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';

interface Props extends FastImageProps {
	onPress?: () => void;
	size?: number;
	radius?: number;
	tintColor?: string;
	disabled?: boolean;
}

const Icon: React.FC<Props> = ({
	onPress,
	tintColor,
	size = sizes.s16,
	radius = 0,
	style,
	disabled = false,
	...props
}) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.9}
			style={style}
			disabled={disabled || !onPress}>
			<FastImage
				{...props}
				style={{ width: size, height: size, borderRadius: radius }}
				tintColor={tintColor}
			/>
		</TouchableOpacity>
	);
};

export default React.memo(Icon);
