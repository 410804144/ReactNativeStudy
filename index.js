/**
 * @format
 */

import {AppRegistry} from 'react-native'
import {name as appName} from './app.json'
import Pages from '@/pages'
import 'react-native-gesture-handler'

AppRegistry.registerComponent(appName, () => Pages)
