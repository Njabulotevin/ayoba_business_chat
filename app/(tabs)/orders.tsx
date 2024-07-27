import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const Orders = () => {
  return (
    <View>
      <Text>O</Text>
      <Button onPress={()=>router.push("/OrderDetails")} title='OrderD'></Button>
    </View>
  )
}

export default Orders

const styles = StyleSheet.create({})