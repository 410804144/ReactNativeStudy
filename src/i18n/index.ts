import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import enUs from './locales/en-us'
import zhTw from './locales/zh-tw'

export enum LANGUAGE {
  /** 中文 */
  zh_CN = 'zh_CN',
  /** 英文 */
  en_US = 'en_US',
  /** 繁体 */
  zh_TW = 'zh_TW',
}

/** 初始化国际化数据 */
export function initI18n() {
  return i18n.use(initReactI18next)
    .init({
      resources: {
        [LANGUAGE.en_US]: {
          translation: enUs
        },
        [LANGUAGE.zh_TW]: {
          translation: zhTw
        },
      },
      lng: LANGUAGE.zh_TW,
      fallbackLng: LANGUAGE.zh_TW,
      interpolation: {
        escapeValue: false,
      },
    })
}

/** 更改国际化语言 */
export function changeLang(lang: LANGUAGE) {
  i18n.changeLanguage(lang).then()
}
