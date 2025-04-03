import React from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView
} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
//创建路由导航器
let Stack = createNativeStackNavigator()
//创建底部导航器
let Tab = createBottomTabNavigator()
//导入页面组件
import Home from './view/Home'
import Fuwu from './view/fuwu'

export default function App(){
  return(
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="首页" component={Home}/>
        <Tab.Screen name="服务" component={Fuwu}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
  
}