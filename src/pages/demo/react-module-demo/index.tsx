import React, {useState} from 'react'
import {
  Button,
  NativeModules,
  NativeSyntheticEvent, StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View
} from 'react-native'
import Color from '@/constants/color'

/** 与原生代码交互 */
export default function ReactModuleDemo() {

  const [text, setText] = useState<string>('')
  const [msg, setMsg] = useState<string>('')

  /** 内容改变事件 */
  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setText(e.nativeEvent.text)
  }

  /** 调用Callback */
  const handleCallback = () => {
    NativeModules.Test.testCallback(text, (msg: string) => {
      setMsg(msg)
    }, (code: number, msg: number) => {
      console.log(code, msg)
      setMsg(code.toString() + ':' + msg)
    })
  }

  /** 调用Promise */
  const handlePromise = () => {
    NativeModules.Test.testPromise(text)
      .then((res: string) => {
        setMsg(res)
      })
      .catch((err: object) => {
        setMsg(JSON.stringify(err))
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <TextInput style={styles.input} placeholder={'输入内容'} value={text} onChange={handleChange} />
      </View>
      <View style={styles.view}>
        <Button title={'调用Callback'} onPress={handleCallback} />
      </View>
      <View style={styles.view}>
        <Button title={'调用Promise'} onPress={handlePromise} />
      </View>
      <View style={styles.view}>
        <Text>{msg}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
  view: {
    margin: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(136, 140, 143, 0.16)'
  },
})
