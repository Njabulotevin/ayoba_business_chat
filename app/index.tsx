import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React ,{ useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';


const Index = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
  return (
    <View style={styles}>
    <Text style={styles}>Login</Text>
    <TextInput
      style={styles}
      placeholder="Username"
      value={username}
      onChangeText={setUsername}
    />
    <TextInput
      style={styles}
      placeholder="Password"
      value={password}
      onChangeText={setPassword}
      secureTextEntry
    />
    <View style={styles}>
      <TouchableOpacity style={styles}>
        <Text style={styles}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles}>
        <Text style={styles}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles} disabled>
        <Text style={styles}>Forgot Password</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default Index

const styles = StyleSheet.create({})