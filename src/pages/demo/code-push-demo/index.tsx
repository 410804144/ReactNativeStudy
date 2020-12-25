import React, {useState} from 'react'
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native'
import CodePush, {DownloadProgress} from 'react-native-code-push'
import Color from '@/constants/color'

/** Code Push 更新 */
export default function CodePushDemo() {

  const [msg, setMsg] = useState<string>('')

  /** 检查更新事件 */
  const handleCheckUpdate = () => {
    setMsg('Check update.')
    CodePush.checkForUpdate().then((res) => {
      if (res) {
        setMsg(JSON.stringify(res))
      } else {
        setMsg('App up to date.')
      }
    })
  }

  /** 更新事件 */
  const handleUpdate = () => {
    setMsg('Update.')
    CodePush.sync(
      {},
      codePushStatusDidChange,
      codePushDownloadDisProgress,
    ).then()
  }


  /** 状态改变事件 */
  const codePushStatusDidChange = (syncStatus: CodePush.SyncStatus) => {
    switch(syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        setMsg('Checking for update.')
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        setMsg('Downloading package.')
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        setMsg('Awaiting user action.')
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        setMsg('Installing update.')
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        setMsg('App up to date.')
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        setMsg('Update canceled by user.')
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        setMsg('Update installed and will be applied on restart.')
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        setMsg('An unknown error occurred.')
        break;
    }
  }

  /** 下载进度 */
  const codePushDownloadDisProgress = (progress: DownloadProgress) => {
    setMsg('progress: ' + progress.receivedBytes + '/' + progress.totalBytes)
  }

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button title={'Check Update'} onPress={handleCheckUpdate} />
      </View>
      <View style={styles.button}>
        <Button title={'Update App'} onPress={handleUpdate} />
      </View>
      <ScrollView style={styles.scroll}>
        <Text>{msg}</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
  button: {
    marginTop: 5,
  },
  scroll: {
    margin: 5,
  },
})
