import { Ionicons } from "@expo/vector-icons";
import React, { ReactNode, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ModalProps,
  GestureResponderEvent,
  TextProps,
} from "react-native";
import PrimaryButton from "./PrimaryButton";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

interface CustomModalProps extends ModalProps {
  message: string;
  onPress: (event: GestureResponderEvent) => void;
  icon: ReactNode;
  buttonTitle: string;
}

const CenteredModal = ({
  message,
  onPress,
  buttonTitle,
  icon,
  ...rest
}: CustomModalProps) => {
  const [isModalShown, setIsModalShown] = useState(true);

  return (
    <Modal {...rest} transparent style={{ marginVertical: "auto", top: 50 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            minHeight: 200,
            padding: 20,
            borderRadius: 10,
            gap: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: "black",
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
              marginHorizontal: "auto",
            }}
          >
            {icon as ReactNode}
          </View>
          <Text style={{ fontSize: 18 , textAlign: "center"}}>{message}</Text>
          <PrimaryButton title={buttonTitle} onPress={onPress} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default CenteredModal;
