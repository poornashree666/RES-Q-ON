import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function OtpScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  function confirmOtp() {
    if (otp.length < 4) {
      Alert.alert("Invalid OTP", "Enter a valid code");
      return;
    }

    router.replace("/(tabs)"); // go to Home screen after login
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
        placeholder="Enter code"
      />

      <Button title="Verify" onPress={confirmOtp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
});
