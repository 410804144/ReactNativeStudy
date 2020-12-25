import React from 'react'
import Pages from '@/pages'
import CodePush from 'react-native-code-push'
import {initI18n} from '@/i18n'

initI18n().then()

function App() {
  return (
    <Pages />
  )
}

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL
}

export default CodePush(codePushOptions)(App)




