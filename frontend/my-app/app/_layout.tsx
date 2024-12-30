import Header from '@/components/Header';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { PaperProvider, Searchbar, Text } from 'react-native-paper';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider>
      <React.Fragment>
      {Platform.OS === 'web' ? (
        <style type="text/css">{`
          @font-face {
            font-family: 'MaterialCommunityIcons';
            src: url(${require('react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf')}) format('truetype');
          }
        `}</style>
      ) : null}
      <Stack>
        <Stack.Screen name="index" options={{ header: () => <Header/>}} />
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        <Stack.Screen name="+not-found" />
      </Stack>
      </React.Fragment>
    </PaperProvider>
  );
}
