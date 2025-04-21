import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import storage from '../component/AsyncStorage';

// 定义用户信息类型
interface UserInfo {
  data: {
    name: string;
    phone: string;
    img: string[];
  };
}

// 定义导航类型
type RootStackParamList = {
  登录: undefined;
  [key: string]: any;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const App = () => {
  const navigation = useNavigation<NavigationProp>();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    yanzheng();
    getuser();
  }, []);

  const yanzheng = async () => {
    try {
      const accessToken = await storage.load({ 
        key: 'accessToken',
        autoSync: true
      });
      
      const res = await axios.get("http://192.168.80.1:3000/userinfo", {
        headers: {
          'AccessToken': accessToken,
        }
      });
      
      storage.save({ key: 'userInfo', data: res.data });
      setUserInfo(res.data);
    } catch (error) {
      console.error("验证失败:", error);
      navigation.navigate('登录');
    }
  };

  const getuser = async () => {
    try {
      const userData = await storage.load({ key: 'userInfo' });
      if (userData) {
        setUserInfo(userData);
      }
    } catch (error) {
      console.error('获取用户信息失败:', error);
      setUserInfo(null);
    }
  };

  const renderMenuItem = (title: string, rightContent?: React.ReactNode, onPress?: () => void) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text style={styles.menuTitle}>{title}</Text>
      <View style={styles.menuRight}>
        {rightContent}
        <Text style={styles.arrowIcon}>›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} />
      {/* 头部用户信息 */}
      <TouchableOpacity style={styles.header}>
        <Image 
          // source={{uri:userInfo?.data.img[0]}}
          style={styles.avatar}
        />
        <View style={styles.userInfoContainer}>
          <Text style={styles.username}>{userInfo?.data.name || '未登录'}</Text>
          <Text style={styles.phoneNumber}>{userInfo?.data.phone || '未绑定手机号'}</Text>
        </View>
        <Text style={styles.arrowIcon}>›</Text>
      </TouchableOpacity>

      {/* 我的社区 */}
      <View style={styles.communityCard}>
        <Text style={styles.cardTitle}>我的社区</Text>
        <Text style={styles.communityCount}>6</Text>
      </View>

      {/* 菜单项 */}
      {renderMenuItem('我的卡券', <View style={styles.redDot} />)}
      {renderMenuItem('设置')}
      {renderMenuItem('关于', <Text style={styles.version}>2.0.3</Text>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop:60
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#eee',
  },
  userInfoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  phoneNumber: {
    fontSize: 14,
    color: '#666',
  },
  communityCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    color: '#333',
  },
  communityCount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 1,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    fontSize: 20,
    color: '#ccc',
    marginLeft: 8,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
    marginRight: 8,
  },
  version: {
    fontSize: 14,
    color: '#999',
    marginRight: 8,
  },
});

export default App;