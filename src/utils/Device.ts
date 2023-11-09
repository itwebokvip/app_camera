import { Platform } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import { getBottomSpace, getStatusBarHeight } from './IphoneHelper';
/**
	**returns** - the height of the status bar:
	`59` for safe iPhone 14 pro and 14 pro max
	`50` for safe iPhone 12 Mini and 13 Mini
	`47` for safe others iPhone 12, 13 (pro and pro max too)
	`44` for safe iPhone X
	`30` for unsafe iPhone X
	`20` for other iOS devices
	`StatusBar.currentHeight` for Android.
*/
export default class Device {
	static insets: EdgeInsets = {
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	};
	static isIos = Platform.OS === 'ios';
	static isAndroid = Platform.OS === 'android';

	static setDeviceInset(insets: EdgeInsets) {
		this.insets = insets;
	}

	static getStatusBarHeight() {
		return this.insets.top || getStatusBarHeight();
	}

	static getBottomSpace() {
		return this.insets.bottom || getBottomSpace();
	}
	static setHeaderHeight(height: number) {
		return this.getStatusBarHeight() + height;
	}
}
