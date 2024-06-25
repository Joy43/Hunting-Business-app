import React from "react";
import { Text, TextInput, Button, View, Alert, StyleSheet } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      Alert.alert("Error", "Clerk is not loaded yet. Please try again.");
      return;
    }

    if (!emailAddress || !password) {
      Alert.alert("Error", "Email and Password are required.");
      return;
    }

    try {
      console.log("Attempting sign-up with:", { emailAddress, password });

      const signUpResult = await signUp.create({
        emailAddress,
        password,
      });

      console.log("Sign-up result:", signUpResult);

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err) {
      console.error("Sign-up error:", JSON.stringify(err, null, 2));
      Alert.alert(
        "Sign-up Error",
        err.errors ? err.errors[0]?.message : "An unknown error occurred."
      );
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      Alert.alert("Error", "Clerk is not loaded yet. Please try again.");
      return;
    }

    if (!code) {
      Alert.alert("Error", "Verification code is required.");
      return;
    }

    try {
      console.log("Attempting email verification with code:", code);

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      console.log("Email verification result:", completeSignUp);

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        // Redirect to home or another screen as needed
        // router.replace('/');
      } else {
        console.error(
          "Email verification incomplete:",
          JSON.stringify(completeSignUp, null, 2)
        );
      }
    } catch (err) {
      console.error("Email verification error:", JSON.stringify(err, null, 2));
      Alert.alert(
        "Verification Error",
        err.errors ? err.errors[0]?.message : "An unknown error occurred."
      );
    }
  };

  return (
    <View style={styles.container}>
      {!pendingVerification ? (
        <>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email"
            onChangeText={setEmailAddress}
            style={styles.inputField}
          />
          <TextInput
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={setPassword}
            style={styles.inputField}
          />
          <Button title="Sign Up" onPress={onSignUpPress} color="#6c47ff" />
        </>
      ) : (
        <>
          <TextInput
            value={code}
            placeholder="Verification Code"
            onChangeText={setCode}
            style={styles.inputField}
          />
          <Button
            title="Verify Email"
            onPress={onPressVerify}
            color="#6c47ff"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f0f0f5",
  },
  inputField: {
    marginVertical: 10,
    height: 50,
    borderWidth: 1,
    borderColor: "#6c47ff",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
});
