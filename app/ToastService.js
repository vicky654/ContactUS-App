import Toast from 'react-native-toast-message';

export const showToast = (type, message) => {
  Toast.show({
    type, // 'success' | 'error'
    text1: type === 'success' ? 'Success' : 'Error',
    text2: message,
    position: 'top',
    topOffset: 50,
    visibilityTime: 3000,
  });
};
