import React, { useEffect, useMemo, useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { randomColours } from "@/components/utils/scripts";
import { Ionicons } from "@expo/vector-icons";
import MessageBubble, { MessageType } from "@/components/messageBubble";
import { useFormik } from "formik";
import axios from "axios";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface Message {
  id: number;
  message: string;
  type: MessageType;
  time: string;
}

const Chats = () => {
  const { name } = useLocalSearchParams();
  const navigation = useNavigation();

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

  const [messages, setMessages] = useState<Message[]>([]);
  const [lastMessageId, setLastMessageId] = useState<number | null>(null);
  const [displayedMessageIds, setDisplayedMessageIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const intervalId = setInterval(async () => {
      await startPollingForMessages();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: { message: "" },
    onSubmit: async (values, actions) => {
      const newMessage = {
        id: Date.now(),
        message: values.message,
        type: MessageType.user,
        time: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      try {
        await sendMessage(values.message);
        actions.resetForm();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    },
  });

  const sendMessage = async (message) => {
    let customer_response = await fetchCustomers();
    let customer_language = "zulu";
    customer_language = getLanguageCode(customer_language);
    const translatedMessage = await translateForUser(message, "eng_Latn", customer_language);

    try {
      const response = await axios.post('https://gatewayapi-e65e2b5c01f7.herokuapp.com/api/messages/', {
        msisdns: ["+27827133921"],
        message_type: 'text',
        message_text: translatedMessage,
      });

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      startPollingForMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const startPollingForMessages = async () => {
    try {
      const response = await axios.get('https://gatewayapi-e65e2b5c01f7.herokuapp.com/api/messages/');

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = response.data;
      const latestMessages = await getLatestTextMessages(result);

      if (latestMessages.length > 0) {
        let customer_response = await fetchCustomers();
        let customer_language = "zulu";
        customer_language = getLanguageCode(customer_language);

        const translatedMessages = await Promise.all(
          latestMessages.map(async (message) => {
            const translatedMessage = await translateForUser(message.text, customer_language, "eng_Latn");
            return {
              id: message.id,
              message: translatedMessage,
              type: MessageType.guest,
              time: new Date().toLocaleTimeString(),
            };
          })
        );

        const newMessages = translatedMessages.filter(msg => !displayedMessageIds.has(msg.id));

        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        setLastMessageId(latestMessages[latestMessages.length - 1].id);
        setDisplayedMessageIds(prev => new Set([...prev, ...newMessages.map(msg => msg.id)]));
      }
    } catch (error) {
      console.error("Error polling messages:", error);
    }
  };

  const getLatestTextMessages = async (messages) => {
    return messages.filter(msg => msg.message_type === "text" && (!lastMessageId || msg.id > lastMessageId));
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('https://gatewayapi-e65e2b5c01f7.herokuapp.com/api/customers/');
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching customers:", error);
      return null;
    }
  };

  const getLanguageCode = (customer_language) => {
    const languageCodes = {
      "northern sotho": "nso_Latn",
      "afrikaans": "afr_Latn",
      "southern Sotho": "sot_Latn",
      "swati": "ssw_Latn",
      "tsonga": "tso_Latn",
      "setswana": "tsn_Latn",
      "xhosa": "xho_Latn",
      "zulu": "zul_Latn",
      "swahili": "swh_Latn",
    };
    return languageCodes[customer_language] || "eng_Latn";
  };

  const translateForUser = async (text, sourceLang, targetLang) => {
    const TRANSLATION_URL = "https://vulavula-services.lelapa.ai/api/v1/translate/process";
    const VULAVULA_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM1ZDk1NGU0MzMyMTQ4MzNhNzk0NmM5NmZkMTYyZTdkIiwiY2xpZW50X2lkIjo2NCwicmVxdWVzdHNfcGVyX21pbnV0ZSI6MCwibGFzdF9yZXF1ZXN0X3RpbWUiOm51bGx9.1HchJDhAt2lYrK-dGdpVvDhx7S79DtL5VcFpI-9b7F4";

    const payload = {
      input_text: text,
      source_lang: sourceLang,
      target_lang: targetLang,
    };

    try {
      const response = await axios.post(TRANSLATION_URL, payload, {
        headers: {
          "X-CLIENT-TOKEN": VULAVULA_TOKEN,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        return response.data.translation[0].translation_text;
      } else {
        throw new Error("Failed to translate text");
      }
    } catch (error) {
      console.error("Error translating text:", error);
      return "Error translating text.";
    }
  };

  return (
    <GestureHandlerRootView>
      <ImageBackground
        source={require("@/assets/images/bg.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={{ flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <ScrollView style={styles.messagesContainer}>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                messageType={message.type}
                message={message.message}
                time={message.time}
              />
            ))}
          </ScrollView>
          <View style={{ backgroundColor: "white", flexDirection: "row", gap: 10, padding: 10 }}>
            <TextInput
              placeholder="Type your message..."
              onChangeText={handleChange("message")}
              value={values.message}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                backgroundColor: "#02609E",
                width: 50,
                height: 50,
                borderRadius: 70,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Ionicons name="send-outline" color="white" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </GestureHandlerRootView>
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
  input: {
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    flex: 1,
    borderRadius: 30
  },
});
