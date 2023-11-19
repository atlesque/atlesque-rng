import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';
import { SettingsContextProvider } from './SettingsContext.tsx';
import { Theme } from '@radix-ui/themes';
import { ServiceWorkerContextProvider } from './ServiceWorkerContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ServiceWorkerContextProvider>
      <SettingsContextProvider>
        <Theme>
          <App />
        </Theme>
      </SettingsContextProvider>
    </ServiceWorkerContextProvider>
  </React.StrictMode>
);
