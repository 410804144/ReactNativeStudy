import React, {useEffect, useState} from 'react'
import {Image, NativeModules, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Assets from '@/assets'
import Color from '@/constants/color'
import {StackScreenProps} from '@react-navigation/stack'
import {useTranslation} from 'react-i18next'

interface IData {
  title: string,
  desc: string,
  url: string
}

export default function Home({navigation}:StackScreenProps<any>) {
  const {t} = useTranslation()
  const [dataList, setDataList] = useState<IData[]>([
    {
      title: t('热更新'),
      desc: 'Code Push',
      url: 'CodePushDemo',
    },
    {
      title: t('打包'),
      desc: 'Android',
      url: '',
    },
    {
      title: t('环境'),
      desc: process.env.NODE_ENV + '',
      url: '',
    },
    {
      title: t('原生模块'),
      desc: 'Android',
      url: 'ReactModuleDemo',
    },
  ])

  useEffect(() => {
    initVersion()
  }, [])

  /** 初始化版本信息 */
  const initVersion = () => {
    NativeModules.AppVersion.getAppVersion((version: string) => {
      setVersion(version)
    }, (code: number, desc: string) =>{
      console.error(code, desc)
      setVersion(t('未知'))
    })
  }

  /** 设置版本号 */
  const setVersion = (version: string) => {
    setDataList(dataList => {
      dataList.push({
        title: t('版本号'),
        desc: version,
        url: ''
      })
      return dataList.slice()
    })
  }

  /** item点击事件 */
  const handleClick = (item: any) => {
    const {url} = item
    if (url) {
      navigation.navigate(url)
    }
  }

  return (
    <ScrollView style={styles.container}>
      {dataList.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => handleClick(item)}>
          <View style={styles.itemWrapper}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
            <View style={styles.imageWrapper}>
              {!!item.url && <Image style={styles.image} source={Assets.rightArrow} />}
            </View>
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
  imageWrapper: {
    width: 12,
  },
  image: {
    width: 12,
    height: 12,
  },
})
