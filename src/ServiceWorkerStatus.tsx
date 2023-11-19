import { Badge, Flex, Text } from '@radix-ui/themes';
import { useContext } from 'react';
import { ServiceWorkerContext } from './ServiceWorkerContext';

export const ServiceWorkerStatus = () => {
  const { isOfflineReady, isReadyToRefresh, isWorkerRegistered, hasRegistrationError } =
    useContext(ServiceWorkerContext);

  return (
    <Flex direction="column" gap="2" align="center">
      <Text size="1">SW status:</Text>
      <Flex gap="2" align="center" justify="center">
        <Badge color={isWorkerRegistered ? 'green' : 'red'}>
          {isWorkerRegistered ? 'Registered' : 'Not registered'}
        </Badge>
        <Badge color={isReadyToRefresh ? 'red' : 'green'}>
          {isReadyToRefresh ? 'Has update' : 'Latest'}
        </Badge>
        <Badge color={isOfflineReady ? 'green' : 'red'}>
          {isOfflineReady ? 'Offline-ready' : 'Online-only'}
        </Badge>
        <Badge color={hasRegistrationError ? 'red' : 'green'}>
          {hasRegistrationError ? 'Error' : 'No errors'}
        </Badge>
        <Text size="1">v0.0.0</Text>
      </Flex>
    </Flex>
  );
};
