import { StyleSheet, Text, View } from 'react-native'
import { SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import "../global.css"
import { useEffect } from 'react'

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync()

const RootLayout = () => {

  const [fontsLoaded,error] = useFonts({
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
  })

  useEffect(() => {
    if(error) throw error
    // Hide the splash screen after the fonts have loaded
    if(fontsLoaded) SplashScreen.hideAsync()
  },[fontsLoaded,error])

  if(!fontsLoaded && !error) return null

  return (
   <Stack>
    <Stack.Screen name='index' options={{headerShown: false}}/>
   </Stack>
  )
}

export default RootLayout
