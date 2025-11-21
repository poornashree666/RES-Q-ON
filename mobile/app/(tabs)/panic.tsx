import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Vibration,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SMS from "expo-sms";   // ✅ added

export default function PanicScreen() {
  const router = useRouter();
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    let timer;

    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
        Vibration.vibrate(200);
      }, 1000);
    } else if (countdown === 0) {
      sendSOS();
      setCountdown(null);
    }

    return () => clearTimeout(timer);
  }, [countdown]);

  // 📩 SEND LOCAL SMS USING expo-sms
  const sendLocalSMS = async (contacts, lat, lon) => {
    const isAvailable = await SMS.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert("SMS Not Supported", "Your device cannot send SMS.");
      return;
    }

    const numbers = contacts.map((c) => c.phone);
    const messageText = `🚨 RESQON SOS ALERT 🚨
User: user123
Reason: panic-button
Location: https://maps.google.com/?q=${lat},${lon}`;

    try {
      await SMS.sendSMSAsync(numbers, messageText);
      console.log("📩 Local SMS sent");
    } catch (err) {
      console.log("❌ SMS error:", err);
    }
  };

  const sendSOS = async () => {
    try {
      const saved = await AsyncStorage.getItem("trustedContacts");
      const contacts = saved ? JSON.parse(saved) : [];

      if (contacts.length === 0) {
        Alert.alert("No Contacts", "Please add at least one trusted contact.");
        return;
      }

      const lat = 13.0083622;
      const lon = 76.1166922;

      const SERVER_URL = "http://127.0.0.1:3000/api/sos"; // your termux server

      // 🔥 1) Send to your server (Termux)
      fetch(SERVER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: "user123",
          reason: "panic-button",
          contacts,
          lat,
          lon,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Server response:", data))
        .catch((err) => console.log("Server error:", err));

      // 🔥 2) Send SMS directly to contacts
      await sendLocalSMS(contacts, lat, lon);

      Alert.alert("SOS Sent", "Emergency alerts have been delivered.");
    } catch (err) {
      console.log("❌ SOS ERROR:", err);
      Alert.alert("Error", "Failed to send SOS.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚨 PANIC BUTTON</Text>
      <Text style={styles.subtitle}>Press SOS if you're in danger.</Text>

      {countdown !== null ? (
        <View style={styles.countdownBox}>
          <Text style={styles.countText}>{countdown}</Text>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setCountdown(null)}
          >
            <Text style={styles.cancelText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.sosButton}
          onPress={() => setCountdown(10)}
        >
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
      )}

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
