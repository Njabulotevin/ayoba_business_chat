import React, { useEffect, useMemo, useState } from 'react';
import { Button, ImageBackground, Pressable, StyleSheet, Text, View, TextInput, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { randomColours } from '@/components/utils/scripts';
import { Ionicons } from '@expo/vector-icons';
import MessageBubble, { MessageType } from '@/components/messageBubble';
import { useFormik } from 'formik';
import axios from 'axios';

interface Message {
  message: String;
  type: MessageType;
  time: String;
}

const Support = () => {
  const navigation = useNavigation();

  const headerComponent = useMemo(
    () => (
      <View style={styles.headerContainer}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={25} />
        </Pressable>
        <View style={[styles.profile, { backgroundColor: randomColours() }]}>
          <Text style={styles.profileText}>AI</Text>
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerNameText}>AI Support</Text>
          <Text style={styles.headerStatusText}>Online</Text>
        </View>
      </View>
    ),
    []
  );

  useEffect(() => {
    navigation.setOptions({
      header: () => headerComponent,
    });

    console.log('AI Support');
  }, [navigation, headerComponent]);

  const [messages, setMessages] = useState<Message[]>([
    {
      message: 'Hello! How can I assist you today?',
      type: MessageType.guest,
      time: '10:00',
    },
  ]);

  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: { message: '' },
    onSubmit: async (values, actions) => {
      const userMessage = values.message.trim();
      const time = new Date().toLocaleTimeString().slice(0, 5);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: userMessage,
          type: MessageType.user,
          time,
        },
      ]);

      try {
        const response = await axios.post('https://gatewayapi-e65e2b5c01f7.herokuapp.com/customer-assistance/queries/', 
          { query: userMessage },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const result = response.data;

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: result.response,
            type: MessageType.guest,
            time: new Date().toLocaleTimeString().slice(0, 5),
          },
        ]);
      } catch (error) {
        console.error('Fetch error:', error);
        Alert.alert('Error', `An unexpected error occurred. ${error.response ? error.response.data.message : error.message}`);
      }

      actions.resetForm();
    },
  });

  return (
    <ImageBackground
      source={require('@/assets/images/bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <ScrollView style={styles.messagesContainer}>
          {messages.map((message, index) => (
            <MessageBubble key={index} messageType={message.type} message={message.message} time={message.time} />
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('message')}
            value={values.message}
            placeholder="Type your message..."
          />
          <Button onPress={handleSubmit as () => void} title="Send" />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Support;

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'black',
    shadowRadius: 10,
  },
  backButton: {
    width: 30,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
  },
  profileText: {
    fontSize: 25,
    fontWeight: '400',
    color: 'white',
  },
  headerTextContainer: {
    flexDirection: 'column',
  },
  headerNameText: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerStatusText: {
    fontSize: 16,
    color: '#02609E',
  },
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
  },
});
