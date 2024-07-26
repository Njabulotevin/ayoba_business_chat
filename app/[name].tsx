import { Pressable, StyleSheet, Text, Touchable, View } from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { randomColours } from "@/components/utils/scripts";
import { Ionicons } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  TouchableHighlight,
} from "react-native-gesture-handler";

const Chats = () => {
  const { name } = useLocalSearchParams();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <GestureHandlerRootView
          style={{
            padding: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={{
              width: 30,
              height: 60,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="arrow-back" size={25} />
          </Pressable>

          <View style={[styles.profile, { backgroundColor: randomColours() }]}>
            <Text style={{ fontSize: 25, fontWeight: "400", color: "white" }}>
              {name[0]}
            </Text>
          </View>
          <View style={{flexDirection: "column", gap: 5}}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>{name}</Text>
            <Text style={{ fontSize: 16,  color: "#02609E" }}>Online</Text>
          </View>
        </GestureHandlerRootView>
      ),
    });

    console.log(name);
  }, [navigation]);

  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  profile: {
    width: 50,
    height: 50,
    // backgroundColor: ,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
  },
});
