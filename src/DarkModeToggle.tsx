import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
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
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <Button variant="outline" color="gray" onClick={handleDarkModeToggle}>
        {isDarkMode ? <SunIcon /> : <MoonIcon />}
      </Button>
    </div>
  );
};
