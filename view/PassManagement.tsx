import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    // Alert,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'

export default function PassManagement() {
    const navigation = useNavigation()
    const handleQRcodePress = (num: number) => {
        switch (num) {
            case 1:
                navigation.navigate('通行二维码' as never)
                break;
            case 2:
                navigation.navigate('电子通行证配置' as never)
                break;
            case 3:
                navigation.navigate('通行记录' as never)
                break;
            default:
                break;
        }
    }
    return (
        <View style={styles.PassManagement}>
            <View style={styles.PassSetList}>
                <TouchableOpacity style={styles.PassSetListItem}
                    onPress={() => handleQRcodePress(1)}>
                    <View style={{ marginRight: 15 }}>
                        <Image source={require('../assets/icon/QRcode.png')} />
                    </View>
                    <Text>
                        通行二维码
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.PassSetListItem, styles.Passcenter]}
                    onPress={() => handleQRcodePress(2)}>
                    <View style={{ marginRight: 15 }}>
                        <Image source={require('../assets/icon/set.png')} />
                    </View>&emsp;
                    <Text>
                        电子通行证配置
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.PassSetListItem}
                    onPress={() => handleQRcodePress(3)}>
                    <View style={{ marginRight: 15 }}>
                        <Image source={require('../assets/icon/document.png')} />
                    </View>&emsp;
                    <Text>
                        通行记录
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    PassManagement: {
        margin: 10,
    },
    PassSetList: {
        backgroundColor: 'white',
        padding: 10,
        paddingLeft: 15,
        borderRadius: 10,
    },
    PassSetListItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    Passcenter: {
        marginTop: 20,
        marginBottom: 20,
    },
});