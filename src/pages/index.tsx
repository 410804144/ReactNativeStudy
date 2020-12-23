import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Home from '@/pages/home'
import CodePushDemo from '@/pages/demo/code-push-demo'

export default function Pages() {
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen name={'Home'} component={Home} options={{title: '首页'}}/>
        <Stack.Screen name={'CodePushDemo'} component={CodePushDemo} options={{title: 'Code Push'}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
