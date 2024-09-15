import { Image, StyleSheet, Text, TextInput, View, FlatList, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

interface Estabelecimento {
  id: string;
  nomeFantasia: string;
  endereco: string;
  bairro: string;
  telefone: string;
  latitude: number;
  longitude: number;
}

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>([]);
  const [filteredUnits, setFilteredUnits] = useState<Estabelecimento[]>([]);

  const searchFilter = (text: string) => {
    setSearch(text);

    const newData = estabelecimentos.filter(item => {
      const itemData = `${item.nomeFantasia.toUpperCase()} ${item.endereco.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setFilteredUnits(newData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          throw new Error('Token não encontrado');
        }

        const response = await axios.get(
          'https://443dcdec-e336-4a4f-9c44-1aae574bd8b8-00-3kkvxb9bk6khu.kirk.replit.dev/api/establishments/',
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        // Verifique a estrutura dos dados recebidos
        console.log('Dados recebidos da API:', response.data);

        // Verifique se os dados são um array
        if (Array.isArray(response.data)) {
          setEstabelecimentos(response.data);
          setFilteredUnits(response.data);
        } else {
          console.log('Resposta da API não é um array:', response.data);
        }
      } catch (error) {
        console.log('Erro ao buscar estabelecimentos:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/saude_conn_logo.png')}
        style={styles.reactLogo}
      />

      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar unidades de saúde..."
          onChangeText={(text) => searchFilter(text)}
          value={search}
        />

        <Image
          source={require('@/assets/images/map_google.webp')}
          style={styles.meuMapa}
        />

        <FlatList
          data={filteredUnits}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.title}>{item.nomeFantasia}</Text>
              <Text style={styles.subtitle}>Endereço: {item.endereco}</Text>
              <Text style={styles.subtitle}>Telefone: {item.telefone}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhum dado encontrado.</Text>}
          ListFooterComponent={<Text style={styles.footerMessage}>Fim da lista</Text>}
          style={styles.list}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  meuMapa: {
    height: 178,
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: 10,
    resizeMode: 'contain',
  },
  list: {
    flexGrow: 1,
    marginVertical: 10,
  },
  reactLogo: {
    height: 178,
    width: 290,
    alignSelf: 'center',
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
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