 import React from 'react'
 import {
    View,
    Text,
    StyleSheet,
    StatusBar
 } from 'react-native'

 import {useNavigation} from '@react-navigation/native'

export default function App(){
    const navigation = useNavigation()
    return(
        <View>  
 
            
            <Text>Hello111</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello11111</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <StatusBar backgroundColor='blue' hidden={false} barStyle={'dark-content'}/>
        </View>
    )
}