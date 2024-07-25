import DefaultModal from "@/components/common/DefaultModal";
import OutlineInput from "@/components/common/OutlineInput";
import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import { Colors } from "@/constants/Colors";
import { apiClient } from "@/services/api";
import { handleRequestError } from "@/services/handleRequestError";
import { useLogin, useRegisterUser } from "@/services/hooks/accounts";
import { Ionicons } from "@expo/vector-icons";
import axios, { AxiosError } from "axios";
import { router, useNavigation } from "expo-router";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
  TextInput,
} from "react-native-gesture-handler";

export default function Index() {
  const { mutate, isError, error, data, isPending, isSuccess } =
    useRegisterUser();

  const [isModalShown, setIsModalShown] = useState(false);

  function showToast(message: string) {
    ToastAndroid.show(message, ToastAndroid.LONG);
  }

  const { values, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      firstName: "",
      middlename: "",
      lastName: "",
      email: "",
      password: "",
      userType: "general",
      idType: "",
      idNumber: "",
      insurance: "",
      insuranceId: "",
    },
    onSubmit: (values) => {
      try {
        mutate({ ...values, email: values.email.trim().toLowerCase() });
        console.log(values);
        if (!isPending && isError) {
          handleRequestError(error);
        }

        if (isError) {
          showToast("Something Went wrong!");
        }
      } catch (err: any) {
        handleRequestError(err);
      }
    },
  });

  const signUpFields = [
    {
      name: "firstName",
      placeholder: "First Name",
      value: values.firstName,
      type: "text",
    },
    {
      name: "lastName",
      placeholder: "Last Name",
      value: values.lastName,
      type: "text",
    },
    { name: "email", placeholder: "Email", value: values.email, type: "text" },
    {
      name: "password",
      placeholder: "Password",
      value: values.password,
      type: "password",
    },
    {
      name: "idType",
      placeholder: "ID Type",
      value: values.idType,
      type: "dropDown",
    },
    {
      name: "idNumber",
      placeholder: "ID Number",
      value: values.idNumber,
      type: "text",
    },
    {
      name: "insurance",
      placeholder: "Insurance",
      value: values.insurance,
      type: "text",
    },
    {
      name: "insuranceId",
      placeholder: "Insurance ID",
      value: values.insuranceId,
      type: "text",
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      router.push("/(tabs)/home");
      resetForm();
    }

    if (isError) {
      setIsModalShown(true);
    }
  }, [isSuccess, isPending, isError]);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerStyle: { padding: 20, paddingBottom: 30 },
      headerTitle: () => (
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            width: "100%",
            paddingBottom: 20,
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold", width: "100%" }}>
            Create Account
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 500,
              width: "100%",
              color: Colors.gray.text,
            }}
          >
            Start By Creating an Account
          </Text>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <GestureHandlerRootView>
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            gap: 10,
            padding: 10,
          }}
        >
          <DefaultModal
            visible={isModalShown}
            message={"Oops! Something went wrong while creating an account"}
            onPress={() => setIsModalShown(false)}
            icon={<Ionicons name="alert-outline" size={30} />}
            buttonTitle={"Try Again"}
          />
          {signUpFields.map((field) => {
            if (field.type == "password") {
              return (
                <OutlineInput
                  title={field.placeholder}
                  value={field.value}
                  placeholder={field.placeholder}
                  onChangeText={handleChange(field.name)}
                  isError={undefined}
                  error={undefined}
                  secureTextEntry
                  key={field.name}
                />
              );
            } else if (field.type == "dropDown") {
              return (
                <OutlineInput
                  key={field.name}
                  title={field.placeholder}
                  value={field.value}
                  placeholder={field.placeholder}
                  onChangeText={handleChange(field.name)}
                  isError={undefined}
                  error={undefined}
                />
              );
            } else {
              return (
                <OutlineInput
                  key={field.name}
                  title={field.placeholder}
                  value={field.value}
                  placeholder={field.placeholder}
                  onChangeText={handleChange(field.name)}
                  isError={undefined}
                  error={undefined}
                />
              );
            }
          })}

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
            title={isPending ? "Loading" : "Sign Up"}
            onPress={() => handleSubmit()}
          />
          <Text style={{ fontSize: 14, width: "100%", textAlign: "center" }}>
            Already have an account?
          </Text>

          <SecondaryButton title={"Sign In"} onPress={() => router.back()} />
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.gray.border,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    width: "100%",
    fontSize: 20,
  },

  loginPrimary: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    borderBlockColor: Colors.light.tint,
    borderWidth: 1,
  },
});
