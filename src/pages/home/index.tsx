import React from 'react'
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Assets from '@/assets'
import Color from '@/constants/color'
import {StackScreenProps} from '@react-navigation/stack'

export default function Home({navigation}:StackScreenProps<any>) {
  const dataList = [
    {
      title: 'CodePush',
      desc: '热更新',
      url: '',
    },
    {
      title: 'Package',
      desc: 'Android和iOS打包',
      url: '',
    }
  ]

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
