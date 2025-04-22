import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('window');

const Objected = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('人员');

  // 根据当前选中的标签返回对应的内容组件
  const renderContent = () => {
    switch (activeTab) {
      case '人员':
        return (
          <ScrollView style={styles.scrollView}>
            {[1, 2].map((item, index) => (
              <View key={index} style={styles.personItem}>
                <View style={styles.personInfo}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>底库照片</Text>
                  </View>
                  <View style={styles.personDetails}>
                    <View style={styles.nameRow}>
                      <Text style={styles.personName}>张三</Text>
                      <TouchableOpacity>
                        <Text style={styles.arrowIcon}>{'>'}</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.communityInfo}>小区：城市花园</Text>
                    <Text style={styles.houseInfo}>房屋：1栋1单元1层101</Text>
                  </View>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>通知配置</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>告警记录</Text>
                    <View style={styles.redDot}></View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>删除</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        );
      case '建筑':
        return (
          <ScrollView style={styles.scrollView}>
            {[1, 2].map((item, index) => (
              <View key={index} style={styles.buildingItem}>
                <View style={styles.buildingInfo}>
                  <Text style={styles.buildingName}>城市花园-建筑{item}</Text>
                  <TouchableOpacity>
                    <Text style={styles.detailsLink}>点击查看建筑详情</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>通知配置</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>删除</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        );
      case '住户标签':
        return (
          <ScrollView style={styles.scrollView}>
            <Text>住户标签内容</Text>
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.page}>
      {/* 顶部标题 */}
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Text style={styles.backButton} onPress={()=>navigation.goBack()}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>关怀对象</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchText}>查询</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 标签栏 */}
      <View style={styles.heads}>
        {['人员', '建筑', '住户标签'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={tab === activeTab ? styles.activeTab : styles.tab}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 批量通知配置 */}
      <TouchableOpacity style={styles.batchNotify}>
        <Text style={styles.batchNotifyText}>批量通知配置</Text>
      </TouchableOpacity>

      {renderContent()}

      {/* 底部添加按钮 */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddPeople')}>
        <Text style={styles.addButtonText}>添加</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buildingItem: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
  },
  buildingInfo: {
    marginBottom: 10,
  },
  buildingName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailsLink: {
    color: '#4A90E2',
    fontSize: 14,
  },
  page: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    width: width,
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  backButton: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchButton: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
  },
  searchText: {
    fontSize: 16,
  },
  heads: {
    width: width * 0.7,
    height: 40,
    marginLeft: width * 0.15,
    backgroundColor: 'rgb(228, 228, 228)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  activeTab: {
    fontSize: 16,
    backgroundColor: '#4a90e2',
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  tab: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  batchNotify: {
    marginTop: 15,
    marginLeft: 10,
  },
  batchNotifyText: {
    fontSize: 16,
    color: '#666',
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
  personItem: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  personInfo: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  personDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  personName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrowIcon: {
    fontSize: 18,
    color: '#999',
  },
  communityInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  houseInfo: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    position: 'relative',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#4a90e2',
  },
  redDot: {
    position: 'absolute',
    right: -5,
    top: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },
  addButton: {
    backgroundColor: '#4a90e2',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default Objected