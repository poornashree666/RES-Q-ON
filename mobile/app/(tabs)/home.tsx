import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Vibration } from "react-native";
import * as Location from "expo-location";
import { useRouter } from "expo-router";

export default function PanicScreen() {
  const router = useRouter();
  const [countdown, setCountdown] = useState<number | null>(null);

  // -----------------------------
  // STEP 1 — Start Countdown
  // -----------------------------
  const startCountdown = () => {
    setCountdown(10);
    Vibration.vibrate([500, 500, 500]); // Vibrate pattern
  };

  // -----------------------------
  // STEP 2 — Countdown Logic
  // -----------------------------
  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      sendEmergencyAlert();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  // -----------------------------
  // STEP 3 — Get location + send alert
  // -----------------------------
  const sendEmergencyAlert = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Location permission denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const message =
        `🚨 RESQON ALERT!\n` +
        `User in danger.\n` +
        `Lat: ${location.coords.latitude}\n` +
        `Lon: ${location.coords.longitude}`;

      console.log("🚨 Sending Alert:", message);

      alert("🚨 Emergency Alert Sent!");
    } catch (e) {
      console.log("Error:", e);
      alert("Error sending alert.");
    }
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚨 PANIC BUTTON</Text>
      <Text style={styles.subtitle}>
        Press the button below if you're in danger.
      </Text>

      <TouchableOpacity style={styles.panicButton} onPress={startCountdown}>
        <Text style={styles.panicText}>SOS</Text>
      </TouchableOpacity>

      {countdown !== null && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.countText}>
            Sending alert in <Text style={{ fontWeight: "bold" }}>{countdown}</Text> seconds...
          </Text>

          <TouchableOpacity
            onPress={() => setCountdown(null)}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelText}>CANCEL ALERT</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>GO BACK</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, alignItems: "center" },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 40 },
  panicButton: {
    width: 160,
    height: 160,
    borderRadius: 100,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "red",
    shadowOpacity: 0.7,
    shadowRadius: 20,
  },
  panicText: { color: "#fff", fontSize: 40, fontWeight: "bold" },
  countText: { fontSize: 18 },
  cancelButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#444",
    borderRadius: 8,
  },
  cancelText: { color: "#fff", fontWeight: "bold" },
  backButton: {
    marginTop: 60,
    padding: 12,
    paddingHorizontal: 30,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  backText: { color: "white", fontWeight: "bold" },
});
