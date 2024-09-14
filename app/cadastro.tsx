import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  cadastro: undefined;
  index: undefined;
};

type CadastroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'cadastro'>;
type CadastroScreenRouteProp = RouteProp<RootStackParamList, 'cadastro'>;

type Props = {
  navigation: CadastroScreenNavigationProp;
  route: CadastroScreenRouteProp;
};

const CadastroScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCadastro = () => {
    if (password !== confirmPassword) {
      alert('Erro, as senhas não coincidem');
      return;
    }
    alert('Sucesso, Cadastro realizado com sucesso!');
    navigation.navigate('index');
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
      <TouchableOpacity style={styles.buttonContainer} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('index')}>
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
