import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';
import axios from 'axios';
const backgroundImage = require('../assets/background.jpg'); // 替换为你的背景图片路径
import storage from '../component/AsyncStorage';
import { useNavigation } from '@react-navigation/native';
import { Dialog } from '@rneui/themed';
const LoginPage = () => {
    const navigation = useNavigation();
    const [phone, setphone] = useState('');
    const [pwd, setpwd] = useState('');
    const [visible1, setVisible1] = useState(false);

    const handleLogin = async () => {
        let datas = storage.load({ key: 'accessToken' }).then(res => {
            console.log(res);
        })

        // 这里可以添加登录逻辑
        // console.log('phone:', phone, 'pwd:', pwd);
        axios.post("http://192.168.80.1:3000/login", { phone, pwd }).then(res => {
            if (res.data.code == 200) {
                setVisible1(!visible1);
                storage.save({ key: 'accessToken', data: res.data.accessToken })
                storage.save({ key: 'refreshToken', data: res.data.refreshToken })
                navigation.navigate('Main')
            } else {
                Alert.alert("登录失败")
            }
        })
    };
    const toggleDialog1 = () => {
        setVisible1(!visible1);
    };
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ImageBackground source={backgroundImage} style={styles.background}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>登录</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="用户名"
                        placeholderTextColor="#fff"
                        onChangeText={(text) => setphone(text)}
                        value={phone}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="密码"
                        placeholderTextColor="#fff"
                        onChangeText={(text) => setpwd(text)}
                        value={pwd}
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>登录</Text>
                </TouchableOpacity>
            </ImageBackground>
            <Dialog
                isVisible={visible1}
                onBackdropPress={toggleDialog1}
            >
                <Dialog.Title  />
                <Text>登录成功</Text>
            </Dialog>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        marginBottom: 40,
    },
    logoText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 10,
        paddingHorizontal: 15,
        color: '#fff',
        lineHeight: 20,
        fontSize: 14
    },
    loginButton: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingVertical: 12,
        alignItems: 'center',
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default LoginPage;    