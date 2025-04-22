import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>通用设置</Text>
        <View style={styles.item}>
          <Text style={styles.itemText}>深色模式</Text>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>推送通知</Text>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={setIsNotificationsEnabled}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>账号安全</Text>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>修改密码</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>隐私设置</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>退出登录</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemText: {
    fontSize: 15,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#ff4d4f',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Settings;