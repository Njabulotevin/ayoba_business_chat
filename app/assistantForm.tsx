import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import OutlineInput from "@/components/common/OutlineInput";
import PrimaryButton from "@/components/common/PrimaryButton";
import { useConvertToAssistant } from "@/services/hooks/accounts";
import { handleRequestError } from "@/services/handleRequestError";

const AssistantForm = () => {
  const [title, setTitle] = useState("");
  const { mutate, isError, isPending, error } = useConvertToAssistant();
  const handleSubmit = async () => {
    console.log(title);
    mutate({ title: title, userType: "assistant" });
    try {
    //   const res = await fetch(
    //     "https://bd06-41-169-13-10.ngrok-free.app/api/v1/assistant",
    //     {
    //       method: "POST",
    //       body: JSON.stringify({ title: title, userType: "assistant" }),
    //       credentials: "include",
    //     }
    //   );
      handleRequestError(error);
    //   console.log(res.status);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ flexDirection: "column", gap: 20, padding: 10 }}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
          Apply to be an assistant
        </Text>
        <Text style={{ textAlign: "center" }}>You will receive requests</Text>
      </View>

      <View style={{ flexDirection: "column", gap: 10 }}>
        <OutlineInput
          title={"Title"}
          placeholder="Enter title i.e Dr or Mr"
          isError={undefined}
          error={undefined}
          onChangeText={(text) => setTitle(text)}
          value={title}
        />
        <PrimaryButton
          disabled={isPending}
          title={isPending ? "Loading" : "Submit"}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default AssistantForm;

const styles = StyleSheet.create({});
