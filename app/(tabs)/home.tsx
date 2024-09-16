import { Image, StyleSheet, Text, TextInput, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router'; // Importando useRouter

const { width } = Dimensions.get('window');

interface Estabelecimento {
  id: string;
  nome_fantasia: string;
  endereco_estabelecimento: string;
  bairro_estabelecimento: string;
  numero_telefone_estabelecimento: string;
  numero_estabelecimento: string;
  latitude_estabelecimento_decimo_grau: number;
  longitude_estabelecimento_decimo_grau: number;
  endereco_email_estabelecimento: string;
  codigo_cep_estabelecimento: string;
  descricao_turno_atendimento: string;
  estabelecimento_faz_atendimento_ambulatorial_sus: string;
  estabelecimento_possui_centro_cirurgico: boolean;
  estabelecimento_possui_centro_obstetrico: boolean;
  estabelecimento_possui_centro_neonatal: boolean;
  estabelecimento_possui_atendimento_hospitalar: boolean;
  estabelecimento_possui_servico_apoio: boolean;
  estabelecimento_possui_atendimento_ambulatorial: boolean;
}

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>([]);
  const [filteredUnits, setFilteredUnits] = useState<Estabelecimento[]>([]);
  const router = useRouter(); // Instância do router para navegação

  const searchFilter = (text: string) => {
    setSearch(text);

    const newData = estabelecimentos.filter(item => {
      const itemData = `${item.nome_fantasia?.toUpperCase()} ${item.endereco_estabelecimento?.toUpperCase()} ${item.bairro_estabelecimento?.toUpperCase()}`;
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

        console.log('Dados recebidos da API:', response.data);

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

  // Função para navegar para a tela de detalhes
  const handleDetailsPress = (estabelecimento: Estabelecimento) => {
    router.push({
      pathname: '/estabelecimento_info',
      params: { estabelecimento: JSON.stringify(estabelecimento) }, // Enviando o estabelecimento como parâmetro
    });
  };

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
          keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.title}>{item.nome_fantasia}</Text>
              <Text style={styles.subtitle}>Endereço: {item.endereco_estabelecimento} {item.numero_estabelecimento}</Text>
              <Text style={styles.subtitle}>Telefone: {item.numero_telefone_estabelecimento}</Text>
              
              <TouchableOpacity style={styles.detailsButton} onPress={() => handleDetailsPress(item)}>
                <Text style={styles.detailsButtonText}>Ver mais informações</Text>
              </TouchableOpacity>
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
    marginVertical: 5,
  },
  detailsButton: {
    backgroundColor: '#3498db',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
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
