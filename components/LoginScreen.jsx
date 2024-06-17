import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Colors } from "@/constants/Colors";
import React from "react";
import { Link, useNavigation } from "expo-router";
// import * as WebBrowser from "expo-web-browser";

// import { useOAuth } from "@clerk/clerk-expo";
// import { useWarmUpBrowser } from "./../hooks/useWarmUpBrowser";

// -----------creark--------------

// WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("Root");
  };
  // ----------creark-----------

  // useWarmUpBrowser();

  // const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  // const onPress = React.useCallback(async () => {
  //   try {
  //     const { createdSessionId, signIn, signUp, setActive } =
  //       await startOAuthFlow();

  //     if (createdSessionId) {
  //       setActive({ session: createdSessionId });
  //     } else {

  //     }
  //   } catch (err) {
  //     console.error("OAuth error", err);
  //   }
  // }, []);

  return (
    <View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <Image
          source={require("./../assets/images/into.gif")}
          style={{
            width: 220,
            height: 450,
            borderRadius: 20,
            borderLeftWidth: 6,
            shadowOpacity: 0.36,
            shadowRadius: 6.68,
            elevation: 11,
            borderColor: "back",
          }}
        ></Image>
      </View>
      {/* ----------text --- */}
      <View>
        <Text
          style={{
            textAlign: "center",
            color: "",
            fontSize: 30,
            fontFamily: "outfit-bold",
          }}
        >
          Welcome to our comunity{" "}
          <Text
            style={{
              color: Colors.PRIMARY,
            }}
          >
            Business Hunting
          </Text>
        </Text>
        <Text style={styles.subtitle}>
          Find out the best amazing business and post latest business at moment
          for better way
        </Text>
        <Link href={"/tabs"}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 30,
                color: "white",
                fontFamily: "outfit",
              }}
            >
              {" "}
              Let's Go Start
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  subtitle: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 15,
    fontSize: 18,
    fontFamily: "outfit",
    alignItems: "center",
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    borderBottomColor: "#fff",
    borderRadius: 20,
    width: "fit",
    padding: 6,
    borderLeftWidth: 6,
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
  },
});
