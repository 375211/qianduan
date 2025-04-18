import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const About = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>关于我们</Text>
        <Text style={styles.content}>
          我们是一个致力于提供优质服务的团队，专注于为用户带来最好的体验。
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>联系方式</Text>
        <View style={styles.item}>
          <Text style={styles.itemText}>电话：400-123-4567</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>邮箱：support@example.com</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>版本信息</Text>
        <View style={styles.item}>
          <Text style={styles.itemText}>当前版本：1.0.0</Text>
        </View>
      </View>
    </ScrollView>
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
  content: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemText: {
    fontSize: 15,
    color: '#333',
  },
});

export default About;