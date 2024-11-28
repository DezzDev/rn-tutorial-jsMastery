import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "@/components/CustomButton";

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center h-full px-4">

          <Image
            source={images.logo}
            style={{ width: 130, height: 84 }}
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            style={{ maxWidth: 380, width: "100%", height: 300 }}
            resizeMode="contain"
          />

          <View className="android:max-w-[300px]">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200 text-3xl font-bold ios:-mt-6">Aora</Text>
            </Text>
            <Image
              source={images.path}
              style={{ width: 136, height: 15 }}
              className="absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center ">
            Where creativity meets innovation: embark on a journey of limitless exploration
          </Text>

          <CustomButton 
            title="Continue with Email" 
            handlePress={() => {
              router.push("/sign-in")
            }} 
            containerStyles="w-full mt-7 max-w-[300px]" 
          />

        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622"/>
    </SafeAreaView>
  )
}

