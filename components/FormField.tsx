import { View, Text, KeyboardTypeOptions, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import icons from '@/constants/icons'

interface FormFieldProps {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (e: string) => void;
  otherStyles: string;
  keyboardType?: KeyboardTypeOptions;
}

export default function FormField({ title, value, handleChangeText, otherStyles, keyboardType, placeholder }: FormFieldProps) {

  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)


  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>
        {title}
      </Text>

      <View className={`w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl flex-row items-center justify-between ${isFocused ? "ios:border-secondary android:border-secondary" : ""}`}>
        <TextInput
          className='flex-1 h-full text-white text-base font-psemibold'
          placeholder={placeholder}
          value={value}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={showPassword ? icons.eye : icons.eyeHide} style={{width: 20, height: 20}} resizeMode='contain'/>
          </TouchableOpacity>
        )}
      </View>

    </View>
  )
} 