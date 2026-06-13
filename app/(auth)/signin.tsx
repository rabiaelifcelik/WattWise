import React, { useState } from 'react';
import {router} from 'expo-router'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

const TEAL = '#2a9d8f';

export default function SignInScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const handleContinue = () => {
    if (!email.trim()) {
      Alert.alert('Please enter your email');
      return;
    } else {
       router.push('/(tabs)/dashboard');
    }
    // Navigate to password entry or dashboard
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Logo / App name */}
        <Text style={styles.logo}>WattWise</Text>

        {/* Form section */}
        <View style={styles.formSection}>
          <Text style={styles.heading}>Sign in</Text>
          <Text style={styles.subheading}>Enter your email to sign in for this app</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            keyboardType="default"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.continueBtn} onPress={handleContinue} activeOpacity={0.85}>
            <Text style={styles.continueBtnText}>Continue</Text>
          </TouchableOpacity>

          {/* Sign up link */}
          <TouchableOpacity
            style={styles.signUpRow}
            onPress={() => {// replace navigation?.navigate('SignUp') with:
                  router.push('/(auth)/signup');}}
            activeOpacity={0.75}
          >
            <Text style={styles.signUpText}>New here? Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logo: {
    fontSize: 42,
    fontWeight: '800',
    color: '#111',
    textAlign: 'center',
    marginBottom: 48,
  },
  formSection: {
    width: '100%',
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    marginBottom: 4,
  },
  subheading: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
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
  },
  continueBtn: {
    backgroundColor: TEAL,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  continueBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  signUpRow: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  signUpText: {
    fontSize: 13,
    color: TEAL,
    fontWeight: '600',
  },
});