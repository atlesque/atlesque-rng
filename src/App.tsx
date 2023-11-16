import {
  ChevronRightIcon,
  DoubleArrowRightIcon,
  MagicWandIcon,
  MagnifyingGlassIcon,
  PlayIcon,
  SpeakerLoudIcon,
  SpeakerOffIcon,
  StopIcon,
  TriangleLeftIcon,
  TriangleRightIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, IconButton, Slider, Text, TextField, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { useState } from 'react';
import { useInterval } from 'usehooks-ts';
import styles from './App.module.scss';
import { DarkModeToggle } from './DarkModeToggle';

const MIN_AUTO_GENERATE_SPEED = 1; // sec
const MAX_AUTO_GENERATE_SPEED = 10; // sec
const DEFAULT_AUTO_GENERATE_SPEED = 2; //sec
const MIN_ZOOM_LEVEL = 1;
const MAX_ZOOM_LEVEL = 14;
const DEFAULT_ZOOM_LEVEL = 3;
const DEFAULT_MIN_NUMBER = 1;
const DEFAULT_MAX_NUMBER = 5;

export const App = () => {
  const [randomNumber, setRandomNumber] = useState(DEFAULT_MIN_NUMBER);
  const [minNumber, setMinNumber] = useState(DEFAULT_MIN_NUMBER);
  const [maxNumber, setMaxNumber] = useState(DEFAULT_MAX_NUMBER);
  const [isAutoGenerateEnabled, setIsAutoGenerateEnabled] = useState(false);
  const [autoGenerateSpeed, setAutoGenerateSpeed] = useState(DEFAULT_AUTO_GENERATE_SPEED);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [textZoomLevel, setTextZoomLevel] = useState(DEFAULT_ZOOM_LEVEL);

  const speak = (text: string) => {
    if (!isAudioEnabled) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate =
      0.5 + ((MAX_AUTO_GENERATE_SPEED - autoGenerateSpeed) / MAX_AUTO_GENERATE_SPEED) * 0.9;
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
    const newNumber = parseInt(e.target.value);
    const newMin = isNaN(newNumber) ? DEFAULT_MIN_NUMBER : newNumber;
    if (newMin > maxNumber) {
      setMinNumber(maxNumber);
      return;
    }
    setMinNumber(newMin);
  };
  const handleMaxNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = parseInt(e.target.value);
    const newMax = isNaN(newNumber) ? DEFAULT_MAX_NUMBER : newNumber;
    if (newMax < minNumber) {
      setMaxNumber(minNumber);
      return;
    }
    setMaxNumber(newMax);
  };

  const handleAutoGenerateClick = () => {
    if (!isAutoGenerateEnabled) {
      generateRandomNumber();
    }
    setIsAutoGenerateEnabled(!isAutoGenerateEnabled);
  };

  useInterval(
    () => {
      generateRandomNumber();
    },
    // seconds to milliseconds
    isAutoGenerateEnabled ? autoGenerateSpeed * 1000 : null
  );

  const handleAutoGenerateSpeedChange = (newSpeed: number) => {
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
            <Text size="9" style={{ zoom: textZoomLevel }}>
              {randomNumber}
            </Text>
          </Flex>
          <Flex gap="2" style={{ maxWidth: 200 }}>
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
          </Flex>
          <Flex gap="2">
            <Button onClick={generateRandomNumber}>
              <MagicWandIcon />
            </Button>
            <Button
              color={isAutoGenerateEnabled ? 'red' : undefined}
              onClick={handleAutoGenerateClick}
            >
              {isAutoGenerateEnabled ? (
                <StopIcon />
              ) : (
                <>
                  <PlayIcon />
                </>
              )}
            </Button>
            <IconButton onClick={handleToggleAudioClick} color={isAudioEnabled ? 'red' : undefined}>
              {isAudioEnabled ? <SpeakerOffIcon /> : <SpeakerLoudIcon />}
            </IconButton>
            <DarkModeToggle />
          </Flex>
          <Flex direction="row" align="center" gap="2" style={{ width: '100%', maxWidth: 250 }}>
            <MagnifyingGlassIcon height={12} width={12} />
            <Slider
              min={MIN_ZOOM_LEVEL}
              max={MAX_ZOOM_LEVEL}
              value={[textZoomLevel]}
              onValueChange={val => setTextZoomLevel(val[0])}
              size="2"
              style={{ flex: 1 }}
            />
            <MagnifyingGlassIcon height={20} width={20} />
          </Flex>
          <Flex direction="row" align="center" gap="2" style={{ width: '100%', maxWidth: 250 }}>
            <ChevronRightIcon height={12} width={12} />
            <Slider
              min={MIN_AUTO_GENERATE_SPEED + 1}
              max={MAX_AUTO_GENERATE_SPEED - MIN_AUTO_GENERATE_SPEED}
              value={[MAX_AUTO_GENERATE_SPEED - autoGenerateSpeed]}
              step={1}
              onValueChange={val => handleAutoGenerateSpeedChange(MAX_AUTO_GENERATE_SPEED - val[0])}
              size="2"
              style={{ flex: 1 }}
            />
            <DoubleArrowRightIcon height={20} width={20} />
          </Flex>
        </Flex>
      </div>
    </Theme>
  );
};
