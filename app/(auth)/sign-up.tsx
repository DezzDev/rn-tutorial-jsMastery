import { View, Text, ScrollView, Image, Alert, Platform, } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '@/api/auth'
import { useAuthContext } from '@/context/AuthProvider'

export default function SignUp() {

  const { login } = useAuthContext()

  const platform = Platform.OS

  const [form, setForm] = useState({
    username: "",
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

      await createUser({ email: form.email, password: form.password })
      router.replace("/sign-in")

    } catch (error: unknown) {
      console.error(error)
      if (error instanceof Error) {
        Alert.alert("Error", error.message)
      } else {
        Alert.alert("Error", "An unexpected error occurred")
      }
    } finally {
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
            Sign up to Aora
          </Text>

          {/* <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            keyboardType='default'
          /> */}

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
            keyboardType='default'
          />

          <CustomButton
            title="Sign up"
            handlePress={submit}
            containerStyles="w-full mt-7 max-w-[300px] mx-auto"
            isLoading={isLoading}
          />

          <View className='justify-center items-center flex-row pt-5 gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Have an account already?
            </Text>
            <Link className='text-secondary-200 font-psemibold' href="/sign-in">Sign in</Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}