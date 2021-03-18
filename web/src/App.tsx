import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';
import Routes from './routes';

import { ListProvider } from './context/ListContext';

const App: React.FC = () => (
  <>
    <ListProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ListProvider>
    <GlobalStyle />
  </>
);

export default App;
