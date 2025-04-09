import React,{useState,useEffect} from'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from'axios';
axios.defaults.baseURL="http://localhost:3000"

const App = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/getdata').then(res => {
      setData(res.data);
    });
  }, []);
  return (
    <View style={styles.container}>
      {/* 头部信息 */}
      <View style={styles.header}>
        <Image style={styles.profilePic} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>肌肉最嗨了-33</Text>
          <Text style={styles.phoneNumber}>138****7766</Text>
        </View>
      </View>
      {/* 功能模块 */}
      <View style={styles.module}>
        <View style={styles.moduleLeft}>
          <Text style={styles.moduleTitle}>我的社区</Text>
        </View>
        <View style={styles.moduleRight}>
          <Text style={styles.moduleValue}>6</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.module}>
        <View style={styles.moduleLeft}>
          <Image  style={styles.icon} /> {/* 卡券图标路径 */}
          <Text style={styles.moduleTitle} >我的卡券</Text>
        </View>
        <View style={styles.moduleRight}>
          <View style={styles.redDot}></View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.module}>
        <Text style={styles.moduleTitle}>设置</Text>
        <Image  style={styles.arrowIcon} /> {/* 箭头图标路径 */}
      </TouchableOpacity>
      <TouchableOpacity style={styles.module}>
        <Text style={styles.moduleTitle}>关于</Text>
        <Text style={styles.version}>2.0.3</Text>
        <Image  style={styles.arrowIcon} /> {/* 箭头图标路径 */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phoneNumber: {
    fontSize: 14,
    color: '#666',
  },
  module: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  moduleLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleTitle: {
    fontSize: 16,
  },
  moduleValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
    marginLeft: 5,
  },
  arrowIcon: {
    width: 15,
    height: 15,
    tintColor: '#999',
    marginLeft: 10,
  },
  version: {
    fontSize: 14,
    color: '#999',
    marginLeft: 10,
  },
});

export default App;