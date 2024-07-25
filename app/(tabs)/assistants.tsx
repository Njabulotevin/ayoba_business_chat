import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PrimaryButton from "@/components/common/PrimaryButton";
import { router } from "expo-router";

const Assistants = () => {
  return (
    <View style={{flexDirection: "column", justifyContent: "space-between" , flex: 1, padding: 10}}>
      <View>
        <Text>Assistants List</Text>
      </View>

      <View>
        <PrimaryButton title="Become Assistant" onPress={()=>router.push("/assistantForm")}/>
      </View>
    </View>
  );
};

export default Assistants;

const styles = StyleSheet.create({});
