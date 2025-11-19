import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Location from "expo-location";

export default function LiveLocationScreen() {
  const [location, setLocation] = useState<any>(null);
  const [watching, setWatching] = useState(false);
  const [watcher, setWatcher] = useState<any>(null);

  // Start Live Location
  const startLiveLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied");
      return;
    }

    setWatching(true);

    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 30000, // every 30 seconds
        distanceInterval: 0,
      },
      (loc) => {
        setLocation(loc.coords);
        console.log("📍 New Location:", loc.coords);
      }
    );

    setWatcher(subscription);
  };

  // Stop Live Location
  const stopLiveLocation = () => {
    if (watcher) watcher.remove();
    setWatching(false);
    setLocation(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Live Location Sharing</Text>

      {location ? (
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.text}>Latitude: {location.latitude}</Text>
          <Text style={styles.text}>Longitude: {location.longitude}</Text>
        </View>
      ) : (
        <Text style={styles.text}>Location not active</Text>
      )}

      {!watching ? (
        <TouchableOpacity style={styles.startBtn} onPress={startLiveLocation}>
          <Text style={styles.btnText}>START LIVE LOCATION</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.stopBtn} onPress={stopLiveLocation}>
          <Text style={styles.btnText}>STOP LOCATION</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  text: { fontSize: 18, marginBottom: 10 },
  startBtn: {
    padding: 15,
    backgroundColor: "green",
    borderRadius: 10,
  },
  stopBtn: {
    padding: 15,
    backgroundColor: "red",
    borderRadius: 10,
  },
  btnText: { color: "#fff", textAlign: "center", fontSize: 16 },
});
