import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function RootLayout() {
  return (
    <View className="flex-1 items-center justify-center">
      <StatusBar style="auto" />
      <Text className="text-4xl font-pblack">Index</Text>
      <Link 
        href="./home"
        className="text-blue-500 underline"
      >Go to Home</Link>
    </View>
  )
}

  