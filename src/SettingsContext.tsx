import { createContext, useState } from 'react';
import { AudioLanguage, DEFAULT_AUDIO_LANGUAGE } from './audioLanguages';

interface SettingsContextType {
  audioVoice: SpeechSynthesisVoice | null;
  audioVoiceOptions: SpeechSynthesisVoice[];
  audioLanguage: AudioLanguage;
  setAudioVoice: (voice: SpeechSynthesisVoice) => void;
  setAudioLanguage: (language: AudioLanguage) => void;
}

export const SettingsContext = createContext<SettingsContextType>({
  audioVoice: null,
  audioVoiceOptions: [],
  audioLanguage: DEFAULT_AUDIO_LANGUAGE,
  setAudioVoice: () => {},
  setAudioLanguage: () => {},
});

interface SettingsProviderProps {
  children: React.ReactNode;
}

export const SettingsContextProvider = ({ children }: SettingsProviderProps) => {
  const audioVoiceOptions = window.speechSynthesis.getVoices();
  const [audioVoice, setAudioVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [audioLanguage, setAudioLanguage] = useState<AudioLanguage>(DEFAULT_AUDIO_LANGUAGE);

  window.speechSynthesis.onvoiceschanged = () => {
    const options = window.speechSynthesis.getVoices();
    const defaultVoice =
      options.find(voice => voice.lang === DEFAULT_AUDIO_LANGUAGE.code) ?? options[0];
    setAudioVoice(defaultVoice);
  };

  return (
    <SettingsContext.Provider
      value={{
        audioVoice,
        audioVoiceOptions,
        audioLanguage,
        setAudioVoice,
        setAudioLanguage,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
