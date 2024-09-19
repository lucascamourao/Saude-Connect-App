import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';

interface Estabelecimento {
  id: string;
  nome_fantasia: string;
  endereco_estabelecimento: string;
  numero_estabelecimento: string;
  bairro_estabelecimento: string;
  numero_telefone_estabelecimento: string;
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

interface Avaliacao {
  nota: number;
  descricao: string;
}

// Pegar o token de autorização
const gettoken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('userToken');
};

// pegar o id do usuário
const getid = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('userId');
};

const fetchAvaliacoes = async (id: string, token: string) => {
  try {
    const response = await axios.get<Avaliacao[]>(
      `https://5020ce9e-a549-4ad2-924b-90be61572903-00-ac9j32we209.picard.replit.dev/api/evaluations/`,
      {
        params: { estabelecimento: id },
        headers: { 'Authorization': `Token ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    return [];
  }
};

const enviarAvaliacao = async (idEstabelecimento: string, idUsuario: string, nota: number, descricao: string, token: string) => {
  try {
    await axios.post(
      `https://5020ce9e-a549-4ad2-924b-90be61572903-00-ac9j32we209.picard.replit.dev/api/evaluations/`,
      { estabelecimento: idEstabelecimento, usuario_avaliador: idUsuario, nota, descricao },
      { headers: { 'Authorization': `Token ${token}` } }
    );
  } catch (error) {
    console.error('Erro ao enviar avaliação:', error);
  }
};

export default function EstabelecimentoDetalhesScreen() {
  const { estabelecimento } = useLocalSearchParams();
  const estabelecimentoData = estabelecimento ? JSON.parse(estabelecimento as string) : null;

  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [nota, setNota] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    const loadAvaliacoes = async () => {
      if (estabelecimentoData?.id) {
        const token = await gettoken();
        if (token) {
          const avaliacoes = await fetchAvaliacoes(estabelecimentoData.id, token);
          setAvaliacoes(avaliacoes);
        }
      }
    };
    loadAvaliacoes();
  }, [estabelecimentoData]);

  const handleAvaliacaoSubmit = async () => {
    if (!nota || !descricao) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const token = await gettoken();
    const idUsuario = await getid();

    if (!token || !idUsuario || !estabelecimentoData?.id) {
      alert('Você precisa estar logado para enviar uma avaliação.');
      return;
    }

    await enviarAvaliacao(estabelecimentoData.id, idUsuario, parseFloat(nota), descricao, token);
    alert('Avaliação enviada com sucesso!');
    setNota('');
    setDescricao('');
    const avaliacoes = await fetchAvaliacoes(estabelecimentoData.id, token);
    setAvaliacoes(avaliacoes);
  };

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
            <Text style={styles.avaliacaoDescricao}>{item.descricao}</Text>
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
  avaliacaoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  avaliacaoNota: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  avaliacaoDescricao: {
    fontSize: 16,
    color: '#2c3e50',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 18,
    color: '#e74c3c',
    textAlign: 'center',
    marginTop: 20,
  },
});
