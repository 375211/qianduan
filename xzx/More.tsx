import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const ServiceCard = ({ title, icon }:{title:string, icon:string}) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if (title === '人员关怀') {
      navigation.navigate('People');
    }
    else if(title === '电子通行证管理'){
      navigation.navigate('电子通行证管理')
    }
  };
  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={24} color="#4A90E2" />
      </View>
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
};

const SectionTitle = ({ title }:{title:string}) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

const getServiceIcon = (service:string) => {
  const iconMap = {
    '人员关怀': 'people',
    '楼盘表': 'apartment',
    '住户审核': 'verified-user',
    '事件上报': 'report',
    '投诉建议': 'feedback',
    '维修处理': 'build',
    '身份确认': 'person',
    '信息公开': 'info',
    '访客管理': 'group',
    '访客邀请': 'person-add',
    '电子通行证': 'credit-card',
    '电子通行证管理': 'settings',
    '远程开门': 'vpn-key',
    'NFC门禁': 'nfc',
    '高空抛物': 'warning',
    '车辆布控': 'directions-car',
    '人员布控': 'person-search',
    '电动车管理': 'electric-bike',
    '烟感报警': 'local-fire-department',
    '消防栓水压': 'water',
    '设备报警': 'device-unknown'
  };
  return iconMap[service] || 'circle';
};

const More = () => {
  const propertyServices = [
    '人员关怀', '楼盘表', '住户审核', '事件上报',
    '投诉建议', '维修处理', '身份确认', '信息公开',
    '访客管理',
  ];

  const doorServices = [
    '访客邀请', '电子通行证', '电子通行证管理', '远程开门',
    'NFC门禁',
  ];

  const alertServices = [
    '高空抛物', '车辆布控', '人员布控', '电动车管理',
    '烟感报警', '消防栓水压', '设备报警',
  ];
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
  
      <View style={styles.section}>
        <SectionTitle title="物业管理" />
        <View style={styles.grid}>
          {propertyServices.map((service, index) => (
            <ServiceCard key={index} title={service} icon={getServiceIcon(service)} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionTitle title="门禁访客" />
        <View style={styles.grid}>
          {doorServices.map((service, index) => (
            <ServiceCard key={index} title={service} icon={getServiceIcon(service)} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionTitle title="智能预警" />
        <View style={styles.grid}>
          {alertServices.map((service, index) => (
            <ServiceCard key={index} title={service} icon={getServiceIcon(service)} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  card: {
    width: '25%',
    padding: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#EBF3FD',
    borderRadius: 12,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default More;