import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Add these new screens */}
        <Stack.Screen name="trusted" options={{ title: "Trusted Contacts" }} />
        <Stack.Screen name="panic" options={{ title: "Panic Button" }} />
        <Stack.Screen name="fall" options={{ title: "Fall Detection" }} />

        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>


      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
