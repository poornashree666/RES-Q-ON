import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      {/* EXPLORE */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />

      {/* FALL DETECTION */}
      <Tabs.Screen
        name="fall"
        options={{
          title: "Fall",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="figure.walk.motion" color={color} />
          ),
        }}
      />

      {/* HELP VOICE DETECTION */}
      <Tabs.Screen
        name="help"
        options={{
          title: "Help",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="mic.fill" color={color} />
          ),
        }}
      />

      {/* BREATHING DETECTION (NEW) */}
      <Tabs.Screen
        name="BreathingScreen"
        options={{
          title: "Breathing",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="waveform.path.ecg" color={color} />
          ),
        }}
      />

      {/* LIVE LOCATION */}
      <Tabs.Screen
        name="live"
        options={{
          title: "Location",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="location.fill" color={color} />
          ),
        }}
      />

      {/* INSIGHTS AI DASHBOARD (NEW) */}
      <Tabs.Screen
  name="insights"
  options={{
    title: "Insights",
    tabBarIcon: ({ color }) => (
      <IconSymbol size={28} name="chart.bar.doc.horizontal.fill" color={color} />
    ),
  }}
/>


      {/* PANIC SCREEN */}
      <Tabs.Screen
        name="panic"
        options={{
          title: "Panic",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="exclamationmark.triangle.fill" color={color} />
          ),
        }}
      />

      {/* TRUSTED CONTACTS */}
      <Tabs.Screen
        name="trusted"
        options={{
          title: "Trusted",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.2.fill" color={color} />
          ),
        }}
      />

      {/* CAMERA SCREEN */}
      <Tabs.Screen
        name="CameraScreen"
        options={{
          title: "Camera",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="camera.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
