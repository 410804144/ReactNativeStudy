import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Home from '@/pages/home'
import CodePushDemo from '@/pages/demo/code-push-demo'
import ReactModuleDemo from '@/pages/demo/react-module-demo'
import {useTranslation} from 'react-i18next'
import Welcome from '@/pages/welcome'
import AppStateDemo from '@/pages/demo/app-state-demo'
import ForbidBackDemo from '@/pages/demo/forbid-back-demo'

export default function Pages() {
  const {t} = useTranslation()
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Welcome'}>
        <Stack.Screen name={'Welcome'} component={Welcome} options={{headerShown: false}} />
        <Stack.Screen name={'Home'} component={Home} options={{title: t('首页')}}/>
        <Stack.Screen name={'CodePushDemo'} component={CodePushDemo} options={{title: t('热更新')}} />
        <Stack.Screen name={'ReactModuleDemo'} component={ReactModuleDemo} options={{title: t('原生模块')}} />
        <Stack.Screen name={'AppStateDemo'} component={AppStateDemo} options={{title: t('应用程序状态')}} />
        <Stack.Screen name={'ForbidBackDemo'} component={ForbidBackDemo} options={{title: t('禁止返回上一页')}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
