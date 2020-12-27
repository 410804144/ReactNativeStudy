import React, {useEffect} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {useTranslation} from 'react-i18next'
import {Color} from '@/constants'
import {StackScreenProps} from '@react-navigation/stack'

/** 欢迎页 */
export default function Welcome({navigation}: StackScreenProps<any>) {

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.replace('Home')
    }, 2000)
    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  const {t} = useTranslation()
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('欢迎')}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    color: Color.text,
    fontWeight: '700',
  },
})
