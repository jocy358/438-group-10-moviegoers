import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="moviePage" options={{ title: 'Movie Page' }} />
      <Stack.Screen name="profile_screen" options={{ title: 'Profile' }} />
    </Stack>
  )
}
