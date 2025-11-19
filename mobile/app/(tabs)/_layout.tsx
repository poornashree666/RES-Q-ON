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
          title: "Fall Detection",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="figure.walk.motion" color={color} />
          ),
        }}
      />

      {/* HELP VOICE DETECTION */}
      <Tabs.Screen
        name="help"
        options={{
          title: "HELP Detect",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="mic.fill" color={color} />
          ),
        }}
      />

      {/* LIVE LOCATION */}
      <Tabs.Screen
        name="live"
        options={{
          title: "Live Location",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="location.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
