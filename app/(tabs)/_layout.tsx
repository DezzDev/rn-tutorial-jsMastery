import { View, Text, Image, ImageSourcePropType } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants'

interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View className='items-center justify-center gap-1 text-center min-w-[60px] '>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        style={{
          height: 24,
          width: 24
        }}
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>
        {name}
      </Text>
    </View>
  )
}

export default function TabsLayout() {
  return (
    <>
      <Tabs 
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#ffa001",
        tabBarInactiveTintColor: "#cdcde0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopWidth: 1,
          borderTopColor: "#232533",
          height: 84,
        }
      }}>

        {/* home */}
        <Tabs.Screen name="home" options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              focused={focused}
              icon={icons.home}
              name={"Home"}
            />
          )
        }} />   

        {/* bookmark */}
        <Tabs.Screen name="bookmark" options={{
          title: 'Bookmark',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              focused={focused}
              icon={icons.bookmark}
              name={"Bookmark"}
            />
          )
        }}/>  

         {/* create */}
        <Tabs.Screen name="create" options={{
          title: 'Create',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              focused={focused}
              icon={icons.plus}
              name={"Create"}
            />
          )
        }} />  

        {/* profile */}
        <Tabs.Screen name="profile" options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              focused={focused}
              icon={icons.profile}
              name={"Profile"}
            />
          )
        }} />
        

      </Tabs>

    </>
  )
}