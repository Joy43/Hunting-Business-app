import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../authprovider/AuthProvider";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { signIn } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptcha(captcha);
  };

  const handleLogin = async () => {
    try {
      const result = await signIn(email, password);
      Toast.show({
        type: "success",
        text1: "User Login Successful",
      });
      navigation.navigate("home");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login Error",
        text2: error.message,
      });
    }
  };

  const handleValidateCaptcha = (value) => {
    setDisabled(value !== captcha);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign-in</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.captchaContainer}>
        <Text style={styles.captchaText}>{captcha}</Text>
        <TouchableOpacity onPress={generateCaptcha}>
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Type the captcha above"
        value={captchaInput}
        onChangeText={(text) => {
          setCaptchaInput(text);
          handleValidateCaptcha(text);
        }}
      />
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: disabled ? "#ccc" : "#1e90ff" },
        ]}
        onPress={handleLogin}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    margin: 10,
    shadowRadius: 10,
    backgroundColor: "#f9fafd",
    shadowColor: "blue",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  captchaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  captchaText: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
  },
  refreshText: {
    marginLeft: 10,
    color: "#1e90ff",
    fontWeight: "bold",
  },
  button: {
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  link: {
    color: "#1e90ff",
    fontWeight: "bold",
    marginLeft: 5,
  },
});
