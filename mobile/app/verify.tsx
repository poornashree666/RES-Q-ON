import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function VerifyScreen() {
  const { confirmation } = useLocalSearchParams();
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const confirmOTP = async () => {
    try {
      const object = JSON.parse(confirmation as string);
      await object.confirm(otp);
      Alert.alert("Success", "Login Successful!");
      router.replace("/(tabs)");
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <TextInput
        placeholder="6-digit OTP"
        keyboardType="number-pad"
        style={styles.input}
        value={otp}
        onChangeText={setOtp}
      />
      <Button title="Verify" onPress={confirmOTP} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30, textAlign: "center" },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
});
