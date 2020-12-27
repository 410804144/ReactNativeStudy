import AsyncStorage from '@react-native-async-storage/async-storage'

/** storage 缓存数据 */
export default {
  /** 获取item */
  getItem: async (key: string): Promise<any> => {
    const item = await AsyncStorage.getItem(key)
    return item === null ? null : JSON.parse(item)
  },
  /** 设置item */
  setItem: (key: string, value: any): Promise<void> => {
    return AsyncStorage.setItem(key, JSON.stringify(value))
  },
  /** 移除item */
  removeItem: (key: string): Promise<void> => {
    return AsyncStorage.removeItem(key)
  }
}
