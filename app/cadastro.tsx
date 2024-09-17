import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const CadastroScreen = () => {
  // Variáveis a serem escritas pelo usuário.
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

  // Pega as informações escritas pelo usuário e faz o cadastro da pessoa
  const handleCadastro = async () => {
    if (password !== confirmPassword) {
      alert('Erro, as senhas não coincidem');
      return;
    }
    try {
      const response = await axios.post(
        'https://8c2ed63a-fe28-41a3-ae65-b31b19d7712b-00-n9ng9dyljd28.picard.replit.dev/api/users/',
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
      router.push('/');
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
      <View style={styles.formContainer}>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.inputHalf]}
            placeholder="Nome"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={[styles.input, styles.inputHalf]}
            placeholder="Sobrenome"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
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
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.inputHalf]}
            placeholder="Cidade"
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            style={[styles.input, styles.inputHalf]}
            placeholder="Estado"
            value={state}
            onChangeText={setState}
          />
        </View>
      </View>
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#0e0d0d',
  },
  input: {
    width: width * 0.8,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  reactLogo: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  buttonContainer: {
    width: width * 0.8,
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
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
  formContainer: {
    width: width * 0.8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  inputHalf: {
    width: '48%',
  },
});
