import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { VictoryPie, VictoryLine, VictoryChart, VictoryTheme } from "victory-native";

export default function Insights() {
  const [dailyData, setDailyData] = useState([]);
  const [summary, setSummary] = useState({ total: 0, avg: 0 });

  useEffect(() => {
    const dummy = [
      { day: "Mon", value: 10 },
      { day: "Tue", value: 15 },
      { day: "Wed", value: 8 },
      { day: "Thu", value: 20 },
      { day: "Fri", value: 12 },
      { day: "Sat", value: 25 },
      { day: "Sun", value: 18 }
    ];

    setDailyData(dummy);

    const total = dummy.reduce((a, b) => a + b.value, 0);
    const avg = total / dummy.length;

    setSummary({ total, avg });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📊 Smart Insights Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weekly Activity Summary</Text>
        <Text>Total Alerts: {summary.total}</Text>
        <Text>Daily Average: {summary.avg.toFixed(2)}</Text>
      </View>

      <Text style={styles.chartTitle}>📈 Activity Trend</Text>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine
          data={dailyData}
          x="day"
          y="value"
          style={{
            data: { stroke: "#0078ff", strokeWidth: 3 }
          }}
        />
      </VictoryChart>

      <Text style={styles.chartTitle}>📊 Distribution</Text>
      <VictoryPie
        data={dailyData}
        x="day"
        y="value"
        colorScale="cool"
        padding={40}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  chartTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  card: {
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
});
