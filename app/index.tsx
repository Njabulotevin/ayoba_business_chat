import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React ,{ useState } from 'react';;
import Input from '@/components/Input';
import { router } from 'expo-router';


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
      <TouchableOpacity style={styles}>
        <Text style={styles} onPress={()=>router.push("/(tabs)")}>Login</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default Index

const styles = StyleSheet.create({})