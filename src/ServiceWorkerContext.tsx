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
    },
    onNeedRefresh() {
      /* if (confirm('Update available. Reload?')) {
        updateSW(true);
      } */
      setIsReadyToRefresh(true);
    },
    onRegisteredSW() {
      setIsWorkerRegistered(true);
    },
    onRegisterError() {
      setHasRegistrationError(true);
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
