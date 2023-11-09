import Toast from 'react-native-toast-message';

export default function ShowToast(
  type: 'success' | 'error',
  title: string,
  description: string,
) {
  return Toast.show({
    type,
    text1: title,
    text2: description,
  });
}
