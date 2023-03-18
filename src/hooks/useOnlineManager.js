import {useEffect} from 'react';
import {Platform} from 'react-native';
import {onlineManager} from 'react-query';
import NetInfo from '@react-native-community/netinfo';

export default function useOnlineManager() {
  useEffect(() => {
    if (Platform.OS !== 'web') {
      return NetInfo.addEventListener(state => {
        onlineManager.setOnline(
          state.isConnected != null &&
            state.isConnected &&
            Boolean(state.isInternetReachable),
        );
      });
    }
  }, []);
}
