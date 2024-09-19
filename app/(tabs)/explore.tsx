import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, Image, FlatList, View, Dimensions, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

interface UserData {
  first_name: string;
  last_name: string;
  username: string;
  cpf: string;
  email: string;
  phone: string;
  city: string;
  state: string;
}

export default function TabTwoScreen() {
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const first_name = await AsyncStorage.getItem('userFirstname');
        const last_name = await AsyncStorage.getItem('userLastname');
        const cpf = await AsyncStorage.getItem('userCPF');
        const email = await AsyncStorage.getItem('userEmail');
        const phone = await AsyncStorage.getItem('userPhone');
        const city = await AsyncStorage.getItem('userCity');
        const state = await AsyncStorage.getItem('userState');

        if (first_name && last_name && cpf && email) {
          setUser({
            first_name,
            last_name: last_name || '',
            username: last_name || '',
            cpf,
            email,
            phone: phone || '',
            city: city || '',
            state: state || '',
          });
        } else {
          console.log('Dados do usuário não encontrados no AsyncStorage.');
        }
      } catch (error) {
        console.log('Erro ao carregar dados do usuário:', error);
      }
    };
    loadUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      router.replace('/');
    } catch (error) {
      console.log('Erro ao fazer logout:', error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFF', dark: '#353636' }}
      headerImage={<Image source={require('@/assets/images/foto_perfil.jpg')} style={styles_explore.headerImage} />}
    >
      <ThemedView style={styles_explore.titleContainer}>
        <ThemedText type="title">Configurações de Conta</ThemedText>
      </ThemedView>

      {user ? (
        <View style={styles_explore.container}>
          <View style={styles_explore.userInfoCard}>
            <Ionicons name="person" size={24} color="black" />
            <Text style={styles_explore.info}>Nome: {user.first_name} {user.last_name}</Text>
          </View>
          <View style={styles_explore.userInfoCard}>
            <Ionicons name="mail" size={24} color="black" />
            <Text style={styles_explore.info}>Email: {user.email}</Text>
          </View>
          <View style={styles_explore.userInfoCard}>
            <Ionicons name="card" size={24} color="black" />
            <Text style={styles_explore.info}>CPF: {user.cpf}</Text>
          </View>
          <View style={styles_explore.userInfoCard}>
            <Ionicons name="location" size={24} color="black" />
            <Text style={styles_explore.info}>Cidade: {user.city || 'Não fornecida'}, {user.state || 'Não fornecido'}</Text>
          </View>

          {/* Botão de Logout */}
          <TouchableOpacity style={styles_explore.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text style={styles_explore.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles_explore.emptyMessage}>Carregando dados do usuário...</Text>
      )}
    </ParallaxScrollView>
  );
}

const styles_explore = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  headerImage: {
    flex: 1,
    height: 200,
    width: 400,
    alignSelf: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  userContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  userInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    width: width * 0.9,  // Ajuste usando a largura da tela
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  info: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d9534f',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    width: width * 0.4,  // Ajuste usando a largura da tela
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});