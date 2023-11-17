import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

export const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.querySelector('body')?.classList.toggle('dark');
  };

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(prefersDarkMode.matches);
    document.querySelector('body')?.classList.toggle('dark', prefersDarkMode.matches);
  }, []);

  return (
    <IconButton
      variant="outline"
      color="gray"
      onClick={handleDarkModeToggle}
      style={{ width: '100%' }}
      title={isDarkMode ? 'Light mode' : 'Dark mode'}
    >
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
};
