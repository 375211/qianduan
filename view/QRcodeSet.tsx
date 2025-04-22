import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    // Modal,
    // Image,
    TouchableOpacity,
    // Alert,
    ScrollView,
    // Switch,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

//  import {useNavigation} from '@react-navigation/native'

export default function QRcodeSet() {
    const [timeType, setTimeType] = useState('时段'); // 时限类型：时段/永久
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [totalCount, setTotalCount] = useState('0'); // 总次数
    const [isUnlimitedCount, setIsUnlimitedCount] = useState(false); // 不限次
    const [dailyLimit, setDailyLimit] = useState('1'); // 每天限制
    const [isUnlimitedDaily, setIsUnlimitedDaily] = useState(false); // 不限制
    const [inCount, setInCount] = useState('0'); // 进次数
    const [outCount, setOutCount] = useState('0'); // 出次数
    const [isEnabled, setIsEnabled] = useState(true); // 启用状态
    const [description, setDescription] = useState(''); // 描述

    const onStartDateChange = (_event: Event, selectedDate?: Date) => {
        setShowStartPicker(false);
        if (selectedDate) {
            setStartDate(selectedDate);
        }
    };
    const onEndDateChange = (_event: Event, selectedDate?: Date) => {
        setShowEndPicker(false);
        if (selectedDate) {
            setEndDate(selectedDate);
        }
    };

    const resetForm = () => {
        setTimeType('时段');
        setStartDate(new Date());
        setEndDate(new Date());
        setTotalCount('0');
        setIsUnlimitedCount(false);
        setDailyLimit('1');
        setIsUnlimitedDaily(false);
        setInCount('0');
        setOutCount('0');
        setIsEnabled(true);
        setDescription('');
    };

    return (
        <View style={styles.QRcodeSet}>
            <ScrollView style={styles.container}>
                {/* 时限设置 */}
                <View style={styles.section}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.required}>*</Text>
                        <Text style={styles.label}>时限</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.radioGroup}>
                            <TouchableOpacity
                                style={styles.radioButton}
                                onPress={() => setTimeType('时段')}
                            >
                                <View style={styles.radio}>
                                    {timeType === '时段' && <View style={styles.radioSelected} />}
                                </View>
                                <Text style={styles.radioText}>时段</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.radioButton}
                                onPress={() => setTimeType('永久')}
                            >
                                <View style={styles.radio}>
                                    {timeType === '永久' && <View style={styles.radioSelected} />}
                                </View>
                                <Text style={styles.radioText}>永久</Text>
                            </TouchableOpacity>
                        </View>

                        {timeType === '时段' && (
                            <View style={styles.dateContainer}>
                                <TouchableOpacity
                                    style={styles.dateInput}
                                    onPress={() => setShowStartPicker(true)}
                                >
                                    <Text>{startDate.toLocaleDateString()}</Text>
                                </TouchableOpacity>
                                <Text style={styles.dateText}>至</Text>
                                <TouchableOpacity
                                    style={styles.dateInput}
                                    onPress={() => setShowEndPicker(true)}
                                >
                                    <Text>{endDate.toLocaleDateString()}</Text>
                                </TouchableOpacity>
                                <Text style={styles.dateText}>5天</Text>
                            </View>
                        )}
                        {showStartPicker && (
                            <DateTimePicker
                                value={startDate}
                                mode="date"
                                onChange={(event: any, date?: Date) => onStartDateChange(event, date)}
                            />
                        )}
                        {showEndPicker && (
                            <DateTimePicker
                                value={endDate}
                                mode="date"
                                onChange={(event: any, date?: Date) => onEndDateChange(event, date)}
                            />
                        )}
                    </View>
                </View>

                {/* 总次数设置 */}
                <View style={styles.section}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.required}>*</Text>
                        <Text style={styles.label}>总次数</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.countContainer}>
                            <TouchableOpacity
                                style={styles.radioButton}
                                onPress={() => setIsUnlimitedCount(false)}
                            >
                                <View style={styles.radio}>
                                    {!isUnlimitedCount && <View style={styles.radioSelected} />}
                                </View>
                                <Text style={styles.radioText}>共</Text>
                            </TouchableOpacity>
                            <TextInput
                                style={styles.numberInput}
                                value={totalCount}
                                onChangeText={setTotalCount}
                                keyboardType="numeric"
                                editable={!isUnlimitedCount}
                            />
                            <Text style={styles.unitText}>次</Text>
                            <TouchableOpacity
                                style={styles.radioButton}
                                onPress={() => setIsUnlimitedCount(true)}
                            >
                                <View style={styles.radio}>
                                    {isUnlimitedCount && <View style={styles.radioSelected} />}
                                </View>
                                <Text style={styles.radioText}>不限次</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* 使用限制 */}
                <View style={styles.section}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.required}>*</Text>
                        <Text style={styles.label}>使用限制</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.limitContainer}>
                            <TouchableOpacity
                                style={styles.radioButton}
                                onPress={() => setIsUnlimitedDaily(false)}
                            >
                                <View style={styles.radio}>
                                    {!isUnlimitedDaily && <View style={styles.radioSelected} />}
                                </View>
                                <Text style={styles.radioText}>每</Text>
                            </TouchableOpacity>
                            <TextInput
                                style={styles.numberInput}
                                value={dailyLimit}
                                onChangeText={setDailyLimit}
                                keyboardType="numeric"
                                editable={!isUnlimitedDaily}
                            />
                            <Text style={styles.unitText}>天</Text>
                            <TouchableOpacity
                                style={styles.radioButton}
                                onPress={() => setIsUnlimitedDaily(true)}
                            >
                                <View style={styles.radio}>
                                    {isUnlimitedDaily && <View style={styles.radioSelected} />}
                                </View>
                                <Text style={styles.radioText}>不限制</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inOutContainer}>
                            <Text style={styles.inOutLabel}>进</Text>
                            <TextInput
                                style={styles.numberInput}
                                value={inCount}
                                onChangeText={setInCount}
                                keyboardType="numeric"
                            />
                            <Text style={styles.unitText}>次</Text>
                            <Text style={styles.inOutLabel}>出</Text>
                            <TextInput
                                style={styles.numberInput}
                                value={outCount}
                                onChangeText={setOutCount}
                                keyboardType="numeric"
                            />
                            <Text style={styles.unitText}>次</Text>
                        </View>
                    </View>
                </View>

                {/* 启用状态 */}
                <View style={styles.section}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.required}>*</Text>
                        <Text style={styles.label}>启用状态</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.statusContainer}>
                            <TouchableOpacity
                                style={styles.radioButton}
                                onPress={() => setIsEnabled(true)}
                            >
                                <View style={styles.radio}>
                                    {isEnabled && <View style={styles.radioSelected} />}
                                </View>
                                <Text style={styles.radioText}>启用</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.radioButton}
                                onPress={() => setIsEnabled(false)}
                            >
                                <View style={styles.radio}>
                                    {!isEnabled && <View style={styles.radioSelected} />}
                                </View>
                                <Text style={styles.radioText}>不启用</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* 描述 */}
                <View style={styles.section}>
                    <View style={styles.labelContainer}>
                        <Text style={styles.required}>*</Text>
                        <Text style={styles.label}>描述</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.descriptionInput}
                            placeholder="请输入（限制50字）"
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            maxLength={50}
                        />
                    </View>
                </View>

                <Text style={styles.warning}>注意：修改将覆盖当前二维码设置，请谨慎操作。</Text>
            </ScrollView>

            {/* 底部按钮 */}
            <View style={styles.bottomButtons}>
                <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={resetForm}
                >
                    <Text style={styles.cancelButtonText}>取消</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.saveButton]}
                    onPress={() => {/* 处理保存 */ }}
                >
                    <Text style={styles.saveButtonText}>保存</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    QRcodeSet: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff',
        marginTop: 20,
        borderRadius: 10,
        marginHorizontal: 15,
        marginBottom: 15,
    },
    radioGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#3399FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },
    radioSelected: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#3399FF',
    },
    radioText: {
        fontSize: 14,
        color: '#333',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    dateInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 8,
        backgroundColor: '#fff',
    },
    dateText: {
        marginHorizontal: 10,
        color: '#666',
    },
    countContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    numberInput: {
        width: 60,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 8,
        marginHorizontal: 5,
        textAlign: 'center',
    },
    unitText: {
        marginRight: 15,
        color: '#666',
    },
    limitContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    inOutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    inOutLabel: {
        marginRight: 5,
        color: '#666',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    descriptionInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 10,
        height: 100,
        textAlignVertical: 'top',
    },
    warning: {
        color: 'red',
        fontSize: 12,
        marginTop: 10,
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 15,
        paddingBottom: 50,
        borderTopWidth: 1,
        borderTopColor: '#fff',
        backgroundColor: '#fff',
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 4,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#3399FF',
    },
    saveButton: {
        backgroundColor: '#3399FF',
    },
    cancelButtonText: {
        color: '#3399FF',
        fontSize: 16,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    section: {
        flexDirection: 'row',
        marginBottom: 20,
        paddingHorizontal: 15,
    },
    labelContainer: {
        width: 80,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 5,
    },
    required: {
        color: 'red',
        marginRight: 2,
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
    inputContainer: {
        flex: 1,
        marginLeft: 15,
    },
});