import OutlineInput from "@/components/common/OutlineInput";
import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import DefaultModal from "@/components/common/DefaultModal";
import { Colors } from "@/constants/Colors";
import { apiClient } from "@/services/api";
import { handleRequestError } from "@/services/handleRequestError";
import { useLogin } from "@/services/hooks/accounts";
import { ErrorData } from "@/types/error";
import { Ionicons } from "@expo/vector-icons";
import axios, { AxiosError } from "axios";
import { router } from "expo-router";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
  Button,
  GestureResponderEvent,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";

export default function Index() {
  const [reqErr, setReqErr] = useState("Oops! Something went wrong");
  const { mutate, isError, error, data, isPending, isSuccess } = useLogin();

  const [isModalShown, setIsModalShown] = useState(false);

  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async (values) => {
      try {
        mutate({ ...values, email: values.email.trim().toLowerCase() });

        if (!isPending && isError) {
          const err = handleRequestError(error);
          setReqErr(err?.data?.message);
        }
      } catch (err: any) {
        const errr = handleRequestError(err);
        setReqErr(err?.data?.message);
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      router.push("/(tabs)/home");
      resetForm();
    }
    if (isError) {
      setReqErr(error.data ? error.data.message : "Oops! Something Went wrong");
      setIsModalShown(true);
    }
  }, [isSuccess, isPending, isError]);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: 10,
      }}
    >
      <DefaultModal
        visible={isModalShown}
        message={reqErr}
        onPress={() => setIsModalShown(false)}
        icon={<Ionicons name="alert-outline" size={30} />}
        buttonTitle={"Try Again"}
      />

      <Text style={{ fontSize: 30, fontWeight: "bold", width: "100%" }}>
        Sign In
      </Text>

      <OutlineInput
        title="Email"
        placeholder="Email"
        onChangeText={handleChange("email")}
        isError={isError}
        error={"Incorrect Email"}
      />
      <OutlineInput
        title="Password"
        placeholder="Password"
        secureTextEntry
        onChangeText={handleChange("password")}
        isError={isError}
        error={"Incorrect Password"}
      />

      <View>
        <Text
          style={{
            fontSize: 14,
            width: "100%",
            textAlign: "center",
            fontWeight: "bold",
            color: Colors.light.tint,
          }}
        >
          Forgot Password?
        </Text>
      </View>

      <PrimaryButton
        title={isPending ? "Loading" : "Sign In"}
        onPress={() => handleSubmit()}
        // onPress={() => router.push("/(tabs)/home")}
      />
      <Text style={{ fontSize: 14, width: "100%", textAlign: "center" }}>
        Don't have an account?
      </Text>

      <SecondaryButton
        title="Sign Up"
        onPress={() => router.push("/sign-up")}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
