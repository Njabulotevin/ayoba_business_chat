import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: () => <Ionicons name="home" size={20} />,
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="request"
        options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name="send-outline" size={20} />,
          title: "Request",
        }}
      />
            <Tabs.Screen
        name="assistants"
        options={{
          
          tabBarIcon: () => <Ionicons name="people-outline" size={20} />,
          title: "Assistants",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
