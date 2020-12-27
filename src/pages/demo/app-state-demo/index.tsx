import React, {useEffect, useState} from 'react'
import {AppState, AppStateStatus, StyleSheet, Text, View} from 'react-native'
import {Color} from '@/constants'
import moment from 'moment'

/** App状态监听Demo */
export default function AppStateDemo() {

  const [dataList, setDataList] = useState<string[]>([])

  useEffect(() => {
    addData('Start listener')
    addData('Current state: ' + AppState.currentState)
    AppState.addEventListener('change', handleAppStateChange)
    return () => {
      addData('Stop listener')
      AppState.removeEventListener('change', handleAppStateChange)
    }
  }, [])

  /** app状态改变事件 */
  const handleAppStateChange = (state: AppStateStatus) => {
    addData(moment().format('YYYY-MM-DD HH:mm:ss') + ': ' + state)
  }

  /** 添加消息数据 */
  const addData = (data: string) => {
    console.log(data)
    setDataList((dataList) => {
      dataList.push(data)
      return dataList.slice()
    })
  }

  return (
    <View style={styles.container}>
      <Text>{'监听应用程序是处于后台状态，还是激活状态'}</Text>
      <Text>{dataList.join('\n')}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    padding: 4,
  },
})
