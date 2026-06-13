import { Redirect } from "expo-router";

export default function Index() {
  const isLoggedIn = false; // replace with your real auth state later

  return isLoggedIn ? (
    <Redirect href="/(tabs)/dashboard" />
  ) : (
    <Redirect href="../(auth)/signin" />
  );
}
