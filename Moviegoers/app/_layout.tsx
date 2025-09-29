import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
          headerStyle: {
            backgroundColor: "#BE3139",
          },
          headerTintColor: "#F9F4FA",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
      <Stack.Screen name="home" options={{ title: 'Home' }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="moviePage" options={{ title: 'Movie Page' }} />
      <Stack.Screen name="profile_screen" options={{ title: 'Profile' }} />
      <Stack.Screen name="movieSearch" options={{ title: 'Search' }} />
    </Stack>
  )
}
