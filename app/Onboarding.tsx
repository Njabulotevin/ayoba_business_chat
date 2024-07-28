import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnboardingScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const checkOnboarding = async () => {
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      if (hasSeenOnboarding) {
        router.push('/Products');
      }
    };
    checkOnboarding();
  }, []);

  const completeOnboarding = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    router.push('/Products');
  };

  const DoneButton = ({ ...props }) => (
    <TouchableOpacity style={styles.doneButton} {...props} onPress={()=> router.push("/(tabs)")}>
      <Text style={styles.doneButtonText}>Done</Text>
    </TouchableOpacity>
  );

  return (
    <Onboarding
      DoneButtonComponent={DoneButton}
      onSkip={completeOnboarding}
      onDone={completeOnboarding}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} />,
          title: 'Welcome to Our App',
          subtitle: 'Here is a brief introduction to our app.',
        },
        {
          backgroundColor: '#fe6e58',
          image: <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} />,
          title: 'Add Products',
          subtitle: 'Easily add new products to your list.',
        },
        {
          backgroundColor: '#999',
          image: <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.image} />,
          title: 'Manage Invoices',
          subtitle: 'Keep track of your invoices and manage them efficiently.',
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
  },
  doneButton: {
    marginRight: 10,
  },
  doneButtonText: {
    fontSize: 16,
    color: '#000',
  },
});
