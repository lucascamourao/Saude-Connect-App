import { Image, StyleSheet, Text, TextInput, View, FlatList, Dimensions, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router'; // Importando useRouter
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const { width } = Dimensions.get('window');

// Todos os campos que existem em estabelecimento
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
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // navegação

  // Filtrar os estabelecimentos pela search bar
  const searchFilter = (text: string) => {
    setSearch(text);

    const newData = estabelecimentos.filter(item => {
      const itemData = `${item.nome_fantasia?.toUpperCase()} ${item.endereco_estabelecimento?.toUpperCase()} ${item.bairro_estabelecimento?.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setFilteredUnits(newData);
  };

  // Receber da API os dados 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Pegar token
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          throw new Error('Token não encontrado');
        }

        const response = await axios.get(
          'https://5020ce9e-a549-4ad2-924b-90be61572903-00-ac9j32we209.picard.replit.dev/api/establishments/',
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

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

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log('Current Location:', location);  // para depuração
      setLocation(location);
      setLoading(false);
    };

    getLocation();
  }, []);


  // Função para enviar o usuário para o google maps com o endereço do estabelecimento
  const handleOpenGoogleMaps = (endereco: string, numero: string) => {
    const formattedAddress = `${endereco} ${numero}`.replace(/\s+/g, '+');
    const url = `https://www.google.com/maps/dir/?api=1&destination=${formattedAddress}`;
    Linking.openURL(url).catch(err => console.error('Erro ao abrir o Google Maps:', err));
  };

  // enviar o id do estabelecimento
  const handleDetailsPress = (estabelecimento: Estabelecimento) => {
    router.push({
      pathname: '/estabelecimento_info',
      params: { estabelecimento: JSON.stringify(estabelecimento) },
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

        {/* <Image
          source={require('@/assets/images/map_google.webp')}
          style={styles.meuMapa}
        /> */}

        <FlatList
          data={filteredUnits}
          keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.title}>{item.nome_fantasia}</Text>
              <Text style={styles.subtitle}>Endereço: {item.endereco_estabelecimento} {item.numero_estabelecimento}</Text>
              <Text style={styles.subtitle}>Telefone: {item.numero_telefone_estabelecimento}</Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.detailsButton} onPress={() => handleDetailsPress(item)}>
                  <Text style={styles.detailsButtonText}>Ver mais informações</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.routeButton}
                  onPress={() => handleOpenGoogleMaps(item.endereco_estabelecimento, item.numero_estabelecimento)}
                >
                  <Text style={styles.routeButtonText}>Pegar a rota</Text>
                </TouchableOpacity>
              </View>
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
    backgroundColor: '#fff',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  list: {
    flexGrow: 1,
    marginVertical: 10,
  },
  reactLogo: {
    height: 178,
    width: 290,
    alignSelf: 'center',
    marginBottom: 10,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 10,
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
    marginRight: 10,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  routeButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  routeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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