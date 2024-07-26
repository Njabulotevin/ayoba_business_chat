import ChatUser, { Status } from "@/components/ChatUser";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.storiesWrapper}>
        <View style={styles.storyWrapper}>
          <View style={styles.story}>
            <Ionicons name="add" size={35} />
          </View>
          <Text
            style={{ textAlign: "center", fontSize: 16, fontWeight: "600" }}
          >
            Add Story
          </Text>
        </View>
      </View>
      <ScrollView >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((user)=>{
          return <ChatUser
          key={user}
          name={"27 78 471 7846"}
          message={"testing message"}
          time={"20:45"}
          status={Status.delivered}
        />
        })}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  story: {
    width: 60,
    height: 60,
    borderRadius: 60,
    borderColor: "#02609E",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  storiesWrapper: {
    padding: 20,
  },
  storyWrapper: {
    width: 60,
    flexDirection: "column",
    gap: 10,
    justifyContent: "center",
  },
});
