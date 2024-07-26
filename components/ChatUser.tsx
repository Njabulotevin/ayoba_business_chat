import {
  StyleSheet,
  Text,
  Touchable,
  TouchableHighlight,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { randomColours } from "./utils/scripts";
import { router } from "expo-router";

export enum Status {
  "delivered",
  "read",
  "unread",
}

const ChatUser = ({
  name,
  message,
  time,
  status,
}: {
  name: string;
  message: string;
  time: string;
  status: Status;
}) => {
  return (
    <TouchableHighlight
      onPress={() => {
        router.push("/[name]");
        router.setParams({ name: name });
      }}
    >
      <View style={styles.profileWrapper}>
        <View style={[styles.profile, { backgroundColor: randomColours() }]}>
          <Text style={{ fontSize: 25, fontWeight: "400", color: "white" }}>
            {name[0]}
          </Text>
        </View>
        <View style={styles.textsGroup}>
          <View style={styles.texts}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>{name}</Text>
            <Text style={{ fontSize: 14, color: "#9F9F9F" }}>{message}</Text>
          </View>
          <View style={styles.texts}>
            <Text style={{ fontSize: 14, fontWeight: "600" }}>{time}</Text>
            {status == Status.delivered ? (
              <Ionicons name="checkmark-done" size={18} />
            ) : (
              <Ionicons name="checkmark" size={18} />
            )}
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ChatUser;

const styles = StyleSheet.create({
  profile: {
    width: 60,
    height: 60,
    // backgroundColor: ,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
  },
  profileWrapper: {
    flexDirection: "row",
    padding: 10,
    gap: 10,
    paddingHorizontal: 20,
  },
  texts: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 15,
  },
  textsGroup: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
