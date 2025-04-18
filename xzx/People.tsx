import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
  } from 'react-native';
  import React from 'react';
  import { useNavigation } from '@react-navigation/native';
  import Icon from 'react-native-vector-icons/MaterialIcons';
  // 定义常量颜色和尺寸，便于统一管理和复用
  const COLORS = {
    primary: '#4A90E2',
    secondary: '#50E3C2',
    background: '#F8F9FA',
    white: '#FFFFFF',
    text: '#333333',
    textLight: '#666666',
    warning: '#FF6B6B',
    cardBorder: '#E0E0E0',
  };
  const SIZES = {
    small: 12,
    regular: 14,
    medium: 16,
    large: 20,
    xlarge: 24,
  };
  const SPACING = {
    small: 8,
    regular: 16,
    medium: 24,
    large: 32,
  };
  // 使用 TypeScript 定义 Props
  interface CardProps {
    title: string;
    icon: string;
    extra?: React.ReactNode;
    onPress?: () => void;
  }
  const Card: React.FC<CardProps> = ({ title, icon, extra,onPress }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8} // 添加点击反馈效果
      onPress={onPress} 
    >
      <View style={styles.cardContent}>
        <View style={styles.cardLeft}>
          <Icon name={icon} size={SIZES.xlarge} color={COLORS.primary} style={styles.cardIcon} />
          <Text style={styles.cardTitle}>{title}</Text>
        </View>
        {extra && <View style={styles.extraContainer}>{extra}</View>}
      </View>
    </TouchableOpacity>
  );
  const People = () => {
    const navigation = useNavigation(); // 使用 useNavigation 钩子
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            activeOpacity={0.7}
          >
           <Text onPress={() => navigation.goBack()}>←返回</Text>
          </TouchableOpacity>
          <Text style={styles.title}>人员关怀</Text>
        </View>
        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Card 
            title="关怀对象"  
            icon=''
            onPress={() =>navigation.navigate('Objected')}
            />
          <Card title="重点人员关怀" icon=''/>
          <Card
            title="通知告警"
            icon=""
            extra={
              <View style={styles.warningBadge}>
                <Text style={styles.warningText}>
                  未处理 <Text style={styles.warningCount}>2</Text>
                </Text>
              </View>
            }
          />
        </ScrollView>
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: SPACING.large * 1.5, // 考虑状态栏高度
      paddingHorizontal: SPACING.regular,
      paddingBottom: SPACING.regular,
      backgroundColor: COLORS.primary,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    backButton: {
      padding: SPACING.small,
      marginRight: SPACING.small,
    },
    title: {
      fontSize: SIZES.large,
      fontFamily: 'Roboto-Medium',
      color: COLORS.white,
      flex: 1,
    },
    scrollContainer: {
      flex: 1,
    },
    scrollContent: {
      paddingVertical: SPACING.regular,
      paddingHorizontal: SPACING.regular,
    },
    card: {
      backgroundColor: COLORS.white,
      borderRadius: 12,
      marginBottom: SPACING.regular,
      padding: SPACING.regular,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 3,
      borderWidth: 1,
      borderColor: COLORS.cardBorder,
      height:150,
      lineHeight:150,
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    cardLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    cardIcon: {
      marginRight: SPACING.regular,
    },
    cardTitle: {
      fontSize: SIZES.medium,
      color: COLORS.text,
      fontFamily: 'Roboto-Regular',
    },
    extraContainer: {
      marginLeft: SPACING.small,
    },
    warningBadge: {
      backgroundColor: 'rgba(255, 107, 107, 0.1)',
      borderRadius: 16,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    warningText: {
      color: COLORS.warning,
      fontSize: SIZES.small,
      fontFamily: 'Roboto-Regular',
    },
    warningCount: {
      fontFamily: 'Roboto-Bold',
    },
  });
export default People;