import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';

import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Are you sure you want to logout?');
      if (confirmed) {
        await logout();
        router.replace('/(auth)/login');
      }
      return;
    }
    
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  if (!user) {
    return null;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{user.name || 'Not set'}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.label}>Bio</Text>
          <Text style={styles.value}>
            {user.bio || 'No bio yet. Add one to tell others about yourself!'}
          </Text>
        </View>

        <Button
          title="Edit Profile"
          onPress={() => router.push('/(tabs)/edit')}
          style={styles.editButton}
        />
        <Button
          title="Settings"
          onPress={() => router.push('/(tabs)/settings')}
          variant="secondary"
          style={styles.settingsButton}
        />
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="secondary"
          style={styles.logoutButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  infoSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    color: '#1f2937',
    lineHeight: 24,
  },
  editButton: {
    marginTop: 8,
  },
  settingsButton: {
    marginTop: 12,
  },
  logoutButton: {
    marginTop: 12,
  },
});