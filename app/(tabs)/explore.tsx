import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, Image, Platform, FlatList, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


interface Users {
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
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          throw new Error('Token não encontrado');
        }

        const response = await axios.get(
          'http://443dcdec-e336-4a4f-9c44-1aae574bd8b8-00-3kkvxb9bk6khu.kirk.replit.dev/api/users/',
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        // Verifique a estrutura dos dados recebidos
        console.log('Dados recebidos da API - users:', response.data);

        // Verifique se os dados são um array
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.log('Resposta da API não é um array:', response.data);
        }
      } catch (error) {
        console.log('Erro ao buscar usuário:', error);
      }
    };
    fetchData();
  }, []);

  const user = users.length > 0 ? users[0] : null;

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFF', dark: '#353636' }}
      headerImage={<Image
        source={require('@/assets/images/foto_perfil.jpg')}
        style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Conta</ThemedText>
      </ThemedView>
      <ThemedText>Configurações de Conta</ThemedText>

      <Collapsible title="Informações">
        <FlatList
          data={users}
          keyExtractor={(item) => item?.first_name?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.info}>{item.first_name}</Text>
              <Text style={styles.info}>Endereço: {item.email} {item.cpf}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhum dado encontrado.</Text>}
          ListFooterComponent={<Text style={styles.footerMessage}>Fim da lista</Text>}
          style={styles.list}
        />

        <ThemedText>
          Nome: {' \n'}
          Email: {' \n'}
        </ThemedText>

        {users.length > 0 && (
          <View>
            <Text style={styles.info}>Nome: {users[0].first_name} {users[0].last_name}</Text>
            <Text style={styles.info}>Email: {users[0].email}</Text>
            <Text style={styles.info}>CPF: {users[0].cpf}</Text>
            <Text style={styles.info}>Cidade: {users[0].city}</Text>
            <Text style={styles.info}>Estado: {users[0].state}</Text>
          </View>
        )}
      </Collapsible>

      <Collapsible title="Tema">
        <ThemedText>
          For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Excluir conta">
        <ThemedText>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
          what the user's current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

      <Collapsible title="Sair da Conta">
        <ThemedText>
          For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    flex: 1,
    height: 20,
    width: 400,
    alignSelf: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  info: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  list: {
    flexGrow: 1,
    marginVertical: 10,
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
  footerMessage: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
});
