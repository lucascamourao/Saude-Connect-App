import { Image, StyleSheet, Platform, TextInput, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import MapView, { Marker } from 'react-native-maps';
import { ListItem } from 'react-native-elements';

const healthUnits = [
  {
    id: '1',
    name: 'Unidade de Saúde 1',
    description: 'Atendimento clínico geral e emergencial',
    latitude: -23.55052,
    longitude: -46.633308
  },
  {
    id: '2',
    name: 'Posto de Saúde 2',
    description: 'Consultas pediátricas e ginecológicas',
    latitude: -23.559616,
    longitude: -46.631386
  },
  {
    id: '3',
    name: 'Posto de Saúde 3',
    description: 'Consultas pediátricas e ginecológicas',
    latitude: -23.559616,
    longitude: -46.631386
  },
  {
    id: '4',
    name: 'Posto de Saúde 4',
    description: 'Consultas pediátricas e ginecológicas',
    latitude: -23.559616,
    longitude: -46.631386
  },
  {
    id: '5',
    name: 'Posto de Saúde 5',
    description: 'Atendimento clínico geral e emergencial',
    latitude: -23.559616,
    longitude: -46.631386
  },

];

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [filteredUnits, setFilteredUnits] = useState(healthUnits);

  const searchFilter = (text: string) => {
    setSearch(text);

    // Filtra as unidades de saúde com base no texto de busca
    const newData = healthUnits.filter(item => {
      const itemData = `${item.name.toUpperCase()} ${item.description.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setFilteredUnits(newData);
  };

  return (

    <ParallaxScrollView
      headerBackgroundColor={{ light: '#f6f9fa', dark: '#fafafa' }}
      headerImage={
        <Image
          source={require('@/assets/images/saude_conn_logo.png')}
          style={styles.reactLogo}
        />
      }>

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
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                <ListItem.Subtitle>Localização: {item.latitude}, {item.longitude}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )}
          style={styles.list}
        />

      </View>



    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  mapContainer: {
    height: 300,
    marginBottom: 10,
  },
  map: {
    flex: 1,
  },
  list: {
    flex: 1,
    marginVertical: 10,
    maxHeight: 400,
  },
  reactLogo: {
    height: 178,
    width: 290,
    alignSelf: 'center',
  },
  meuMapa: {
    height: 178,
    width: 290,
    alignSelf: 'center',
    marginTop: 10,
  }
});