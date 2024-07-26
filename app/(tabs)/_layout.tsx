import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Chats",
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name="chatbox-ellipses-outline" color="black" size={25} />
          ),
        }}
      />

      <Tabs.Screen
        name="support"
        options={{
          tabBarIcon: () => (
            <Ionicons name="chatbox-ellipses-outline" color="black" size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: () => (
            <Ionicons name="chatbox-ellipses-outline" color="black" size={25} />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          tabBarIcon: () => (
            <Ionicons name="chatbox-ellipses-outline" color="black" size={25} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({});
