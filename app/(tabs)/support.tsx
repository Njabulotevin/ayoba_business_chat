import React, { useEffect, useMemo, useState } from 'react';
import { Button, ImageBackground, Pressable, StyleSheet, Text, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { randomColours } from '@/components/utils/scripts';
import { Ionicons } from '@expo/vector-icons';
import MessageBubble, { MessageType } from '@/components/messageBubble';
import { useFormik } from 'formik';
import { useGetMessages, useSendMessage } from '@/services/hooks/messages';

interface Message {
  message: String;
  type: MessageType;
  time: String;
}

const Support = () => {
  const navigation = useNavigation();
  const { mutate, isError, error, isSuccess } = useSendMessage();

  const { data } = useGetMessages();

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

  useEffect(() => {
    console.log(data);
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      message: 'Hello! How can I assist you today?',
      type: MessageType.guest,
      time: '10:00',
    },
  ]);

  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: { message: '' },
    onSubmit: (values, actions) => {
      console.log(values);
      setMessages([
        ...messages,
        {
          message: values.message,
          type: MessageType.user,
          time: '10:40',
        },
      ]);

      mutate({
        msisdns: ['+27648917936'],
        message_type: 'text',
        message_text: values.message,
      });
      actions.resetForm();
    },
  });

  return (
    <ImageBackground
      source={require('@/assets/images/bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={{ flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
        <View style={styles.messagesContainer}>
          {messages.map((message, index) => (
            <MessageBubble key={index} messageType={message.type} message={message.message} time={message.time} />
          ))}
        </View>
        <View style={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', padding: 10 }}>
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
  messagesContainer: {
    padding: 10,
    flexDirection: 'column',
    gap: 10,
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
