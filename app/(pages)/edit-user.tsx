import {View, Text, TouchableOpacity, StyleSheet, TextInput, Alert} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { router } from 'expo-router';

import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

import { useUser } from '@/contexts/UserContext';

const TEAL = '#2a9d8f';


// ─── Avatar Icon ──────────────────────────────────────────────────────────────
function AvatarIcon() {
  return (
    <View style={styles.avatarCircle}>
      {/* Head */}
      <View style={styles.avatarHead} />
      {/* Body / shoulders */}
      <View style={styles.avatarBody} />
    </View>
  );
}

export default function EditUserPage() {
    const [username, setUsername] = useState('Sample User');
    const {user, setUser} = useUser()

    const handleSave = () => {
        setUser((prev) => ({
            ...prev,
            name: username,
        }));
        Alert.alert("Username is updated successfully.")

        router.back()
    }

    const handleBack = () => {
        router.back()
    }

    return (<SafeAreaView style={styles.safe}>

        <View style={styles.content}>
            {/* Title */}
            <Text style={styles.appTitle}>WattWise</Text>

            <TouchableOpacity onPress={handleBack}>
                 <IconSymbol size={28} name="chevron.left" color='#000'/>
            </TouchableOpacity>
            {/* Avatar */}
            <View style={styles.profileSection}>
                <AvatarIcon />

                <View style={styles.form}>
                <TextInput style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={username}
                    onChangeText={setUsername}></TextInput>

                <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
                    <Text style={styles.saveBtnText}>Save</Text>
                </TouchableOpacity>
                </View>

            </View>
        </View>
    </SafeAreaView>)
}


// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111',
    marginTop: 16,
    marginBottom: 20,
  },

  form: {
    width:'70%',
  },

  // Profile
  profileSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginBottom: 10,
  },
  avatarHead: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#888',
    marginBottom: 2,
  },
  avatarBody: {
    width: 50,
    height: 30,
    borderRadius: 25,
    backgroundColor: '#888',
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111',
    marginBottom: 4,
  },
  editProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  editProfileText: {
    fontSize: 16,
    color: Colors.main.primarycolor,
    fontWeight: '500',
  },

  // User-name Input
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#111',
    marginBottom: 12,
    backgroundColor: '#fafafa',
    textAlign: 'center'
  },

  saveBtn: {
    backgroundColor: TEAL,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },

  saveBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  
});