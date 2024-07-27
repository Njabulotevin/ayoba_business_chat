import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => (
            <View style={styles.header}>
              <Text style={styles.title}>Business Chat</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <Ionicons name="search" size={20} />
                <Ionicons name="ellipsis-vertical" size={20} />
                <View style={styles.profile}>
                  <Ionicons name="person" color="#AFB4B7" size={25} />
                </View>
              </View>
            </View>
          ),
        }}
      />
      <Stack.Screen name="[name]" />
      <Stack.Screen name="(tabs)" options={{headerShown:false}} />
    </Stack>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: "#02609E",
  },
  profile: {
    width: 60,
    height: 60,
    backgroundColor: "#DFE0E2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
  },
});
