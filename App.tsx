import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';

// 导入页面组件
import Home from './view/Home';
import Fuwu from './view/fuwu';
import My from './view/my';
import Login from './view/login';
import More from './xzx/More';
import People from './xzx/People';
import Objected from './xzx/Objected';
// 创建导航器
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 1. 先定义底部导航组件
function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="首页" 
        component={Home}
        options={{
          headerStyle: { height: 40 },
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen 
        name="服务" 
        component={Fuwu}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="我的" 
        component={My}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

// 自定义 More 页面以控制底部导航栏的显示
function MoreScreen({ navigation }: any) {
  const isFocused = useIsFocused(); // 判断当前页面是否处于焦点状态

  React.useEffect(() => {
    if (isFocused) {
      navigation.setOptions({
        headerShown: false,
      });
    }
  }, [isFocused, navigation]);

  return <More />;
}

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* 主界面：显示底部导航 */}
          <Stack.Screen 
            name="MainTabs" 
            component={MainTabs} 
            options={{ headerShown: false }} 
          />

          {/* More页面：保持底部导航栏可见 */}
          <Stack.Screen 
            name="More" 
            component={More}
            options={{
              headerShown: false,
              presentation: 'containedModal'
            }} 
          />
          {/* {人员关怀} */}
          <Stack.Screen 
            name="People" 
            component={People}
            options={{
              headerShown: false,
              presentation: 'containedModal'
            }} 
          />
          {/* {具体关怀页面} */}
          <Stack.Screen 
            name="Objected" 
            component={Objected}
            options={{
              headerShown: false,
              presentation: 'containedModal'
            }} 
          />
          {/* 登录页面：全屏无底部栏 */}
          <Stack.Screen 
            name="登录" 
            component={Login} 
            options={{ headerShown: false }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}