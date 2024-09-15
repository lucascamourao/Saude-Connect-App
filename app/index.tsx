import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthResponse {
  token: string;
}

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post<AuthResponse>(
        'https://443dcdec-e336-4a4f-9c44-1aae574bd8b8-00-3kkvxb9bk6khu.kirk.replit.dev/api/users/authentication/',
        {
          email: email,
          password: password
        }
      );

      // Agora o TypeScript sabe que response.data tem um token
      const { token } = response.data;
      console.log('Token recebido:', token); // Verifique o valor do token

      if (token) {
        await AsyncStorage.setItem('userToken', token);
      } else {
        console.log('Token não recebido');
      }
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