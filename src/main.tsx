import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';
import { SettingsProvider } from './SettingsContext.tsx';
import { Theme } from '@radix-ui/themes';
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Update available. Reload?')) {
      updateSW(true);
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SettingsProvider>
      <Theme>
        <App />
      </Theme>
    </SettingsProvider>
  </React.StrictMode>
);
