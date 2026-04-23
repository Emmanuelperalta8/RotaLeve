import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { TravelContext } from '../App';

export default function ResultScreen({ navigation }) {
  const { travelData } = useContext(TravelContext);

  if (!travelData) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Nenhum cálculo foi realizado ainda.
        </Text>
        <TouchableOpacity
          style={styles.buttonBack}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Voltar para Entrada de Dados</Text>
        </TouchableOpacity>
      </View>
    );
  }


  const handleGoBack = () => {
    navigation.goBack();
  };

  const getClassificationColor = (classification) => {
    switch (classification) {
      case 'Econômica':
        return '#4CAF50';
      case 'Moderada':
        return '#FF9800';
      case 'Confortável':
        return '#2196F3';
      default:
        return '#666';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.title}>Resumo da Viagem</Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>📍 Destino</Text>
          <Text style={styles.cardValue}>{travelData.destination}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>📅 Gasto Médio por Dia</Text>
          <Text style={styles.cardValue}>R$ {travelData.mediaPorDia}</Text>
          <Text style={styles.cardSubtext}>
            Dividido igualmente entre todos os dias
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>👥 Gasto Médio por Pessoa</Text>
          <Text style={styles.cardValue}>R$ {travelData.mediaPorPesssoa}</Text>
          <Text style={styles.cardSubtext}>
            Dividido igualmente entre todas as pessoas
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>💵 Gasto por Pessoa por Dia</Text>
          <Text style={styles.cardValue}>
            R$ {travelData.mediaOrcamentoPorPessoaeDia}
          </Text>
          <Text style={styles.cardSubtext}>
            A métrica usada para classificação
          </Text>
        </View>

        <View
          style={[
            styles.card,
            styles.classificationCard,
            {
              borderLeftColor: getClassificationColor(
                travelData.classification
              ),
            },
          ]}
        >
          <Text style={styles.cardLabel}>🎯 Classificação do Orçamento</Text>
          <Text
            style={[
              styles.classificationText,
              { color: getClassificationColor(travelData.classification) },
            ]}
          >
            {travelData.classification}
          </Text>

          <Text style={styles.classificationExplanation}>
            {travelData.classification === 'Econômica' &&
              'Até R$ 80,00 por pessoa por dia - ótimo para economizar!'}
            {travelData.classification === 'Moderada' &&
              'Entre R$ 80,00 e R$ 200,00 por pessoa por dia - bom equilíbrio'}
            {travelData.classification === 'Confortável' &&
              'Acima de R$ 200,00 por pessoa por dia - viagem mais luxuosa'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.buttonBack}
          onPress={handleGoBack}
        >
          <Text style={styles.buttonText}>← Voltar e Fazer Novo Cálculo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  resultContainer: {
    padding: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 25,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardSubtext: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  classificationCard: {
    borderLeftWidth: 6,
    backgroundColor: '#fafafa',
  },
  classificationText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  classificationExplanation: {
    fontSize: 13,
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 18,
  },
  buttonBack: {
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
});
