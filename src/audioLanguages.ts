export interface AudioLanguage {
  name: string;
  code: string;
}

export const DEFAULT_AUDIO_LANGUAGE: AudioLanguage = {
  name: 'English',
  code: 'en-US',
};

export const AUDIO_LANGUAGES: AudioLanguage[] = [
  DEFAULT_AUDIO_LANGUAGE,
  {
    name: 'Dutch',
    code: 'nl-NL',
  },
  {
    name: 'French',
    code: 'fr-FR',
  },
  {
    name: 'German',
    code: 'de-DE',
  },
  {
    name: 'Spanish',
    code: 'es-ES',
  },
  {
    name: 'Italian',
    code: 'it-IT',
  },
  {
    name: 'Polish',
    code: 'pl-PL',
  },
  {
    name: 'Chinese (Simplified)',
    code: 'zh-CN',
  },
  {
    name: 'Japanese',
    code: 'ja-JP',
  },
  {
    name: 'Korean',
    code: 'ko-KR',
  },
  {
    name: 'Russian',
    code: 'ru-RU',
  },
];
