import React, {useEffect, useState} from 'react'
import {Image, NativeModules, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Assets from '@/assets'
import Color from '@/constants/color'
import {StackScreenProps} from '@react-navigation/stack'
import {useTranslation} from 'react-i18next'
import {getLanguageItem} from '@/i18n'
import LanguageModal from '@/pages/home/language-modal'
import i18next from 'i18next'

interface IData {
  /** 名称 */
  name: string,
  /** 标题 */
  title: string,
  /** 描述 */
  desc: string,
  /** 跳转地址 */
  url: string,
  /** 是否显示右箭头 */
  showArrow: boolean,
}

export default function Home({navigation}:StackScreenProps<any>) {
  const {t} = useTranslation()
  const [languageVisible, setLanguageVisible] = useState<boolean>(false)
  const [dataList, setDataList] = useState<IData[]>([])

  useEffect(() => {
    initData()
    initVersion()
  }, [i18next.language])

  /** 初始化数据 */
  const initData = () => {
    setDataList([
      {
        name: 'CodePush',
        title: t('热更新'),
        desc: 'Code Push',
        url: 'CodePushDemo',
        showArrow: true,
      },
      {
        name: 'Package',
        title: t('打包'),
        desc: 'Android',
        url: '',
        showArrow: false,
      },
      {
        name: 'Env',
        title: t('环境'),
        desc: process.env.NODE_ENV + '',
        url: '',
        showArrow: false,
      },
      {
        name: 'Module',
        title: t('原生模块'),
        desc: 'Android',
        url: 'ReactModuleDemo',
        showArrow: true,
      },
      {
        name: 'Language',
        title: t('多语言'),
        desc: getLanguageItem()?.text || '',
        url: '',
        showArrow: true,
      },
      {
        name: 'AppState',
        title: t('应用程序状态'),
        desc: '',
        url: 'AppStateDemo',
        showArrow: true,
      },
    ])
  }

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
        name: 'Version',
        title: t('版本号'),
        desc: version,
        url: '',
        showArrow: false,
      })
      return dataList.slice()
    })
  }

  /** item点击事件 */
  const handleClick = (item: any) => {
    const {name, url} = item
    if (name === 'Language') {
      setLanguageVisible(true)
    } else if (url) {
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
              {item.showArrow && <Image style={styles.image} source={Assets.rightArrow} />}
            </View>
          </View>
        </TouchableOpacity>
      ))}
      <LanguageModal
        visible={languageVisible}
        onClose={() => setLanguageVisible(false)}
      />
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
