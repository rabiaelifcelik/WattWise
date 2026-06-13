import { IconSymbol } from '@/components/ui/icon-symbol';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { red } from 'react-native-reanimated/lib/typescript/Colors';

const TEAL = '#2a9d8f';

export default function SignUpScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passVerify, setPassVerify] = useState('');

  const handleContinue = () => {
    if (!email.trim()) {
      Alert.alert('Please enter your email');
      return;
    }
    // Navigate to next step (e.g. password setup)
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
          <Text style={styles.heading}>Create an account</Text>
          <Text style={styles.subheading}>Enter your email to sign up for this app</Text>

          <TextInput
            style={styles.input}
            placeholder='username'
            placeholderTextColor="#aaa"
            autoCapitalize='none'
            value={username}
            onChangeText={setUsername}
            />

          <TextInput
            style={styles.input}
            placeholder="email@domain.com"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="password"
            placeholderTextColor="#aaa"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <TextInput
            style={styles.input}
            placeholder="password again"
            placeholderTextColor="#aaa"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            value={passVerify}
            onChangeText={setPassVerify}
          />


          <TouchableOpacity style={styles.continueBtn} onPress={handleContinue} activeOpacity={0.85}>
            <Text style={styles.continueBtnText}>Continue</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google */}
          <View style={{flexDirection:'column', alignSelf:'center', alignItems:'center'}}>
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.85} onPress={() => {}}>
              <Image 
                source={require('../../assets/images/google-signup.png')}
                style={{ width: 320, height: 48 }}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* Apple */}
            <TouchableOpacity style={styles.socialBtn} activeOpacity={0.85} onPress={() => {}}>
              <IconSymbol size={28} name="apple.logo" color='#000' />
              <Text style={styles.socialBtnText}>Continue with Apple</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Terms */}
        <View style={styles.termsRow}>
          <Text style={styles.termsText}>By clicking continue, you agree to our </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.termsLink}>Terms of Service</Text>
          </TouchableOpacity>
          <Text style={styles.termsText}>{'\n'}and </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.termsLink}>Privacy Policy</Text>
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
    marginBottom: 18,
  },
  continueBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 13,
    color: '#999',
  },
  socialBtn: {
    flexDirection: 'row',
    width:206,
    height:48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#737373',
    borderRadius: 4,
    paddingVertical: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    gap: 5,
  },
  socialBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111',
  },
  termsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 24,
  },
  termsText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  termsLink: {
    fontSize: 12,
    color: '#111',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});