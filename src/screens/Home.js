import { View, Text, StyleSheet, StatusBar, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileButton from "../components/ProfileButton";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

export default function Home({ navigation }) {
  const { logOut, currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const logOuthandler = async () => {
    try {
      setLoading(true);
      await logOut();
      Alert.alert("Log out", "Log out successfully!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Sign in", error.message);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/*================ header ====================*/}
        <View style={styles.header}>
          <View style={styles.headerBox}>
            {/* <View style={styles.imgContainer}>
              <Image
                source={require("../assets/account.jpg")}
                style={styles.img}
                resizeMode="contain"
              />
            </View> */}
            <View style={styles.headerText}>
              <Text style={styles.title}>Welcome{currentUser?.name} </Text>
              <Text style={{ color: "black" }}>{currentUser?.email} </Text>

              <View style={{ marginVertical: 10 }}>
                <ProfileButton
                  onPress={logOuthandler}
                  title={loading ? "Loading..." : "Log out"}
                  disabled={loading}
                  bg="#bb180a"
                />
              </View>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 5,
              paddingTop: 20,
            }}
          >
            <ProfileButton bg="#0d0d0d" title="View Profile" />
            <ProfileButton title="Add User" />
          </View>
        </View>
        {/*============== User List =======================*/}
        <View
          style={{
            height: "auto",
            flex: 1,
            paddingVertical: 5,
          }}
        >
          <Text>Home</Text>
        </View>
        {/*================ header ====================*/}
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    // paddingTop: 10,
    paddingTop: 2,
  },
  header: {
    width: "100%",
    height: 230,
    backgroundColor: "#e8e8f1",
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  headerBox: {
    width: "100%",
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  imgContainer: {
    width: 130,
    height: 130,
    backgroundColor: "white",
    borderRadius: 100,
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  headerText: {},
  title: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "black",
  },
});
