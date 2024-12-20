import { BackHandler, Platform } from 'react-native';

/**
 * Attaches an event listener that handles the android-only hardware
 * back button
 * @param  {Function} callback The function to call on click
 */
const handleAndroidBackButton = (
  callback: () => boolean | undefined | null,
) => {
  if (Platform.OS === 'android') {
    BackHandler.addEventListener('hardwareBackPress', callback);
  }
};

/**
 * Removes the event listener in order not to add a new one
 * every time the view component re-mounts
 */
const removeAndroidBackButtonHandler = (
  callback: () => boolean | undefined | null,
) => {
  if (Platform.OS === 'android') {
    BackHandler.removeEventListener('hardwareBackPress', callback);
  }
};

export { handleAndroidBackButton, removeAndroidBackButtonHandler };
