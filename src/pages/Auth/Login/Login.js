import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import {COLOURS, TEXTSIZE} from '../../../contants/theme';
import styles from './Login.style';
import {useNavigation} from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../../redux/actions/userAction';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(userLogin(username, password));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={styles.container}>
          <StatusBar
            barstyle={Platform.OS == 'ios' ? 'Dark-content' : 'light-content'}
            backgroundColor={COLOURS.themeGray}
          />
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>BAŞDAŞ MARKET</Text>
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Kullanıcı Adı"
                onChangeText={text => setUsername(text)}
                value={username}
              />
              <TextInput
                style={styles.input}
                placeholder="Şifre"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry
              />
            </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
              <Text style={styles.buttonText}>Giriş Yap</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
