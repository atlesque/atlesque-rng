import { createContext, useState } from 'react';
import { registerSW } from 'virtual:pwa-register';

interface ServiceWorkerContextType {
  isOfflineReady: boolean;
  isReadyToRefresh: boolean;
  isWorkerRegistered: boolean;
  hasRegistrationError: boolean;
  updateSW: () => void;
}

export const ServiceWorkerContext = createContext<ServiceWorkerContextType>({
  isOfflineReady: false,
  isReadyToRefresh: false,
  isWorkerRegistered: false,
  hasRegistrationError: false,
  updateSW: () => {},
});

interface ServiceWorkerProviderProps {
  children: React.ReactNode;
}

export const ServiceWorkerContextProvider = ({ children }: ServiceWorkerProviderProps) => {
  const [isOfflineReady, setIsOfflineReady] = useState(false);
  const [isReadyToRefresh, setIsReadyToRefresh] = useState(false);
  const [isWorkerRegistered, setIsWorkerRegistered] = useState(false);
  const [hasRegistrationError, setHasRegistrationError] = useState(false);

  const updateSW = registerSW({
    onOfflineReady() {
      setIsOfflineReady(true);
      console.log('App is offline-ready');
    },
    onNeedRefresh() {
      /* if (confirm('Update available. Reload?')) {
        updateSW(true);
      } */
      setIsReadyToRefresh(true);
      console.log('App has update available');
    },
    onRegisteredSW() {
      setIsWorkerRegistered(true);
      console.log('App is registered');
    },
    onRegisterError() {
      setHasRegistrationError(true);
      console.log('App registration failed');
    },
  });

  return (
    <ServiceWorkerContext.Provider
      value={{
        isOfflineReady,
        isReadyToRefresh,
        isWorkerRegistered,
        hasRegistrationError,
        updateSW,
      }}
    >
      {children}
    </ServiceWorkerContext.Provider>
  );
};
