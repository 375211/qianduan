import { View, Text, StyleSheet, } from 'react-native';
import React from 'react';
import { Background } from '@react-navigation/elements';

const Objected = () => {
  return (
    <View>
     <View style={styles.container}>
        <Text style={{fontSize:25}}>关怀对象</Text>
     </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container:{
        width:415,
        height:100,
    },
})
export default Objected