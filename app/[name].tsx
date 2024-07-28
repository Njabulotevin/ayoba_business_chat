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
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: { message: "" },
    onSubmit: async (values, actions) => {
      console.log(values);
      const newMessage = {
        id: Date.now(), // Temporarily use current timestamp as ID
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

  const sendMessage = async (message: string) => {
    let customer_response = await fetchCustomers();
    console.log("Current Customer: ", customer_response);
    let customer_language = "zulu";
    customer_language = getLanguageCode(customer_language);
    const customer_choice = await translateForUser(message, "eng_Latn", customer_language);

    try {
      // Send the message to the server
      const response = await axios.post('https://gatewayapi-e65e2b5c01f7.herokuapp.com/api/messages/', {
        msisdns: ["+27827133921"], // Ensure this is properly formatted
        message_type: 'text',
        message_text: customer_choice,
      });

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Start polling for a response
      startPollingForMessages();

    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const startPollingForMessages = async () => {
    try {
      // Fetch messages from the server
      const response = await axios.get('https://gatewayapi-e65e2b5c01f7.herokuapp.com/api/messages/');

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = response.data;
      const latestMessages = await getLatestTextMessages(result);

      if (latestMessages.length > 0) {
        let customer_response = await fetchCustomers();
        console.log("Current Customer: ", customer_response);
        let customer_language = "zulu";
        customer_language = getLanguageCode(customer_language);

        const translatedMessages = await Promise.all(
          latestMessages.map(async (message) => {
            const translatedMessage = await translateForUser(message.text, customer_language, "eng_Latn");
            return {
              id: message.id, // Use message ID from the server
              message: translatedMessage,
              type: MessageType.guest,
              time: new Date().toLocaleTimeString(),
            };
          })
        );

        // Filter out messages that have already been displayed
        const newMessages = translatedMessages.filter(msg => !displayedMessageIds.has(msg.id));

        // Update the state with the new messages
        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        setLastMessageId(latestMessages[latestMessages.length - 1].id);
        setDisplayedMessageIds(prev => new Set([...prev, ...newMessages.map(msg => msg.id)]));
      }

    } catch (error) {
      console.error("Error polling messages:", error);
    }
  };

  const getLatestTextMessages = async (messages: any[]) => {
    console.log("LATEST MESSAGES:", messages);

    // Filter messages that are of type 'text' and are new
    const textMessages = messages.filter(msg => msg.message_type === "text" && (!lastMessageId || msg.id > lastMessageId));

    return textMessages;
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

  const getLanguageCode = (customer_language: string) => {
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

  const translateForUser = async (text: string, config: string, choice: string) => {
    // Validate the input
    console.log("Translating: ", text, choice);
    if (!text || !choice) {
      console.error("Text and language choice are required.");
      return;
    }

    // Define the endpoint URL (update with your actual endpoint if necessary)
    const endpoint = 'https://gatewayapi-e65e2b5c01f7.herokuapp.com/api/translate/';

    // Create the payload
    const payload = {
      text: text,
      choice: choice,
      config: config,
    };

    try {
      // Send the POST request to the translation endpoint
      const response = await axios.post(endpoint, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if the response is ok
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response
      const result = response.data;

      // Display or return the translated text
      console.log("Translated Text:", result.translated_text);
      return result.translated_text;

    } catch (error) {
      // Handle any errors
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
                key={message.id} // Use message ID as the key
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
