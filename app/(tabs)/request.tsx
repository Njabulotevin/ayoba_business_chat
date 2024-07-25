import { Modal, StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import Map from "@/components/Map";
import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import { Colors } from "@/constants/Colors";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";

const Request = () => {
  const firstAidLevels = [
    {
      level: "Basic First Aid",
      description:
        "Includes general first aid skills such as CPR, wound care, and basic knowledge of medical emergencies. Ideal for individuals who want to be prepared for common accidents and injuries.",
    },
    {
      level: "Advanced First Aid",
      description:
        "Involves more comprehensive skills like advanced CPR techniques, management of more severe injuries and conditions, and usage of medical equipment like AEDs. Suitable for individuals looking to provide higher-level care.",
    },
    {
      level: "First Responder",
      description:
        "Training designed for professional responders such as police, fire, and emergency medical personnel. Includes advanced emergency care techniques, patient assessment, and stabilization skills.",
    },
    {
      level: "Emergency Medical Technician (EMT)",
      description:
        "Focuses on the skills necessary to work as part of an emergency medical response team. Includes patient assessment, advanced airway management, and transportation of patients.",
    },
    {
      level: "Paramedic",
      description:
        "The highest level of pre-hospital emergency care. Includes extensive medical knowledge, advanced life support skills, medication administration, and the ability to make complex medical decisions.",
    },
    {
      level: "Wilderness First Aid",
      description:
        "Specialized training for providing medical care in remote or wilderness settings. Includes survival skills, treatment of environmental injuries, and prolonged care techniques.",
    },
    {
      level: "Pediatric First Aid",
      description:
        "Focused on the care and management of infants and children. Covers topics like pediatric CPR, choking, and common childhood injuries and illnesses.",
    },
    {
      level: "Mental Health First Aid",
      description:
        "Provides skills to help someone experiencing a mental health crisis. Includes understanding mental health issues, providing initial support, and guiding individuals to appropriate professional help.",
    },
  ];

  const RequestButtons = () => (
    <View
      style={{
        backgroundColor: "white",
        paddingVertical: 20,
        flexDirection: "column",
        gap: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
    >
      <PrimaryButton title={"Request Ambulance"} />
      <SecondaryButton
        title={"Request Health Assistant"}
        onPress={() => {
          setRequestView("healthOptions");
        }}
      />
    </View>
  );

  const HealthOptions = () => (
    <View
      style={{
        backgroundColor: "white",
        paddingVertical: 20,
        flexDirection: "column",
        gap: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
    >
      <View
        style={{
          // borderBottomColor: Colors.gray.border,
          // borderBottomWidth: 1,
          // paddingVertical: 10,
        }}
      >
        <Text style={{ textAlign: "center" }}>Choose Level of Assistant</Text>
      </View>
      <GestureHandlerRootView style={{}}>
        <ScrollView
          style={{ display: "flex", gap: 10, flexDirection: "column" }}
        >
          {firstAidLevels.map((level) => (
            <View
              key={level.level}
              style={{
                marginVertical: 10,
                borderColor: Colors.gray.border,
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
                flexDirection: "column",
                gap: 10,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ width: "80%" }}>
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    {level.level}
                  </Text>
                  <Text style={{color: Colors.gray.text}}>{level.description}</Text>
                </View>
                <View>
                  <Ionicons name="people-outline" color="black" size={20} />
                  <Text>30 Available</Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 10,
                  maxWidth: "100%",
                }}
              >
                <PrimaryButton title="Select Level" />
              </View>
            </View>
          ))}
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  );

  const [requestView, setRequestView] = useState("requestButton");
  const snapPoints = useMemo(() => ["25%", "50", "70%"], []);
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <GestureHandlerRootView>
        {/* <Map /> */}
        <BottomSheet index={1} snapPoints={snapPoints}>
          <View style={{ padding: 10 }}>
            {requestView == "requestButton" ? (
              <RequestButtons />
            ) : (
              <HealthOptions />
            )}
          </View>
        </BottomSheet>
      </GestureHandlerRootView>
    </View>
  );
};

export default Request;

const styles = StyleSheet.create({});
