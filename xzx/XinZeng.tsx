import { StyleSheet, Text, View,ScrollView } from 'react-native'
import React from 'react'
// import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated'

const XinZeng = () => {
  return (
    <View>
      <ScrollView style={styles.heads}>
        <Text>XinZeng</Text>
      </ScrollView>
    </View>
  )
}

export default XinZeng

const styles = StyleSheet.create({
  heads: {
    backgroundColor: '#fff',
    height: '100%',
    marginTop: 50,
  },
})