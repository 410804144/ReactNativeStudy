import React, {useEffect, useRef, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Color} from '@/constants'
import {StackScreenProps} from '@react-navigation/stack'

/** 禁止返回上一页 */
export default function ForbidBackDemo({navigation}: StackScreenProps<any>) {

  const [msg, setMsg] = useState<string>('进入页面后，10秒内不能返回上一页')
  const secondRef = useRef<number>(10)

  useEffect(() => {
    navigation.addListener('beforeRemove', handleBeforeRemove)

    const intervalId = setInterval(() => {
      if (secondRef.current > 0) {
        secondRef.current -= 1
      } else {
        clearInterval(intervalId)
      }
    }, 1000)
    return () => {
      clearInterval(intervalId)
      navigation.removeListener('beforeRemove', handleBeforeRemove)
    }
  }, [])

  /** 返回上一页事件 */
  const handleBeforeRemove = (e: any) => {
    if (secondRef.current > 0) {
      e.preventDefault()
      setMsg('还有' + secondRef.current + '秒才能返回上一页')
    }
  }

  return (
    <View style={styles.container}>
      <Text>{msg}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
})
