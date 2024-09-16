import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';

interface Avaliacao {
  nota: number;
  detail: string;
}

export default function EstabelecimentoDetalhesScreen() {
  const { estabelecimento } = useLocalSearchParams();
  const estabelecimentoData = estabelecimento ? JSON.parse(estabelecimento as string) : null;

  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [nota, setNota] = useState('');
  const [descricao, setDescricao] = useState('');

  const fetchAvaliacoes = async () => {
    try {
      if (!estabelecimentoData || !estabelecimentoData.id) {
        console.error('ID do estabelecimento não encontrado.');
        return;
      }
  
      console.log('Buscando avaliações para ID:', estabelecimentoData.id);
  
      const token = await AsyncStorage.getItem('userToken');
      
      const response = await axios.get(
        `https://443dcdec-e336-4a4f-9c44-1aae574bd8b8-00-3kkvxb9bk6khu.kirk.replit.dev/api/evaluations/${estabelecimentoData.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      console.log('Resposta da API:', response.data);
  
      if (Array.isArray(response.data)) {
        setAvaliacoes(response.data);
      } else {
        console.error('Dados de avaliações inválidos:', response.data);
        setAvaliacoes([]);
      }
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
    }
  };

  const handleAvaliacaoSubmit = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      Alert.alert('Você precisa estar logado para enviar uma avaliação.');
      return;
    }
    if (!nota || !descricao) {
      Alert.alert('Preencha todos os campos.');
      return;
    }

    try {
      if (!estabelecimentoData || !estabelecimentoData.id) {
        console.error('ID do estabelecimento não encontrado.');
        return;
      }

      await axios.post(
        'https://443dcdec-e336-4a4f-9c44-1aae574bd8b8-00-3kkvxb9bk6khu.kirk.replit.dev/api/evaluations/',
        {
          estabelecimento_id: estabelecimentoData.id,
          nota: parseFloat(nota),
          descricao,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      Alert.alert('Avaliação enviada com sucesso!');
      setNota('');
      setDescricao('');
      fetchAvaliacoes(); 
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
    }
  };

  useEffect(() => {
    if (estabelecimentoData) {
      fetchAvaliacoes();
    }
  }, [estabelecimentoData]);

  if (!estabelecimentoData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Dados do estabelecimento não encontrados.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>{estabelecimentoData.nome_fantasia}</Text>
        <Text style={styles.info}>Endereço: {estabelecimentoData.endereco_estabelecimento}, {estabelecimentoData.numero_estabelecimento}</Text>
        <Text style={styles.info}>Bairro: {estabelecimentoData.bairro_estabelecimento}</Text>
        <Text style={styles.info}>Telefone: {estabelecimentoData.numero_telefone_estabelecimento}</Text>
        <Text style={styles.info}>Email: {estabelecimentoData.endereco_email_estabelecimento}</Text>
        <Text style={styles.info}>CEP: {estabelecimentoData.codigo_cep_estabelecimento}</Text>
        <Text style={styles.sectionTitle}>Turno de Atendimento:</Text>
        <Text style={styles.info}>{estabelecimentoData.descricao_turno_atendimento}</Text>

        <Text style={styles.sectionTitle}>Outros Detalhes:</Text>
        <Text style={styles.info}>Atendimento Ambulatorial SUS: {estabelecimentoData.estabelecimento_faz_atendimento_ambulatorial_sus}</Text>
        <Text style={styles.info}>Centro Cirúrgico: {estabelecimentoData.estabelecimento_possui_centro_cirurgico ? 'Sim' : 'Não'}</Text>
        <Text style={styles.info}>Centro Obstétrico: {estabelecimentoData.estabelecimento_possui_centro_obstetrico ? 'Sim' : 'Não'}</Text>
        <Text style={styles.info}>Centro Neonatal: {estabelecimentoData.estabelecimento_possui_centro_neonatal ? 'Sim' : 'Não'}</Text>
        <Text style={styles.info}>Atendimento Hospitalar: {estabelecimentoData.estabelecimento_possui_atendimento_hospitalar ? 'Sim' : 'Não'}</Text>
        <Text style={styles.info}>Serviço de Apoio: {estabelecimentoData.estabelecimento_possui_servico_apoio ? 'Sim' : 'Não'}</Text>
        <Text style={styles.info}>Atendimento Ambulatorial: {estabelecimentoData.estabelecimento_possui_atendimento_ambulatorial ? 'Sim' : 'Não'}</Text>
      </View>

      <Text style={styles.sectionTitle}>Avaliações</Text>
      <FlatList
        data={avaliacoes}
        keyExtractor={(item, id) => id.toString()}
        renderItem={({ item }) => (
          <View style={styles.avaliacaoCard}>
            <Text style={styles.avaliacaoNota}>Nota: {item.nota}/5</Text>
            <Text style={styles.avaliacaoDescricao}>{item.detail}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhuma avaliação encontrada.</Text>}
      />

      <Text style={styles.sectionTitle}>Deixe sua Avaliação</Text>
      <TextInput
        style={styles.input}
        placeholder="Nota (0 a 5)"
        keyboardType="numeric"
        value={nota}
        onChangeText={setNota}
        maxLength={1}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />
      <Button title="Enviar Avaliação" onPress={handleAvaliacaoSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    color: '#34495e',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2980b9',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  avaliacaoCard: {
    backgroundColor: '#ecf0f1',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  avaliacaoNota: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  avaliacaoDescricao: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});
