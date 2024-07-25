import { View, Text, Image } from "react-native";

import React, { useEffect } from "react";
import { Link, useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

const Home = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerStyle: { padding: 20, paddingBottom: 30 },
      header: () => (
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            width: "100%",
            backgroundColor: Colors.light.tint,
            maxHeight: 200,
            padding: 10,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            paddingTop: 40,
            paddingBottom: 40,
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <View
                  style={{
                    height: 40,
                    width: 40,
                    backgroundColor: "white",
                    borderRadius: 30,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="person" />
                </View>
                <View>
                  <Text style={{ color: "white" }}>Hello, Welcome</Text>
                  <Text
                    style={{ color: "white", fontWeight: "600", fontSize: 18 }}
                  >
                    Andrew Milestone
                  </Text>
                </View>
              </View>
              <View>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "white",
                    width: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 40,
                    borderRadius: 10,
                  }}
                >
                  <Ionicons
                    name="notifications-outline"
                    color="white"
                    size={20}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <View style={{ padding: 10, gap: 20, marginTop: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            Favourite Assistants
          </Text>
          <Link
            style={{ fontWeight: "bold", color: Colors.light.tint }}
            href={"/"}
          >
            See All
          </Link>
        </View>
        <GestureHandlerRootView style={{ width: "100%" }}>
          <ScrollView
            style={{ width: "100%" }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {[1, 2, 3, 4].map((itme) => (
              <View style={{ width: 200, marginHorizontal: 10 }}>
                <Image
                  source={require("@/assets/images/doctor1.jpg")}
                  style={{
                    width: 200,
                    height: 160,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>Dr. Friska</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 5,
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="star" color={Colors.light.tint} />
                      <Text style={{ fontWeight: "bold" }}>4.5</Text>
                    </View>
                  </View>
                  <Text style={{color: Colors.gray.text}}>Profesional - Level 5</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </GestureHandlerRootView>
      </View>
    </View>
  );
};

export default Home;
