import React, {useEffect, useState} from 'react'
import {Image, NativeModules, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Assets from '@/assets'
import Color from '@/constants/color'
import {StackScreenProps} from '@react-navigation/stack'

interface IData {
  title: string,
  desc: string,
  url: string
}

export default function Home({navigation}:StackScreenProps<any>) {

  const [dataList, setDataList] = useState<IData[]>([
    {
      title: 'CodePush',
      desc: '热更新',
      url: 'CodePushDemo',
    },
    {
      title: 'Package',
      desc: 'Android和iOS打包',
      url: '',
    },
    {
      title: 'Env',
      desc: process.env.NODE_ENV + '',
      url: '',
    },
    {
      title: 'React Module',
      desc: '原生代码交互',
      url: 'ReactModuleDemo',
    },
  ])

  useEffect(() => {
    initVersion()
  }, [])

  /** 初始化版本信息 */
  const initVersion = () => {
    NativeModules.AppVersion.getAppVersion((version: string) => {
      console.log(version)
      setDataList(dataList => {
        console.log(dataList)
        dataList.push({
          title: 'Version',
          desc: version,
          url: ''
        })
        return dataList.slice()
      })
    }, (code: number, desc: string) =>{
      console.log(code, desc)
      setDataList(dataList => {
        dataList.push({
          title: 'Version',
          desc: '未知',
          url: ''
        })
        return dataList.slice()
      })
    })
  }

  /** item点击事件 */
  const handleClick = (item: any) => {
    const {url} = item
    if (url) {
      navigation.navigate(url)
    } else {
      console.log('功能制作中...')
    }
  }

  return (
    <ScrollView style={styles.container}>
      {dataList.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => handleClick(item)}>
          <View style={styles.itemWrapper}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
            <Image style={styles.image} source={Assets.rightArrow} />
          </View>
        </TouchableOpacity>
      ))
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
  itemWrapper: {
    flexDirection: 'row',
    height: 42,
    marginHorizontal: 16,
    borderBottomColor: Color.line,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    color: Color.text,
    fontWeight: '500',
  },
  desc: {
    flex: 1,
    textAlign: 'right',
    marginHorizontal: 4,
    fontSize: 10,
    color: Color.contentText,
    fontWeight: '400',
  },
  image: {
    width: 12,
    height: 12,
  },
})
