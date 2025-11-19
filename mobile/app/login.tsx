import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const sendOtp = () => {
    if (phone.length < 10) {
      alert("Enter valid phone number");
      return;
    }
    alert("OTP sent (use 1234)");
    setStep(2);
  };

  const verifyOtp = () => {
    if (otp === "1234") {
      router.replace("/(tabs)/home");
    } else {
      alert("Wrong OTP. Try 1234.");
    }
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <>
          <Text style={styles.title}>RESQON Login</Text>
          <TextInput
            placeholder="Enter Phone Number"
            keyboardType="number-pad"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
          />
          <Button title="Send OTP" onPress={sendOtp} />
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.title}>Enter OTP</Text>
          <TextInput
            placeholder="1234"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
            style={styles.input}
          />
          <Button title="Verify OTP" onPress={verifyOtp} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 18,
  }
});

