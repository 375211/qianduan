import { View, Text, StyleSheet, TouchableOpacity,Dimensions } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
const { width } = Dimensions.get('window');
export default function Header(props) {
    const {name} = props;
    const navigation = useNavigation();
  return (
    <View>
     <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Text style={styles.backButton} onPress={()=>navigation.goBack()}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{name}</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchText}>查询</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
})