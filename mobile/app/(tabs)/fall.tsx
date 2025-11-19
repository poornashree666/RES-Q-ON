import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Accelerometer } from "expo-sensors";

export default function FallScreen() {
  const [accel, setAccel] = useState({ x: 0, y: 0, z: 0 });
  const [fallDetected, setFallDetected] = useState(false);

  useEffect(() => {
    Accelerometer.setUpdateInterval(300);

    const sub = Accelerometer.addListener((data) => {
      setAccel(data);

      const magnitude = Math.sqrt(
        data.x * data.x + data.y * data.y + data.z * data.z
      );

      if (magnitude > 2.8) {
        setFallDetected(true);
      }
    });

    return () => sub.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fall Detection</Text>

      <Text style={styles.data}>
        X: {accel.x.toFixed(2)}  Y: {accel.y.toFixed(2)}  Z: {accel.z.toFixed(2)}
      </Text>

      {fallDetected ? (
        <Text style={styles.alert}>🚨 FALL DETECTED!</Text>
      ) : (
        <Text style={styles.normal}>No fall detected</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 30, fontWeight: "bold", marginBottom: 20 },
  data: { fontSize: 18, marginBottom: 20 },
  alert: { fontSize: 26, fontWeight: "bold", color: "red" },
  normal: { fontSize: 18, color: "green" },
});
