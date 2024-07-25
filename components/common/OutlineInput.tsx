import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface InputProps extends TextInputProps {
  title: string;
  isError: boolean | undefined;
  error: string | undefined;
}

const OutlineInput = ({
  title,
  isError,
  error,
  onChangeText,
  ...rest
}: InputProps) => {
  return (
    <View style={{ gap: 5, width: "100%" }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 500,
          color: isError ? "red" : "black",
        }}
      >
        {title}
      </Text>
      <TextInput
        {...rest}
        style={[
          styles.input,
          { borderColor: isError ? "red" : Colors.gray.border },
        ]}
        onChangeText={onChangeText}
      />
      {isError && (
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: "red",
              width: 16,
              height: 16,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
            }}
          >
            <Ionicons name="alert-outline" color={"red"} size={10} />
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "red",
            }}
          >
            {error}
          </Text>
        </View>
      )}
    </View>
  );
};

export default OutlineInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    width: "100%",
    fontSize: 20,
  },
});
