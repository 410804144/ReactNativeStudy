import React from 'react'
import Pages from '@/pages'
import CodePush from 'react-native-code-push'

function App() {
  return (
    <Pages />
  )
}

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL
}

export default CodePush(codePushOptions)(App)




