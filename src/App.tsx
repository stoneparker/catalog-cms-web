import { RelayEnvironmentProvider } from 'react-relay/hooks';

import Routes from './routes';

import RelayEnvironment from './services/RelayEnv';

import GlobalStyle from './styles';
import 'antd/dist/antd.css';

function App() {
  return (
    // <RelayEnvironmentProvider environment={RelayEnvironment}>
    <>
      <GlobalStyle />
      <Routes />
    </>
    // </RelayEnvironmentProvider>
  );
}

export default App;
