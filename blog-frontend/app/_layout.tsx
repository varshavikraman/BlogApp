import { Stack } from "expo-router";
import { BlogProvider } from "../context/BlogContext";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,  // <-- required on iOS (banner at top)
    shouldShowList: true,    // <-- required on iOS (in notification center)
  }),
});

const colors = {
  background: "#161616",
  backgroundLight: "#1a1a1a",
  primary: "#ffffff",
  accent: "#6366f1",
  border: "rgba(255,255,255,0.08)",
} as const;

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <BlogProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerTintColor: colors.accent,
            headerShadowVisible: false,
            contentStyle: styles.content,
            headerBackTitle: "",
            headerBackButtonMenuEnabled: false,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: "Logly",
              headerTitleAlign: "center",
              headerTitleStyle: [styles.headerTitle, styles.appTitle],
              headerBackVisible: false,
            }}
          />
          <Stack.Screen name="blog/[id]" options={{ headerTitleAlign: "center", title: "Read Post" }} />
          <Stack.Screen name="blog/edit/[id]" options={{ headerTitleAlign: "center", title: "Edit Entry" }} />
          <Stack.Screen name="blog/edit/index" options={{ headerTitleAlign: "center", title: "New Entry" }} />
        </Stack>
      </BlogProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    minHeight: 50,
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  appTitle: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },
  content: {
    backgroundColor: colors.background,
  },
});
