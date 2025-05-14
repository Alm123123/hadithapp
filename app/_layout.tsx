import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import {
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import {
  OpenSans_400Regular,
  OpenSans_700Bold
} from '@expo-google-fonts/open-sans';
import {
  Montserrat_400Regular,
  Montserrat_700Bold
} from '@expo-google-fonts/montserrat';
import {
  Lato_400Regular,
  Lato_700Bold
} from '@expo-google-fonts/lato';
import {
  PTSans_400Regular,
  PTSans_700Bold
} from '@expo-google-fonts/pt-sans';
import { SplashScreen } from 'expo-router'
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();
  const [fontsLoaded, fontError] = useFonts({
    'Roboto': Roboto_400Regular,
    'Roboto-Bold': Roboto_700Bold,
    'OpenSans': OpenSans_400Regular,
    'OpenSans-Bold': OpenSans_700Bold,
    'Montserrat': Montserrat_400Regular,
    'Montserrat-Bold': Montserrat_700Bold,
    'Lato': Lato_400Regular,
    'Lato-Bold': Lato_700Bold,
    'PTSans': PTSans_400Regular,
    'PTSans-Bold': PTSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    window.frameworkReady?.();
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}