import { Tabs } from 'expo-router';
import { Home, Search, Heart, Settings } from 'lucide-react-native';
import { useColorScheme, StyleSheet } from 'react-native';
import { useSettingsStore } from '@/store/settings';

export default function TabLayout() {
  const systemColorScheme = useColorScheme();
  const { isDarkMode } = useSettingsStore();
  
  // Use system theme if available, otherwise use store setting
  const effectiveDarkMode = isDarkMode ?? systemColorScheme === 'dark';

  const theme = {
    background: effectiveDarkMode ? '#121212' : '#ffffff',
    text: effectiveDarkMode ? '#ffffff' : '#000000',
    tabBarInactive: effectiveDarkMode ? '#888888' : '#999999',
    tabBarActive: '#007AFF',
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: effectiveDarkMode ? '#333333' : '#e0e0e0',
          borderTopWidth: StyleSheet.hairlineWidth,
        },
        tabBarActiveTintColor: theme.tabBarActive,
        tabBarInactiveTintColor: theme.tabBarInactive,
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.text,
        headerShadowVisible: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}