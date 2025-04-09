import React from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
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
import My from './view/my'
import Login from './view/login'
export default function App(){
  return(
    <View style={{flex:1}}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* 主界面包含底部导航 */}
          <Stack.Screen 
            name="Main" 
            options={{ headerShown: false }}
          >
            {() => (
              <Tab.Navigator>
                <Tab.Screen 
                  name="首页" 
                  component={Home}
                  options={{
                    headerStyle: { height: 40 },
                    headerTitleAlign: 'center',
                    headerTitle: () => (
                      <Text style={{color: 'red', fontSize: 10}}>qiehuan</Text>
                    )
                  }}
                />
                <Tab.Screen 
                  name="服务" 
                  component={Fuwu}
                  options={{ headerShown: false }}
                />
                {/* 我的页面也保留在底部导航中 */}
                <Tab.Screen 
                  name="我的" 
                  component={My}
                  options={{ headerShown: false }}
                />
              </Tab.Navigator>
            )}
          </Stack.Screen>

          {/* 登录页面独立于底部导航 */}
          <Stack.Screen 
            name="登录" 
            component={Login}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}