import { StyleSheet, Text, View,Dimensions,TouchableOpacity } from 'react-native';
import React from 'react';
import Header from '../component/Header';
const { width } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
const AddPeople = () => {
  const navigation = useNavigation();
  return (
    <View>
     <Header name="添加关怀人员"/>
     <TouchableOpacity onPress={()=>{navigation.navigate('XinZeng')}}>
     <View style={styles.bodys}>
        <Text style={styles.fonts} >人员</Text>
        <Text style={styles.font2}>关怀对象为（住户）</Text>
        <Text style={styles.backButton}>{'>'}</Text>
     </View>
     </TouchableOpacity>
     <TouchableOpacity>
     <View style={styles.bodys}>
        <Text style={styles.fonts}>建筑</Text>
        <Text style={styles.font2}>关怀对象为（建筑物）</Text>
        <Text style={styles.backButton}>{'>'}</Text>
     </View>
     </TouchableOpacity>
     <View style={styles.bodys}>
        <Text style={styles.fonts}>住户标签</Text>
        <Text style={styles.font2}>关怀对象为（住户标签）</Text>
        <Text style={styles.backButton}>{'>'}</Text>
     </View>
    </View>
  );
};
export default AddPeople;

const styles = StyleSheet.create({
  bodys:{
    width:width,
    height:120,
    backgroundColor:'#fff',
    marginTop:30,
    borderRadius:10,
  },
  fonts:{
    fontSize:20,
    marginTop:20,
    marginLeft:20,
  },
  font2:{
    fontSize:15,
    marginTop:10,
    marginLeft:20,
    color:'rgb(169, 169, 169)',
  },
  backButton: {
    fontSize: 24,
    position: 'absolute',
    right: 20,
    top: 40,
    color:'rgb(169, 169, 169)',
  },
})