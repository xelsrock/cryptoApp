import React from 'react';

import { CryptoContextProvider } from './context';
import AppLayout from './components/layout/AppLayout';

const App = () => {
  return (
    <CryptoContextProvider>
      <AppLayout/>
    </CryptoContextProvider>
  );
};

export default App;
