import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import React, { ReactNode } from "react";
import { Colors } from "@/constants/Colors";

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string | ReactNode;
}

const SecondaryButton = ({ title, onPress, ...rest }: PrimaryButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: Colors.light.tint,
    borderWidth: 1,
  },
  text: { color: Colors.light.tint, fontSize: 20, fontWeight: "500" },
});
