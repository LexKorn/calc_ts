import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import InputStore from './store/InputStore';

import './style/style.sass';

type RootStateContextValue = {
  input: InputStore;
};

export const Context = createContext<RootStateContextValue>({} as RootStateContextValue);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Context.Provider value={{
    input: new InputStore()
  }}>
    <App />
  </Context.Provider>
);