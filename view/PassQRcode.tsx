import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    ScrollView,
    TouchableOpacity,
    Modal,
    Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
// import axios from 'axios';

//  import {useNavigation} from '@react-navigation/native'

export default function PassQRcode() {
    // const [searchText, setSearchText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [type, setType] = useState('全部');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const onStartTimeChange = (_event: Event, selectedDate?: Date) => {
        setShowStartPicker(false);
        if (selectedDate) {
            setStartTime(selectedDate);
        }
    };

    const onEndTimeChange = (_event: Event, selectedDate?: Date) => {
        setShowEndPicker(false);
        if (selectedDate) {
            setEndTime(selectedDate);
        }
    };

    // let [size, setSize] = useState(5);
    // let [page, setPage] = useState(1);
    // let [QRcodeList, setQRcodeList] = useState([]);
    // const getQRcodeList = async() => {
    //     let params = {
    //         size,page,
    //     };
    //     let res = await axios.get('http://blackcat2004.gnway.cc:80/getpasslist',{params});
    //     if (res.data.code === 200) {
    //         setQRcodeList(res.data.data);
    //     }
    // };

    const qrcodeList = [
        { id: 1, name: '大门', location: '东大门', type: '入' },
        { id: 2, name: '大门', location: '东大门', type: '出' },
        { id: 3, name: '大门', location: '西大门', type: '出' },
    ];

    // 在组件顶部添加状态
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    // 添加选择处理函数
    const toggleSelect = (id: number) => {
        setSelectedItems(prev =>
            prev.includes(id)
                ? prev.filter(itemId => itemId !== id)
                : [...prev, id]
        );
    };

    // 添加全选函数
    const toggleSelectAll = () => {
        if (selectedItems.length === qrcodeList.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(qrcodeList.map(item => item.id));
        }
    };

    return (
        <View style={styles.PassQRcode}>
            {/* 搜索框 */}
            <View style={styles.searchBox}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text>查询</Text>
                </TouchableOpacity>
            </View>
            {/* 查询弹窗 */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>查询</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>出入类型</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={type}
                                    onValueChange={(itemValue) => setType(itemValue)}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="全部" value="全部" />
                                    <Picker.Item label="入" value="入" />
                                    <Picker.Item label="出" value="出" />
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>名称</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="请输入"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>位置</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="请输入"
                                value={location}
                                onChangeText={setLocation}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>提交时间</Text>
                            <TouchableOpacity
                                style={styles.input}
                                onPress={() => setShowStartPicker(true)}
                            >
                                <Text>{startTime.toLocaleDateString()}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.input}
                                onPress={() => setShowEndPicker(true)}
                            >
                                <Text>{endTime.toLocaleDateString()}</Text>
                            </TouchableOpacity>

                            {showStartPicker && (
                                <DateTimePicker
                                    value={startTime}
                                    mode="date"
                                    onChange={(event: any, date?: Date) => onStartTimeChange(event, date)}
                                />
                            )}

                            {showEndPicker && (
                                <DateTimePicker
                                    value={endTime}
                                    mode="date"
                                    onChange={(event: any, date?: Date) => onEndTimeChange(event, date)}
                                />
                            )}
                        </View>

                        <View style={styles.buttonGroup}>
                            <TouchableOpacity
                                style={[styles.button, styles.resetButton]}
                                onPress={() => {
                                    setType('全部');
                                    setName('');
                                    setLocation('');
                                    setStartTime(new Date());
                                    setEndTime(new Date());
                                }}
                            >
                                <Text style={styles.resetButtonText}>重置</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.confirmButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.confirmButtonText}>确定</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* 二维码列表 */}
            <ScrollView style={styles.listContainer}>
                {qrcodeList.map(item => (
                    <View key={item.id} style={styles.qrcodeItem}>
                        <View style={styles.mainContent}>
                            <View style={styles.checkboxContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.checkbox,
                                        selectedItems.includes(item.id) && styles.checkboxSelected
                                    ]}
                                    onPress={() => toggleSelect(item.id)}
                                >
                                    {selectedItems.includes(item.id) && (
                                        <Text style={styles.checkmark}>✓</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                            <View style={styles.qrcodeContent}>
                                <Image
                                    source={require('../assets/icon/QRcode.png')}
                                    style={styles.qrcodeImage}
                                />
                                <View style={styles.qrcodeInfo}>
                                    <Text style={styles.infoText}>名称: {item.name}</Text>
                                    <Text style={styles.infoText}>位置: {item.location}</Text>
                                    <Text style={styles.infoText}>出入类型: {item.type}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.arrowContainer}>
                                <Text style={styles.arrow}>›</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.operationGroup}>
                            <TouchableOpacity style={styles.editButton}>
                                <Text style={styles.buttonText}>编辑</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.editButton, styles.deleteButton]}>
                                <Text style={styles.buttonText}>删除</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
            {/* 底部操作栏 */}
            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={styles.selectAllContainer}
                    onPress={toggleSelectAll}
                >
                    <View style={[
                        styles.checkbox,
                        selectedItems.length === qrcodeList.length && styles.checkboxSelected
                    ]}>
                        {selectedItems.length === qrcodeList.length && (
                            <Text style={styles.checkmark}>✓</Text>
                        )}
                    </View>
                    <Text style={styles.selectAllText}>全选</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.batchDownloadButton}>
                    <Text style={styles.batchDownloadText}>批量下载</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>+ 新增</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    PassQRcode: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    searchBox: {
        textAlign: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 25,
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        marginBottom: 8,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
        width: '100%',
    },
    button: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
        marginLeft: 10,
    },
    resetButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#2196F3',
    },
    confirmButton: {
        backgroundColor: '#2196F3',
    },
    resetButtonText: {
        color: '#2196F3',
        textAlign: 'center',
        fontSize: 16,
    },
    confirmButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 8,
    },
    picker: {
        height: 60,
    },
    listContainer: {
        flex: 1,
        padding: 10,
    },
    checkboxContainer: {
        marginRight: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxSelected: {
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
    },
    checkmark: {
        color: '#fff',
        fontSize: 14,
    },
    qrcodeImage: {
        width: 60,
        height: 60,
        marginRight: 15,
    },
    qrcodeInfo: {
        flex: 1,
    },
    infoText: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    deleteButton: {
        backgroundColor: '#FF5252',
    },
    arrowContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
    },
    arrow: {
        fontSize: 24,
        color: '#666',
    },
    qrcodeItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        padding: 15,
    },
    mainContent: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    qrcodeContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    operationGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderTopColor: '#eee',
        paddingTop: 10,
    },
    editButton: {
        backgroundColor: '#2196F3',
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 4,
        marginLeft: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        paddingBottom: 40,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        marginHorizontal: -10,
    },
    selectAllContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectAllText: {
        marginLeft: 8,
        color: '#333',
    },
    batchDownloadButton: {
        marginLeft: 20,
    },
    batchDownloadText: {
        color: '#3399FF',
    },
    addButton: {
        flex: 1,
        backgroundColor: '#3399FF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginLeft: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});