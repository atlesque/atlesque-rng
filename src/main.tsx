import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';
import { SettingsProvider } from './SettingsContext.tsx';
import { Theme } from '@radix-ui/themes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SettingsProvider>
      <Theme>
        <App />
      </Theme>
    </SettingsProvider>
  </React.StrictMode>
);
