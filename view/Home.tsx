import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native'
import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native'
export default function App() {
    let navigation = useNavigation()
    let [datas, setdata] = useState('')
    const storage = new Storage({
        // 最大容量，默认值1000条数据循环存储
        size: 1000,
        // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
        // 如果不指定则数据只会保存在内存中，重启后即丢失
        storageBackend: AsyncStorage,
        // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
        defaultExpires: null,
        // 读写时在内存中缓存数据。默认启用。
        enableCache: true,

        sync: {
        }
    })
    storage.save({
        key: 'login',
        data: {
            from: 'some other site',
            userid: 'some userid',
            token: 'some token'
        },
    })

    function btn() {
        storage.load({
            key: 'login',
            autoSync: true,
            syncInBackground: true,
        }).then(res => {

            setdata(res.from)
            console.log(res.data.from);
            
            
        })
        navigation.navigate('登录')
    }
    return (
        <View>
            <Text>{datas}</Text>
            <Text>sadsad</Text>
            <Text>sadsad</Text>
            <Text>sadsad</Text>
            <View>
                <Button title='2323' onPress={btn}></Button>
            </View>
        </View>
    )
}