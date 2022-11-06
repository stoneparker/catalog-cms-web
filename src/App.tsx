import { RelayEnvironmentProvider } from 'react-relay/hooks';
import { Provider } from 'react-redux';

import Routes from './routes';

import RelayEnvironment from './services/RelayEnv';
import { store } from './reducers/store';

import GlobalStyle from './styles';
import 'antd/dist/antd.css';

function App() {
  return (
    <Provider store={store}>
      <RelayEnvironmentProvider environment={RelayEnvironment}>
        <GlobalStyle />
        <Routes />
      </RelayEnvironmentProvider>
    </Provider>
  );
}

export default App;
