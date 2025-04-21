import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Modal,
    Image,
    TouchableOpacity,
    Alert,
    ScrollView,
    Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

import { useNavigation } from '@react-navigation/native';

export default function PassQRcodeSet() {
    interface JtAddressType {
        building: string;
        floor: string;
        room: string;
        fullAddress: string;
    }

    interface QRCodeItem {
        _id: string;
        time: string;
        name: string;
        ID: string;
        phone: string;
        type: string;
        address: string;
        img: string;
        status: boolean;
        roal: string;
        JtAddress: JtAddressType;
        passStart: string;
        passEnd: string;
        isUse: boolean;
        totalCount: number;
        remainingCount: number;
        enterNum: number;
        outerNum: number;
        limitNum: number;
        QRCodeDesc: string;
        QRCode: string;
        sex: boolean;
    }

    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false);
    const [type, setType] = useState('全部');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [activeTab, setActiveTab] = useState('人员');
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    // 测试数据
    const [qrcodeList, setQrcodeList] = useState<QRCodeItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    useEffect(() => {
        getQRcodeList();
    }, []); 
    const getQRcodeList = async (isLoadMore = false) => {
        try {
            setLoading(true);
            const res = await axios.get('http://blackcat2004.gnway.cc:80/getpasslist', {
                params: {
                    page: currentPage,
                    size: pageSize,
                },
            });
            console.log('获取到的数据:', res.data);
            if (res.data.code === 200) {
                if (isLoadMore) {
                    setQrcodeList(prev => [...prev, ...res.data.data]);
                } else {
                    setQrcodeList(res.data.data);
                }
                setHasMore(res.data.data.length === pageSize);
            }
        } catch (error) {
            console.error('获取数据失败:', error);
            Alert.alert('错误', '获取数据失败，请稍后重试');
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = async() => {
        if (!loading && hasMore) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            try {
                setLoading(true);
                const res = await axios.get('http://blackcat2004.gnway.cc:80/getpasslist', {
                    params: {
                        page: nextPage,
                        size: pageSize,
                    },
                });
                if (res.data.code === 200) {
                    setQrcodeList(prev => [...prev, ...res.data.data]);
                    setHasMore(res.data.data.length === pageSize);
                }
            } catch (error) {
                console.error('获取数据失败:', error);
                Alert.alert('错误', '获取数据失败，请稍后重试');
            } finally {
                setLoading(false);
            }
        }
    };

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

    // 切换选择状态
    const toggleSelect = (id: string) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        );
    };

    // 切换启用状态
    const toggleEnabled = (id: string) => {
        setQrcodeList(prev => prev.map(item =>
            item._id === id ? { ...item, status: !item.status } : item
        ));
    };

    // 删除项目
    const handleDelete = (id: string) => {
        Alert.alert(
            "确认删除",
            "是否确定删除此项？",
            [
                { text: "取消", style: "cancel" },
                {
                    text: "确定",
                    onPress: () => setQrcodeList(prev => prev.filter(item => item._id !== id))
                }
            ]
        );
    };

    // 添加全选函数
    const toggleSelectAll = () => {
        if (selectedItems.length === qrcodeList.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(qrcodeList.map(item => item._id));
        }
    };

    const changePage = () => {
        navigation.navigate('通行二维码配置' as never);
    };
    return (
        <View style={styles.PassQRcodeSet}>
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

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === '人员' ? styles.tabActive : styles.tabInactive]}
                    onPress={() => setActiveTab('人员')}
                >
                    <Text style={[styles.tabText, activeTab === '人员' && styles.tabTextActive]}>人员</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === '房屋' ? styles.tabActive : styles.tabInactive]}
                    onPress={() => setActiveTab('房屋')}
                >
                    <Text style={[styles.tabText, activeTab === '房屋' && styles.tabTextActive]}>房屋</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.listContainer}
                onScroll={({ nativeEvent }) => {
                    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
                    const paddingToBottom = 20;
                    const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
                    if (isEndReached && !loading) {
                        handleLoadMore();
                    }
                }}
                scrollEventThrottle={32}>
                {qrcodeList.map(item => (
                    <View key={item._id} style={styles.listItem}>
                        <View style={styles.itemHeader}>
                            <TouchableOpacity
                                style={styles.checkboxContainer}
                                onPress={() => toggleSelect(item._id)}
                            >
                                <View style={[
                                    styles.checkbox,
                                    selectedItems.includes(item._id) && styles.checkboxSelected
                                ]}>
                                    {selectedItems.includes(item._id) && (
                                        <Text style={styles.checkmark}>✓</Text>
                                    )}
                                </View>
                            </TouchableOpacity>

                            <View style={styles.photoContainer}>
                                {item.img ? (
                                    <Image
                                        source={{ uri: item.img }}
                                        style={{ width: 60, height: 60, borderRadius: 4 }}
                                    />
                                ) : (
                                    <Text style={styles.photoPlaceholder}>照片</Text>
                                )}
                            </View>

                            <View style={styles.itemInfo}>
                                <View style={styles.nameRow}>
                                    <Text style={styles.nameText}>姓名：{item.name}</Text>
                                    <Text style={styles.genderText}>性别：{item.sex ? '男' : '女'}</Text>
                                </View>
                                <Text style={styles.roomText}>房屋：{item.JtAddress.fullAddress}</Text>
                                <Text style={styles.timeText}>时限：{item.passStart.split(' ')[0]}至{item.passEnd.split(' ')[0]}</Text>
                                <Text style={styles.countText}>剩余总次数：{item.remainingCount}/{item.totalCount}</Text>
                                <Text style={styles.dailyText}>每日剩余次数：{item.enterNum}出{item.outerNum}（限制{item.limitNum}次）</Text>
                            </View>

                            <TouchableOpacity
                                style={styles.arrowContainer}
                                onPress={() => {/* 处理箭头点击 */ }}
                            >
                                <Text style={styles.arrow}>›</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.itemFooter}>
                            <View style={styles.footerContent}>
                                <View style={styles.switchContainer}>
                                    <Text style={styles.switchLabel}>停用</Text>
                                    <Switch
                                        value={item.status}
                                        onValueChange={() => toggleEnabled(item._id)}
                                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                                        thumbColor={item.status ? '#3399FF' : '#f4f3f4'}
                                    />
                                    <Text style={styles.switchLabel}>启用</Text>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.configButton}
                                        onPress={() => changePage()}>
                                        <Text style={styles.buttonText}>二维码配置</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => handleDelete(item._id)}
                                    >
                                        <Text style={styles.buttonText}>删除</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}

                {loading && (
                    <View style={styles.loadingContainer}>
                        <Text>加载中...</Text>
                    </View>
                )}
            </ScrollView>
                <View style={{height:30}}> </View>
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
                <TouchableOpacity style={styles.configAllButton}
                    onPress={() => changePage()}>
                    <Text style={styles.configAllText}>全部二维码配置</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    PassQRcodeSet: {
        margin: 10,
        flex: 1,  // 添加 flex: 1 确保容器填充整个屏幕
        backgroundColor: '#F5F5F5',
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
        justifyContent: 'flex-start',  // 从顶部开始
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
        textAlign: 'left',
        fontWeight: '500',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
        color: '#666',
    },
    input: {
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        backgroundColor: '#F8F8F8',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        marginLeft: 15,
    },
    resetButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#3399FF',
    },
    confirmButton: {
        backgroundColor: '#3399FF',
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
        borderColor: '#E5E5E5',
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#F8F8F8',
    },
    picker: {
        height: 60,
    },
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
    },
    tab: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 16,
    },
    tabActive: {
        backgroundColor: '#3399FF',
    },
    tabInactive: {
        backgroundColor: 'transparent',
    },
    tabText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#666',
    },
    tabTextActive: {
        color: '#fff',
    },
    listContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F5F5F5',
    },
    listItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        padding: 15,
    },
    itemHeader: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContent: {
        flexDirection: 'row',
        flex: 1,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxSelected: {
        backgroundColor: '#3399FF',
        borderColor: '#3399FF',
    },
    checkmark: {
        color: '#fff',
        fontSize: 14,
    },
    itemInfo: {
        flex: 1,
    },
    arrow: {
        fontSize: 24,
        color: '#666',
        marginLeft: 10,
    },
    itemFooter: {
        marginTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 15,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        // marginBottom: 15,
    },
    switchLabel: {
        fontSize: 14,
        color: '#666',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        // justifyContent: 'flex-end',
    },
    configButton: {
        backgroundColor: '#3399FF',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 4,
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: '#FF5252',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
    },
    photoContainer: {
        width: 60,
        height: 60,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        borderRadius: 4,
    },
    photoPlaceholder: {
        color: '#999',
        fontSize: 14,
    },
    nameRow: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    nameText: {
        fontSize: 14,
        color: '#333',
        marginRight: 15,
    },
    genderText: {
        fontSize: 14,
        color: '#333',
    },
    // 调整其他文本样式
    roomText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 3,
    },
    timeText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 3,
    },
    countText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 3,
    },
    dailyText: {
        fontSize: 14,
        color: '#666',
    },
    checkboxContainer: {
        padding: 5,  // 增加点击区域
    },
    arrowContainer: {
        padding: 5,  // 增加点击区域
    },
    footerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        paddingBottom: 40,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        marginHorizontal: -10,
        marginBottom: -10,
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
        backgroundColor: '#3399FF',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    configAllButton: {
        backgroundColor: '#3399FF',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
    },
    configAllText: {
        color: '#fff',
        fontSize: 14,
    },
    loadingContainer: {
        padding: 10,
        alignItems: 'center',
    },
});