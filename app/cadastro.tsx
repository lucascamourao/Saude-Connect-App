import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';  // Importa o axios para fazer requisições HTTP
import { useRouter } from 'expo-router';

const CadastroScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const router = useRouter();

  const handleCadastro = async () => {
    if (password !== confirmPassword) {
      alert('Erro, as senhas não coincidem');
      return;
    }
    try {
      const response = await axios.post(
        'https://443dcdec-e336-4a4f-9c44-1aae574bd8b8-00-3kkvxb9bk6khu.kirk.replit.dev/api/users/',
        {
          first_name: firstName,
          last_name: lastName,
          username: username,
          cpf: cpf,
          email: email,
          city: city,
          state: state,
          password: password
        }
      );
      alert('Sucesso, Cadastro realizado com sucesso!');
      router.push('/');  // Envia para a tela inicial (index)
    } catch (error) {
      console.log('Error registering:', error);
      alert('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/saude_conn_logo.png')}
        style={styles.reactLogo}
      />
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirme sua senha"
        value={confirmPassword}
        secureTextEntry
        onChangeText={setConfirmPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        value={state}
        onChangeText={setState}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/')}>
        <Text style={styles.signupText}>Já tem conta? <Text style={styles.linkText}>Clique aqui</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

export default CadastroScreen;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    width: width * 0.8,
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
    width: width * 0.8,
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