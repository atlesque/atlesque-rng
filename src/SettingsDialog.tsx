import { GearIcon } from '@radix-ui/react-icons';
import { Button, Dialog, Flex, IconButton, Select, Text } from '@radix-ui/themes';
import { useContext } from 'react';
import { SettingsContext } from './SettingsContext';
import { AUDIO_LANGUAGES, DEFAULT_AUDIO_LANGUAGE } from './audioLanguages';
import { MAX_DIALOG_WIDTH } from './constants';

export const SettingsDialog = () => {
  const { audioLanguage, setAudioLanguage, audioVoice, setAudioVoice, audioVoiceOptions } =
    useContext(SettingsContext);

  const handleAudioLanguageChange = (value: string) => {
    const newLanguage = AUDIO_LANGUAGES.find(lan => lan.code === value);
    if (newLanguage) {
      setAudioLanguage(newLanguage);
      // Also set first voice for that language
      const newVoice = speechSynthesis.getVoices().find(voice => voice.lang === value);
      if (newVoice) {
        setAudioVoice(newVoice);
      }
    }
  };

  const handleAudioVoiceChange = (value: string) => {
    const newVoice = speechSynthesis.getVoices().find(voice => voice.voiceURI === value);
    if (newVoice) {
      setAudioVoice(newVoice);
    }
  };

  const selectableAudioVoices = audioVoiceOptions.filter(
    voice => voice.lang === audioLanguage.code
  );

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton style={{ width: '100%' }} title="Settings">
          <GearIcon />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: MAX_DIALOG_WIDTH }}>
        <Dialog.Title>Settings</Dialog.Title>
        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Audio language
            </Text>
            <Select.Root
              defaultValue={DEFAULT_AUDIO_LANGUAGE.code}
              value={audioLanguage.code}
              onValueChange={handleAudioLanguageChange}
            >
              <Select.Trigger />
              <Select.Content>
                {AUDIO_LANGUAGES.map(language => (
                  <Select.Item key={language.code} value={language.code}>
                    {language.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Audio voice
            </Text>
            <Select.Root
              value={audioVoice?.voiceURI}
              onValueChange={handleAudioVoiceChange}
              disabled={selectableAudioVoices.length <= 1}
            >
              <Select.Trigger />
              <Select.Content>
                {selectableAudioVoices.map(voice => (
                  <Select.Item key={voice.voiceURI} value={voice.voiceURI}>
                    {voice.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Close
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
