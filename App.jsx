import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  // Alert,
  Modal,
  StyleSheet,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//创建路由导航器
let Stack = createNativeStackNavigator();
//创建底部导航器
let Tab = createBottomTabNavigator();
//导入页面组件
import Home from './view/Home';
import Fuwu from './view/fuwu';
import My from './view/my';
import Login from './view/login';
import PassManagement from './view/PassManagement';
import PassQRcode from './view/PassQRcode';
import PassQRcodeSet from './view/PassQRcodeSet';
import PassQRcodeRecord from './view/PassQRcodeRecord';
import QRcodeSet from './view/QRcodeSet';

const HeaderRight = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{ marginRight: 15 }}
      >
        <Text style={{ color: '#3399FF' }}>更多操作</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>更多操作</Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>全部启用</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.disableButton]}>
              <Text style={styles.actionText}>全部禁用</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
              <Text style={styles.actionText}>全部删除</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>关闭</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  modalTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  disableButton: {
    backgroundColor: '#FF9800',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  closeText: {
    color: '#333',
    fontSize: 16,
  },
});
import More from './xzx/More';
import People from './xzx/People';
import Objected from './xzx/Objected';
import AddPeople from './xzx/AddPeople';
import XinZeng from './xzx/XinZeng';
// 创建导航器

// 1. 先定义底部导航组件
// function MainTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen 
//         name="首页" 
//         component={Home}
//         options={{
//           headerStyle: { height: 40 },
//           headerTitleAlign: 'center',
//         }}
//       />
//       <Tab.Screen 
//         name="服务" 
//         component={More}
//         options={{ headerShown: false }}
//       />
//       <Tab.Screen 
//         name="我的" 
//         component={My}
//         options={{ headerShown: false }}
//       />
//     </Tab.Navigator>
//   );
// }

// 自定义 More 页面以控制底部导航栏的显示
// function MoreScreen({ navigation }: any) {
//   const isFocused = useIsFocused(); // 判断当前页面是否处于焦点状态

//   React.useEffect(() => {
//     if (isFocused) {
//       navigation.setOptions({
//         headerShown: false,
//       });
//     }
//   }, [isFocused, navigation]);

//   return <More />;
// }

export default function App() {
  return (
    <View style={{ flex: 1 }}>
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
                    headerStyle: { height: 100 },
                    headerTitleAlign: 'center',
                    headerTitle: () => (
                      <Text style={{ color: 'red', fontSize: 10 }}>首页</Text>
                    )
                  }}
                />
                <Tab.Screen
                  name="服务"
                  component={Fuwu}
                  options={{
                    headerStyle: { height: 100 },
                    headerTitleAlign: 'center',
                    headerTitle: () => (
                      <Text style={{ color: 'red', fontSize: 10 }}>首页</Text>
                    )
                  }}
                />
                {/* 我的页面也保留在底部导航中 */}
                <Tab.Screen
                  name="我的"
                  component={My}
                  options={{
                    headerStyle: { height: 100 },
                    headerTitleAlign: 'left',
                    headerTitle: () => (
                      <Text style={{ color: 'red', fontSize: 10 }}>  </Text>
                    )
                  }}
                />
              </Tab.Navigator>
            )}
          </Stack.Screen>

          {/* 登录页面独立于底部导航 */}
          {/* More页面：保持底部导航栏可见 */}
          <Stack.Screen 
            name="More" 
            component={More}
            options={{
              headerShown: false,
              presentation: 'containedModal',
            }} 
          />
          {/* {人员关怀} */}
          <Stack.Screen 
            name="People" 
            component={People}
            options={{
              headerShown: false,
              presentation: 'containedModal',
            }} 
          />
          {/* {具体关怀页面} */}
          <Stack.Screen 
            name="Objected" 
            component={Objected}
            options={{
              headerShown: false,
              presentation: 'containedModal',
            }} 
          />
          {/* 添加关怀人员页面 */}
          <Stack.Screen 
            name="AddPeople" 
            component={AddPeople}
            options={{
              headerShown: false,
              presentation: 'containedModal',
            }}
          />
          {/* 添加 */}
          <Stack.Screen 
            name="XinZeng" 
            component={XinZeng}
            options={{
              headerShown: false,
              presentation: 'containedModal',
            }} 
          />
          {/* 登录页面：全屏无底部栏 */}
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="电子通行证管理"
            component={PassManagement}
            options={{
              headerStyle: { backgroundColor: '#ffffff' },
              headerTitleAlign: 'left',
            }}
          />
          <Stack.Screen
            name="通行二维码"
            component={PassQRcode}
            options={{
              headerStyle: { backgroundColor: '#ffffff' },
              headerTitleAlign: 'left',
              headerRight: HeaderRight,
            }}
          />
          <Stack.Screen
            name="电子通行证配置"
            component={PassQRcodeSet}
            options={{
              headerStyle: { backgroundColor: '#ffffff' },
              headerTitleAlign: 'left',
              headerRight: HeaderRight,
            }}
          />
          <Stack.Screen
            name="通行记录"
            component={PassQRcodeRecord}
            options={{
              headerStyle: { backgroundColor: '#ffffff' },
              headerTitleAlign: 'left',
            }}
          />
          <Stack.Screen
            name="通行二维码配置"
            component={QRcodeSet}
            options={{
              headerStyle: { backgroundColor: '#ffffff' },
              headerTitleAlign: 'left',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}