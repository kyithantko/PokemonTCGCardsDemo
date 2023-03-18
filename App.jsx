import * as React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {QueryClient, QueryClientProvider, focusManager} from 'react-query';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import RootNavigator from './src/navigators/RootNavigator';
import useOnlineManager from './src/hooks/useOnlineManager';
import useAppState from './src/hooks/useAppState';

const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: 2}},
});

const onAppStateChange = status => {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
};

const App = () => {
  useOnlineManager();
  useAppState(onAppStateChange);

  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RootNavigator />
        </Provider>
      </QueryClientProvider>
    </PaperProvider>
  );
};

export default App;
