import React, { createContext } from 'react';

type ThemeType = { style: boolean, setStyle: React.Dispatch<React.SetStateAction<boolean>> };

// Context lets us pass a value deep into the component tree
// without explicitly threading it through every component.
// Create a context for the current theme (with "light" as the default).
const ThemeContext = createContext<ThemeType>({ style: false, setStyle: () => {} });

export default ThemeContext;
