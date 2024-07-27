import { StyleSheet, Text, View } from "react-native";
import React from "react";

export enum MessageType {
  "guest",
  "user",
}

const MessageBubbble = ({
  messageType,
  message,
  time,
}: {
  messageType: MessageType;
  message: String;
  time: String;
}) => {
  return (
    <>
      {messageType == MessageType.user ? (
        <View style={[styles.messageUser, styles.message]}>
          <Text style={styles.messageTextUser}>{message}</Text>
          <Text style={styles.messageTimeUser}>{time}</Text>
        </View>
      ) : (
        <View style={[styles.messageGuest, styles.message]}>
          <Text style={styles.messageTextGuest}>{message}</Text>
          <Text style={styles.messageTimeGuest}>{time}</Text>
        </View>
      )}
    </>
  );
};

export default MessageBubbble;

const styles = StyleSheet.create({
  message: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
  },
  messageGuest: {
    backgroundColor: "white",
    borderBottomLeftRadius: 0,
    alignSelf: "flex-start",
  },
  messageUser: {
    backgroundColor: "#0091F1",
    borderBottomRightRadius: 0,
    alignSelf: "flex-end",
  },
  messageTextUser: {
    color: "white",
  },
  messageTimeUser: {
    color: "white",
  },
  messageTextGuest: {
    color: "#414141",
  },
  messageTimeGuest: {
    color: "#414141",
  },
});
