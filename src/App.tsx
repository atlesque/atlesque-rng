import {
  ClockIcon,
  SpeakerLoudIcon,
  SpeakerOffIcon,
  TriangleLeftIcon,
  TriangleRightIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, Heading, IconButton, TextField, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { useState } from 'react';
import { useInterval } from 'usehooks-ts';
import styles from './App.module.scss';

const MIN_AUTO_GENERATE_SPEED = 100;
const DEFAULT_AUTO_GENERATE_SPEED = 2000;

export const App = () => {
  const [randomNumber, setRandomNumber] = useState(0);
  const [minNumber, setMinNumber] = useState(1);
  const [maxNumber, setMaxNumber] = useState(5);
  const [isAutoGenerateEnabled, setIsAutoGenerateEnabled] = useState(false);
  const [autoGenerateSpeed, setAutoGenerateSpeed] = useState(DEFAULT_AUTO_GENERATE_SPEED);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const speak = (text: string) => {
    if (!isAudioEnabled) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  const generateRandomNumber = () => {
    // If min and max are identical, just return the number
    if (minNumber === maxNumber) {
      setRandomNumber(minNumber);
      return;
    }
    // Generate between min and max, but never repeat the previous number
    let newNumber = randomNumber;
    while (newNumber === randomNumber) {
      newNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    }
    setRandomNumber(newNumber);
    speak(newNumber.toString());
  };

  const handleMinNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Don't allow min to be greater than max
    const newMin = parseInt(e.target.value);
    if (newMin > maxNumber) {
      setMinNumber(maxNumber);
      return;
    }
    setMinNumber(newMin);
  };
  const handleMaxNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Don't allow max to be less than min
    const newMax = parseInt(e.target.value);
    if (newMax < minNumber) {
      setMaxNumber(minNumber);
      return;
    }
    setMaxNumber(newMax);
  };

  const handleAutoGenerateClick = () => {
    setIsAutoGenerateEnabled(!isAutoGenerateEnabled);
  };

  useInterval(
    () => {
      generateRandomNumber();
    },
    isAutoGenerateEnabled ? autoGenerateSpeed : null
  );

  const handleAutoGenerateSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseInt(e.target.value);
    if (newSpeed < MIN_AUTO_GENERATE_SPEED) {
      setAutoGenerateSpeed(MIN_AUTO_GENERATE_SPEED);
      return;
    }
    setAutoGenerateSpeed(newSpeed);
  };

  const handleToggleAudioClick = () => {
    setIsAudioEnabled(!isAudioEnabled);
  };

  return (
    <Theme>
      <div className={styles.root}>
        <Flex
          direction="column"
          gap="2"
          p="4"
          pb="9"
          align="center"
          justify="center"
          width="100%"
          height="100%"
        >
          <Flex grow="1" align="center">
            <Heading size="9">{randomNumber}</Heading>
          </Flex>
          <Flex gap="2">
            <TextField.Root>
              <TextField.Slot>
                <TriangleLeftIcon height={16} width={16} />
              </TextField.Slot>
              <TextField.Input type="number" value={minNumber} onChange={handleMinNumberChange} />
            </TextField.Root>
            <TextField.Root>
              <TextField.Slot>
                <TriangleRightIcon height={16} width={16} />
              </TextField.Slot>
              <TextField.Input type="number" value={maxNumber} onChange={handleMaxNumberChange} />
            </TextField.Root>
            <TextField.Root>
              <TextField.Slot>
                <ClockIcon height={16} width={16} />
              </TextField.Slot>
              <TextField.Input
                type="number"
                value={autoGenerateSpeed}
                min={MIN_AUTO_GENERATE_SPEED}
                onChange={handleAutoGenerateSpeedChange}
              />
            </TextField.Root>
          </Flex>
          <Flex gap="2">
            <Button onClick={generateRandomNumber}>Generate</Button>
            <Button
              color={isAutoGenerateEnabled ? 'red' : undefined}
              onClick={handleAutoGenerateClick}
            >
              {isAutoGenerateEnabled ? 'Stop generating' : 'Auto generate'}
            </Button>
            <IconButton onClick={handleToggleAudioClick} color={isAudioEnabled ? 'red' : undefined}>
              {isAudioEnabled ? <SpeakerOffIcon /> : <SpeakerLoudIcon />}
            </IconButton>
          </Flex>
        </Flex>
      </div>
    </Theme>
  );
};
