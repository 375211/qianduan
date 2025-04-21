 import React from 'react'
 import {
    View,
    Text,
    StyleSheet,
<<<<<<< HEAD
    StatusBar
=======
    Button
>>>>>>> ef9e1e003b6114f9ed9182cab8437d2b16ac7b0d
 } from 'react-native'

 import {useNavigation} from '@react-navigation/native'

export default function App(){
    const navigation = useNavigation()

    function btn() {
        navigation.navigate('电子通行证管理')
    }
    return(
<<<<<<< HEAD
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
=======
        <View>
  
            <Button title='电子通行证管理' onPress={btn}></Button>
>>>>>>> ef9e1e003b6114f9ed9182cab8437d2b16ac7b0d
        </View>
    )
}