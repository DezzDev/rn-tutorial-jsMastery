import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

interface CustomButtonProps {
  title: string,
  handlePress: () => void,
  containerStyles?: string,
  textStyles?: string,
  isLoading?: boolean
}

export default function CustomButton({ title, handlePress, containerStyles, isLoading, textStyles }: CustomButtonProps) {
  return (
    <TouchableOpacity 
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles}
       ${isLoading ? "opacity-50" : ""}`}
      onPress={handlePress}
      activeOpacity={0.7} 
      disabled={isLoading}
    >
      
      <Text className={`text-primary text-semibold text-lg px-4 ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}