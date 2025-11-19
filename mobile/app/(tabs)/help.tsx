import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import * as Location from "expo-location";

export default function HelpDetector() {
  const [listening, setListening] = useState(false);
  const recordingRef = useRef<Audio.Recording | null>(null);

  useEffect(() => {
    startListening();
    return () => stopListening();
  }, []);

  const startListening = async () => {
    setListening(true);
    try {
      await Audio.requestPermissionsAsync();

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      recordingRef.current = recording;

      checkAudioLevel();
    } catch (err) {
      console.log("Mic error:", err);
    }
  };

  const stopListening = async () => {
    setListening(false);
    try {
      if (recordingRef.current) {
        await recordingRef.current.stopAndUnloadAsync();
      }
    } catch {}
  };

  // -------------------------------
  // AUDIO ANALYSIS LOOP
  // -------------------------------
  const checkAudioLevel = async () => {
    if (!recordingRef.current) return;

    setInterval(async () => {
      try {
        const status = await recordingRef.current!.getStatusAsync();
        if (!status.isRecording) return;

        // LOUDNESS THRESHOLD (adjust if needed)
        const loudEnough = status.metering > -10;

        if (loudEnough) {
          console.log("Heard loud sound!");

          // Optional: you can add ML processing,
          // for hackathon this is enough.
          triggerAlert();
        }
      } catch {}
    }, 1500);
  };

  // --------------------------------
  // SEND LOCATION AFTER "HELP"
  // --------------------------------
  const triggerAlert = async () => {
    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      const loc = await Location.getCurrentPositionAsync();
      alert(
        `🚨 HELP detected!\nLat: ${loc.coords.latitude}\nLon: ${loc.coords.longitude}`
      );
    } catch (e) {
      alert("Error getting location");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎤 HELP Voice Detection</Text>
      <Text style={styles.subtitle}>
        Listening for loud HELP-like sounds…
      </Text>

      <Text style={styles.status}>
        Status: {listening ? "Listening…" : "Stopped"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  subtitle: { fontSize: 16, opacity: 0.7 },
  status: { marginTop: 40, fontSize: 18, fontWeight: "600" },
});
