import { Dimensions, Platform } from 'react-native';

export let screenWidth: number = Dimensions.get('screen').width;
export let screenHeight: number = Dimensions.get('screen').height;
export let windowWidth: number = Dimensions.get('window').width;
export let windowHeight: number = Dimensions.get('window').height;

const { width: viewportWidth } = Dimensions.get('window');

function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

interface DefaultSize {
  width: number;
  height: number;
}
const sizeDefault: DefaultSize = {
  //default phone size in figma 812/375: iphoneX
  width: 375,
  height: 812,
};
//portrait ratio default
const ratioDefaultLanscape: number = sizeDefault.width / sizeDefault.height;
//ratio Current phone portrait or lanscape
const ratioCurrent: number = screenHeight / screenWidth;
//ratio scale for portrait
//ratio scale for lanscape
const ratioLanscapeScale: number = ratioCurrent / ratioDefaultLanscape;
//ratio scale ipad and tablet
const scaleVer: number = screenHeight / sizeDefault.height;

const sizes: any = {};
for (let i = 1; i < 300; i++) {
  var key = 's' + i;
  sizes[key] = scale(i);
}
export default sizes;

export function isTablet() {
  if ((Platform as any).isPad || ratioCurrent === 4 / 3 || ratioCurrent < 1.6) {
    return true;
  }
  return false;
}

export const sizesTablet = (size: number, multi: number = 6) =>
  isTablet() ? size * multi : size;
//************* */
function scale(size: number) {
  if (ratioCurrent > 1) {
    //scale size for phone 16:9
    if (
      Math.round(ratioCurrent * 100) / 100 ===
      Math.round((16 / 9) * 100) / 100
    ) {
      //  maybe should return default size
      return size;
      // return Math.round(size * ratioScale * 100) / 100
    }
    //scale size for phone 18:9, 19:9, ipad, tablet 4:3,
    else {
      return Math.round(size * scaleVer * 100) / 100;
    }
  }
  //scale size for phone lanscape
  else {
    return Math.round(size * ratioLanscapeScale * 100) / 100;
  }
}
