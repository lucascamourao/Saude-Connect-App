import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthResponse {
  token: string;
  id: string;
  first_name: string;
  last_name: string;
  telefone: string;
  email: string;
  cpf: string;
  username: string;
  photo_url: string;
  data_joined: string;
  city: string;
  state: string;
}

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Guardar os dados para serem usados nas outras telas
  const saveUserData = async (data: AuthResponse) => {
    try {
      await AsyncStorage.setItem('userToken', data.token);
      await AsyncStorage.setItem('userId', data.id);
      await AsyncStorage.setItem('userFirstname', data.first_name);
      await AsyncStorage.setItem('userLastname', data.last_name);
      await AsyncStorage.setItem('userPhone', data.telefone || '');
      await AsyncStorage.setItem('userEmail', data.email);
      await AsyncStorage.setItem('userCPF', data.cpf);
      await AsyncStorage.setItem('userUsername', data.username);
      await AsyncStorage.setItem('userPhotoUrl', data.photo_url);
      await AsyncStorage.setItem('userDateJoined', data.data_joined);
      await AsyncStorage.setItem('userCity', data.city);
      await AsyncStorage.setItem('userState', data.state);
      console.log('Dados de usuário salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar os dados do usuário:', error);
    }
  };

  // API recebe os dados e autoriza ou não o login
  const handleLogin = async () => {
    if (!email || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post<AuthResponse>(
        'https://5020ce9e-a549-4ad2-924b-90be61572903-00-ac9j32we209.picard.replit.dev/api/users/authentication/',
        {
          email: email,
          password: password
        }
      );

      const userData = response.data;
      await saveUserData(userData);
      
      router.replace('/(tabs)/home');
    } catch (error) {
      console.log('Erro ao fazer login:', error);
      alert('Erro, e-mail ou senha incorretos.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/saude_conn_logo.png')}
        style={styles.reactLogo}
      />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/cadastro')}>
        <Text style={styles.signupText}>Não tem conta ainda? <Text style={styles.linkText}>Clique aqui</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    width: width * 0.5,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  reactLogo: {
    width: 350,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  buttonContainer: {
    width: width * 0.5,
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  signupText: {
    marginTop: 20,
    fontSize: 16,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
