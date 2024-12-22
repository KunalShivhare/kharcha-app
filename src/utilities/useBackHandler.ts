import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const useBackHandler = (onBackPress: () => void) => {
  useEffect(() => {
    const backAction = () => {
      onBackPress();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);
};

export default useBackHandler;
