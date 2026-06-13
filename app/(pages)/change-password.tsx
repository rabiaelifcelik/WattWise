import {View, Text, TouchableOpacity, StyleSheet, TextInput, Alert} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { router } from 'expo-router';

import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

import { useUser } from '@/contexts/UserContext';
import PasswordField from '@/components/ui/PasswordField';

const TEAL = '#2a9d8f';

// Interfaces

interface PasswordForm {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
}

interface PasswordErrors {
    wrongCurrentPassword?: string,
    mismatchPassword?: string
}

export default function ChangePasswordPage() {
    const {user, setUser} = useUser()
    const [passwordForm, setPasswordForm] = useState<PasswordForm>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })


    const [errors, setErrors] = useState<PasswordErrors>({})

    const validateForm = ():PasswordErrors => {
        const errors: PasswordErrors = {}

        if (user.password !== passwordForm.currentPassword) {
            errors.wrongCurrentPassword = "Please provide the correct password."
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            errors.mismatchPassword = "The new passwords mismatch."
        }

        return errors
    }

    const updateField = (
        key: keyof PasswordForm,
        value: string
    ) => {
        setPasswordForm((prev) => ({
            ...prev,
            [key]: value
            })
        )
    }


    const handleSave = () => {

        const validationErrors = validateForm()
        if (Object.keys(validationErrors).length > 0){
            setErrors(validationErrors)
            return
        }

        setUser((prev) => ({
            ...prev, 
            password: passwordForm.currentPassword
        }))

        Alert.alert("Password has changed successfully!")

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
                
                <View style={styles.form}>
                    {/* Current Password */}
                    <PasswordField
                        label='Current Password'
                        value= {passwordForm.currentPassword}
                        error={errors.wrongCurrentPassword}
                        onChangeText={(text) => {updateField("currentPassword", text)}}
                    />

                    <PasswordField
                        label='New Password'
                        value= {passwordForm.newPassword}
                        error={errors.mismatchPassword}
                        onChangeText={(text) => {updateField("newPassword", text)}}
                    />

                    <PasswordField
                        label='Retype New Password'
                        value= {passwordForm.confirmPassword}
                        error={errors.mismatchPassword}
                        onChangeText={(text) => {updateField("confirmPassword", text)}}
                    /> 

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
    marginTop: 25,
    width:'90%',
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