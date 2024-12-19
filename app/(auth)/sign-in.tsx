import { View, Text, ScrollView, Image, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { signIn } from '@/api/auth'
import { useAuthContext } from '@/context/AuthProvider'


export default function SignIn() {
  const { isLoggedIn, login } = useAuthContext()

  const platform = Platform.OS

  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const submit = async () => {
    if (!form.email || !form.password) {
      if (platform === "web") {
        alert("Please fill all fields")
      } else {
        Alert.alert("Error", "Please fill all fields")
      }
      return
    }
    setIsLoading(true)

    try {
      
      await login({ email: form.email, password: form.password })
      
      if (isLoggedIn) {
        router.replace("/home")
      }
      
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error", error.message)
        if (platform === "web") {
          alert(error.message)
        } else {
          Alert.alert("Error", error.message)
        }
      }else{
        if (platform === "web") {
          alert("An unexpected error occurred")
        } else {
          Alert.alert("Error", "An unexpected error occurred")
        }

        console.error("Error", "An unexpected error occurred")
      }
    }finally{ 
      setIsLoading(false)
    }


    
  }

  return (
    <SafeAreaView className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className='flex-1 px-4 mb-6 mt-10 space-y-6'>
          <Image
            source={images.logo}
            style={{ width: 115, height: 35 }}
            resizeMode='contain'
          />
          <Text className='text-white text-2xl font-semibold mt-10 font-psemibold'>
            Log in to Aora
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType='email-address'
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Log in"
            handlePress={submit}
            containerStyles="w-full mt-7 max-w-[300px] mx-auto"
            isLoading={isLoading}
          />

          <View className='justify-center items-center flex-row pt-5 gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have an accont?
            </Text>
            <Link className='text-secondary-200 font-psemibold' href="/sign-up">Sing up</Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}