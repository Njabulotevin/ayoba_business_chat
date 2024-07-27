import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React ,{ useState } from 'react';;
import Input from '@/components/Input';
import { router } from 'expo-router';
import PrimaryButton from '@/components/Button';


const Index = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
  return (
    <View style={styles}>
    <Text style={styles}>Login</Text>
    <Input
              style={styles}
              placeholder="Username"
              value={username}
              onChangeText={setUsername} title={''} isError={undefined} error={undefined}    />
    <Input
              style={styles}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry title={''} isError={undefined} error={undefined}    />
    <View style={styles}>
      <PrimaryButton title="login" onPress={()=>router.push("/(tabs)")}/>
    </View>
  </View>
  )
}

export default Index

const styles = StyleSheet.create({})