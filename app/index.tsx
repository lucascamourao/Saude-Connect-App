import React, { useState} from 'react';
import { View, TextInput, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
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

// Função para salvar dados do usuário no AsyncStorage
const salvarUserData = async (data: AuthResponse) => {
  try {
    await AsyncStorage.multiSet([
      ['userToken', data.token],
      ['userId', data.id],
      ['userFirstname', data.first_name],
      ['userLastname', data.last_name],
      ['userPhone', data.telefone || ''],
      ['userEmail', data.email],
      ['userCPF', data.cpf],
      ['userUsername', data.username],
      ['userPhotoUrl', data.photo_url],
      ['userDateJoined', data.data_joined],
      ['userCity', data.city],
      ['userState', data.state]
    ]);
    console.log('Dados de usuário salvos com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar os dados do usuário:', error);
  }
};

// Função para autenticar o usuário
const autenticar_usuario = async (email: string, password: string) => {
  try {
    const response = await axios.post<AuthResponse>(
      'https://5020ce9e-a549-4ad2-924b-90be61572903-00-ac9j32we209.picard.replit.dev/api/users/authentication/',
      { email, password }
    );
    return response.data;
  } catch (error) {
    throw new Error('Erro ao fazer login: e-mail ou senha incorretos.');
  }
};

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const userData = await autenticar_usuario(email, password);
      await salvarUserData(userData);
      router.replace('/(tabs)/home');
    } catch (error) {
      console.log(error);
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

export default LoginScreen;