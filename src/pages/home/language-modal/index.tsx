import React, {useEffect, useState} from 'react'
import {Modal} from '@/components'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {useTranslation} from 'react-i18next'
import Assets from '@/assets'
import {changeLanguage, getLanguageList, ILanguage} from '@/i18n'
import {Color} from '@/constants'

interface IProps {
  visible: boolean
  onClose: () => void
}

/** 国际化语言切换 */
export default function LanguageModal(props: IProps) {

  const {t} = useTranslation()
  const [dataList, setDataList] = useState<ILanguage[]>([])

  useEffect(() => {
    setDataList(getLanguageList())
  }, [])

  /** 点击关闭事件 */
  const handleClose = (): void => {
    props.onClose?.()
  }

  /** 点击item事件 */
  const handleClick = (item: ILanguage): void => {
    changeLanguage(item.name)
    props.onClose?.()
  }

  return (
    <Modal visible={props.visible} onClose={props.onClose} maskStyle={styles.maskStyle}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t('切换语言')}</Text>
          <TouchableOpacity onPress={handleClose}>
            <Image style={styles.headerClose} source={Assets.close} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          {dataList.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleClick(item)}>
              <View style={styles.item}>
                <Text style={styles.itemText}>{item.text}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  maskStyle: {
    justifyContent: 'flex-end',
  },
  container: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Color.background,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Color.line,
    borderBottomWidth: 1,
  },
  headerText: {
    flex: 1,
    fontSize: 16,
    color: Color.text,
    fontWeight: '700',
    marginLeft: 16,
  },
  headerClose: {
    margin: 16,
    width: 20,
    height: 20,
  },
  content: {

  },
  item: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 14,
    color: Color.text,
    fontWeight: '500',
  },
})
