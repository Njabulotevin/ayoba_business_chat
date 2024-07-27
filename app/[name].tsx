import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { randomColours } from "@/components/utils/scripts";
import { Ionicons } from "@expo/vector-icons";
import MessageBubbble, { MessageType } from "@/components/messageBubble";
import OutlineInput from "@/components/Input";
import { useFormik } from "formik";
import { useGetMessages, useSendMessage } from "@/services/hooks/messages";
import { TextInput } from "react-native-gesture-handler";

interface Message {
  message: String;
  type: MessageType;
  time: String;
}

const Chats = () => {
  const { name } = useLocalSearchParams();
  const navigation = useNavigation();
  const { mutate, isError, error, isSuccess } = useSendMessage();

  const {data} = useGetMessages();

  const headerComponent = useMemo(
    () => (
      <View style={styles.headerContainer}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={25} />
        </Pressable>
        <View style={[styles.profile, { backgroundColor: randomColours() }]}>
          <Text style={styles.profileText}>{name[0]}</Text>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerNameText}>{name}</Text>
          <Text style={styles.headerStatusText}>Online</Text>
        </View>
      </View>
    ),
    [name]
  );

  useEffect(() => {
    navigation.setOptions({
      header: () => headerComponent,
    });

    console.log(name);
  }, [navigation, headerComponent]);

  useEffect(()=>{
    console.log(data);
  })

  const [messages, setMessages] = useState<Message[]>([
    {
      message: "just a message",
      type: MessageType.user,
      time: "20:30",
    },
    {
      message: "just a message",
      type: MessageType.guest,
      time: "20:30",
    },
  ]);

  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: { message: "" },
    onSubmit: (values, actions) => {
      console.log(values);
      setMessages([
        ...messages,
        {
          message: values.message,
          type: MessageType.user,
          time: "10:40",
        },
      ]);

      mutate({
        msisdns: ["+27648917936"],
        message_type: "text",
        message_text: values.message,
      });
      actions.resetForm();
    },
  });

  return (
    <ImageBackground
      source={require("@/assets/images/bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View style={styles.messagesContainer}>
          {messages.map((message) => {
            return (
              <MessageBubbble
                messageType={message.type}
                message={message.message}
                time={message.time}
              />
            );
          })}
        </View>
        <View style={{ backgroundColor: "white" }}>
          <TextInput  onChangeText={handleChange("message")}/>
         
        </View>
      </View>
    </ImageBackground>
  );
};

export default Chats;

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    shadowColor: "black",
    shadowRadius: 10,
  },
  backButton: {
    width: 30,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  profile: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
  },
  profileText: {
    fontSize: 25,
    fontWeight: "400",
    color: "white",
  },
  headerTextContainer: {
    flexDirection: "column",
    gap: 5,
  },
  headerNameText: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerStatusText: {
    fontSize: 16,
    color: "#02609E",
  },
  background: {
    flex: 1,
  },
  messagesContainer: {
    padding: 10,
    flexDirection: "column",
    gap: 10,
  },
});
