import i18next from 'i18next'
import {initReactI18next} from 'react-i18next'
import enUs from './locales/en-us'
import zhTw from './locales/zh-tw'
import storage from '@/storage'

export enum LANGUAGE {
  /** 中文 */
  zh_CN = 'zh_CN',
  /** 英文 */
  en_US = 'en_US',
  /** 繁体 */
  zh_TW = 'zh_TW',
}

export interface ILanguage {
  /** 语言名称 */
  name: LANGUAGE
  /** 内容 */
  text: string
}

/** 获取所有语言 */
export function getLanguageList(): ILanguage[] {
  return [
    {
      name: LANGUAGE.zh_CN,
      text: '简体中文',
    },
    {
      name: LANGUAGE.zh_TW,
      text: '繁體中文',
    },
    {
      name: LANGUAGE.en_US,
      text: 'English',
    }
  ]
}



/** 初始化国际化数据 */
export async function initI18n() {
  const defaultLanguage = LANGUAGE.zh_TW
  i18next.use(initReactI18next)
      .init({
        resources: {
          [LANGUAGE.en_US]: {
            translation: enUs
          },
          [LANGUAGE.zh_TW]: {
            translation: zhTw
          },
        },
        lng: defaultLanguage,
        fallbackLng: defaultLanguage,
        interpolation: {
          escapeValue: false,
        },
      })
    .then(() => {
      // 从缓存中获取设置的语言
      storage.getItem('language')
        .then((res) => {
          if (res) {
            changeLanguage(res)
          }
        })
    })
}

/** 更改国际化语言 */
export function changeLanguage(lang: LANGUAGE) {
  storage.setItem('language', lang).then()
  i18next.changeLanguage(lang).then()
}

/** 获取当前语言 */
export function getLanguageItem(): ILanguage | undefined {
  return getLanguageList().find(item => item.name.toString() === i18next.language)
}
