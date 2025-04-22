 import React from 'react'
 import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Button,
 } from 'react-native'

 import {useNavigation} from '@react-navigation/native'

export default function App(){
    const navigation = useNavigation()

    function btn() {
        navigation.navigate('电子通行证管理')
    }
    return(
        <View>
  
            <Button title='电子通行证管理' onPress={btn}></Button>
        </View>
    )
}