import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Vibration, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function PanicScreen() {
  const router = useRouter();
  const [countdown, setCountdown] = useState<number | null>(null);

  // ⏳ Countdown effect
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
        Vibration.vibrate(200);
      }, 1000);
    } 
    else if (countdown === 0) {
      sendAlert();
      setCountdown(null);
    }

    return () => clearTimeout(timer);
  }, [countdown]);

  // 🚨 Simulated Alert Sending
  const sendAlert = () => {
    Alert.alert(
      "🚨 Alert Sent",
      "Your SOS alert has been sent to your trusted contacts (demo).",
      [{ text: "OK" }]
    );
  };

  // 🟥 Start SOS
  const startSOS = () => {
    setCountdown(10);
    Vibration.vibrate([200, 200, 200]);
  };

  // ❌ Cancel SOS
  const cancelSOS = () => {
    setCountdown(null);
    Alert.alert("Cancelled", "SOS alert cancelled.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚨 PANIC BUTTON</Text>
      <Text style={styles.subtitle}>Press the button below if you're in danger.</Text>

      {/* If countdown is active */}
      {countdown !== null ? (
        <View style={styles.countdownBox}>
          <Text style={styles.countText}>{countdown}</Text>
          <Text style={{ color: "red", marginBottom: 10 }}>Sending alert in {countdown}s</Text>

          <TouchableOpacity style={styles.cancelButton} onPress={cancelSOS}>
            <Text style={styles.cancelText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // 🛑 Main SOS button
        <TouchableOpacity style={styles.sosButton} onPress={startSOS}>
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
      )}

      {/* Go back */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>GO BACK</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", paddingTop: 70 },
  title: { fontSize: 30, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 40, color: "#555" },

  sosButton: {
    backgroundColor: "red",
    width: 180,
    height: 180,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  sosText: { color: "white", fontSize: 45, fontWeight: "bold" },

  countdownBox: { alignItems: "center" },
  countText: { fontSize: 60, fontWeight: "bold", color: "red" },

  cancelButton: {
    marginTop: 20,
    backgroundColor: "#222",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 10,
  },
  cancelText: { color: "white", fontSize: 18 },

  backButton: {
    marginTop: 50,
    backgroundColor: "#007AFF",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
  },
  backText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
