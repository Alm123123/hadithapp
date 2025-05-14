import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

type FontFamily = 'Roboto' | 'OpenSans' | 'Montserrat' | 'Lato' | 'PTSans';

interface Theme {
  background: string;
  backgroundSecondary: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  error: string;
}

export const lightTheme: Theme = {
  background: '#ffffff',
  backgroundSecondary: '#f5f5f5',
  text: '#000000',
  textSecondary: '#666666',
  border: '#e0e0e0',
  primary: '#007AFF',
  error: '#ff3b30',
};

export const darkTheme: Theme = {
  background: '#121212',
  backgroundSecondary: '#1e1e1e',
  text: '#ffffff',
  textSecondary: '#cccccc',
  border: '#333333',
  primary: '#0a84ff',
  error: '#ff453a',
};

interface SettingsState {
  fontFamily: FontFamily;
  fontSize: number;
  isDarkMode: boolean | null; // null means follow system
  theme: Theme;
  setFontFamily: (font: FontFamily) => void;
  setFontSize: (size: number) => void;
  toggleDarkMode: () => void;
  setSystemTheme: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      fontFamily: 'Roboto',
      fontSize: 16,
      isDarkMode: null,
      theme: lightTheme,
      setFontFamily: (font) => set({ fontFamily: font }),
      setFontSize: (size) => set({ fontSize: size }),
      toggleDarkMode: () => {
        const currentMode = get().isDarkMode;
        const newMode = currentMode === null ? true : !currentMode;
        set({ 
          isDarkMode: newMode,
          theme: newMode ? darkTheme : lightTheme
        });
      },
      setSystemTheme: () => {
        const systemTheme = useColorScheme();
        set({ 
          isDarkMode: null,
          theme: systemTheme === 'dark' ? darkTheme : lightTheme
        });
      },
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);