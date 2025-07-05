import React, { useState, startTransition } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

// List of languages and their corresponding flags
const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'am', name: 'Armenian', flag: '🇦🇲' },  // Armenian language added
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (language) => {
    if (language) {
      setSelectedLanguage(language);
      startTransition(() => {
        i18n.changeLanguage(language.code);
      })
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        onClick={handleMenuClick}
      >
        <span>{selectedLanguage.flag}</span>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleMenuClose(null)}
      >
        {languages.map((language) => (
          <MenuItem key={language.code} onClick={() => handleMenuClose(language)}>
            <span>{language.flag} {language.name}</span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageSwitcher;
