import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, Image, FlatList, View, Dimensions, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import styles from '../../styles/cadastro';


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
      headerImage={<Image source={require('@/assets/images/foto_perfil.jpg')} style={styles.headerImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Configurações de Conta</ThemedText>
      </ThemedView>

      {user ? (
        <View style={styles.userContainer}>
          <View style={styles.userInfoCard}>
            <Ionicons name="person" size={24} color="black" />
            <Text style={styles.info}>Nome: {user.first_name} {user.last_name}</Text>
          </View>
          <View style={styles.userInfoCard}>
            <Ionicons name="mail" size={24} color="black" />
            <Text style={styles.info}>Email: {user.email}</Text>
          </View>
          <View style={styles.userInfoCard}>
            <Ionicons name="card" size={24} color="black" />
            <Text style={styles.info}>CPF: {user.cpf}</Text>
          </View>
          <View style={styles.userInfoCard}>
            <Ionicons name="location" size={24} color="black" />
            <Text style={styles.info}>Cidade: {user.city || 'Não fornecida'}, {user.state || 'Não fornecido'}</Text>
          </View>

          {/* Botão de Logout */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.emptyMessage}>Carregando dados do usuário...</Text>
      )}
    </ParallaxScrollView>
  );
}

const { width } = Dimensions.get('window');
