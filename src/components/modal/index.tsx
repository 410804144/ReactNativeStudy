import React from 'react'
import {Modal as RNModal, StyleSheet, TouchableOpacity} from 'react-native'
import Color from '@/constants/color'

interface IProps {
  /** 样式 */
  style?: object,
  /** 是否可见 */
  visible: boolean
  /** 是否可以点击阴影关闭弹窗 */
  maskClosable?: boolean
  /** 遮罩层样式 */
  maskStyle?: object
  /** 动画类型 */
  animationType?: 'none' | 'slide' | 'fade'
  /** 关闭 */
  onClose?: () => void
  /** 弹框内容 */
  children: any
}

Modal.defaultProps = {
  maskClosable: false,
}

/** Modal弹窗 */
export default function Modal(props: IProps) {

  /** 点击阴影 */
  const handleMask = () => {
    if (props.maskClosable) {
      props.onClose?.()
    }
  }

  return (
    <RNModal
      style={[styles.modal, props.style]}
      transparent={true}
      visible={props.visible}
      animationType={props.animationType}
    >
      <TouchableOpacity
        style={[styles.mask, props.maskStyle]}
        activeOpacity={1}
        onPress={handleMask}
      >
        {props.children}
      </TouchableOpacity>
    </RNModal>
  )
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  mask: {
    flex: 1,
    backgroundColor: Color.mask,
  },
})
