import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { TravelContext } from '../App';

export default function HomeScreen({ navigation }) {
  const [destino, setdestino] = useState('');
  const [orcamento, setorcamento] = useState('');
  const [qtdias, setqtdias] = useState('');
  const [pessoas, setpessoas] = useState('');
  const [errors, setErrors] = useState({});

  const { setTravelData } = useContext(TravelContext);

  const validateInputs = () => {
    const newErrors = {};

    if (!destino.trim()) {
      newErrors.destino = 'O destino é obrigatório.';
    }

    if (!orcamento.trim()) {
      newErrors.orcamento = 'O orçamento é obrigatório.';
    } else if (isNaN(parseFloat(orcamento)) || parseFloat(orcamento) <= 0) {
      newErrors.orcamento = 'Informe um valor maior que zero.';
    }

    if (!qtdias.trim()) {
      newErrors.qtdias = 'A quantidade de dias é obrigatória.';
    } else if (isNaN(parseInt(qtdias)) || parseInt(qtdias) <= 0) {
      newErrors.qtdias = 'Informe um número maior que zero.';
    }

    if (!pessoas.trim()) {
      newErrors.pessoas = 'O número de pessoas é obrigatório.';
    } else if (isNaN(parseInt(pessoas)) || parseInt(pessoas) <= 0) {
      newErrors.pessoas = 'Informe um número maior que zero.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const classifyorcamento = (mediaOrcamentoPorPessoaeDia) => {
    if (mediaOrcamentoPorPessoaeDia <= 80) return 'Econômica';
    else if (mediaOrcamentoPorPessoaeDia <= 200) return 'Moderada';
    else return 'Confortável';
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;

    const orcamentoNum = parseFloat(orcamento);
    const qtdiasNum = parseInt(qtdias);
    const pessoasNum = parseInt(pessoas);

    const mediaPorDia = orcamentoNum / qtdiasNum;
    const mediaPorPesssoa = orcamentoNum / pessoasNum;
    const mediaOrcamentoPorPessoaeDia = orcamentoNum / (pessoasNum * qtdiasNum);

    const resultData = {
      destino: destino.trim(),
      mediaPorDia: mediaPorDia.toFixed(2),
      mediaPorPesssoa: mediaPorPesssoa.toFixed(2),
      mediaOrcamentoPorPessoaeDia: mediaOrcamentoPorPessoaeDia.toFixed(2),
      classification: classifyorcamento(mediaOrcamentoPorPessoaeDia),
    };

    setTravelData(resultData);
    navigation.navigate('TelaCalculos');
  };

  const handleClear = () => {
    setdestino('');
    setorcamento('');
    setqtdias('');
    setpessoas('');
    setErrors({});
    setTravelData(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Orçamento de viagem</Text>
          <Text style={styles.description}>
            Preencha os dados abaixo para calcular o custo estimado
          </Text>
        </View>

        <View style={styles.form}>
          <InputField
            label="Destino"
            placeholder="Ex: Salvador"
            value={destino}
            onChangeText={(text) => {
              setdestino(text);
              if (errors.destino) setErrors((e) => ({ ...e, destino: null }));
            }}
            keyboardType="default"
            error={errors.destino}
          />

          <InputField
            label="Orçamento total"
            placeholder="Ex: 5000"
            value={orcamento}
            onChangeText={(text) => {
              setorcamento(text);
              if (errors.orcamento) setErrors((e) => ({ ...e, orcamento: null }));
            }}
            keyboardType="decimal-pad"
            error={errors.orcamento}
          />

          <InputField
            label="Dias de viagem"
            placeholder="Ex: 10"
            value={qtdias}
            onChangeText={(text) => {
              setqtdias(text);
              if (errors.qtdias) setErrors((e) => ({ ...e, qtdias: null }));
            }}
            keyboardType="number-pad"
            error={errors.qtdias}
          />

          <InputField
            label="Número de pessoas"
            placeholder="Ex: 3"
            value={pessoas}
            onChangeText={(text) => {
              setpessoas(text);
              if (errors.pessoas) setErrors((e) => ({ ...e, pessoas: null }));
            }}
            keyboardType="number-pad"
            error={errors.pessoas}
          />
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleCalculate}>
            <Text style={styles.primaryButtonText}>Calcular</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleClear}>
            <Text style={styles.secondaryButtonText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

function InputField({ label, placeholder, value, onChangeText, keyboardType, error }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
      {error && <Text style={styles.errorText}>⚠ {error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  content: { paddingHorizontal: 20, paddingTop: 40, paddingBottom: 40 },
  header: { marginBottom: 40 },
  title: { fontSize: 28, fontWeight: '700', color: '#000', marginBottom: 12 },
  description: { fontSize: 15, color: '#666', lineHeight: 22 },
  form: { marginBottom: 40 },
  inputGroup: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: '500', color: '#333', marginBottom: 8, letterSpacing: 0.2 },
  input: {
    fontSize: 16,
    color: '#000',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: 'transparent',
  },
  inputError: {
    borderBottomColor: '#e53935', // borda vermelha no campo com erro
  },
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: '#e53935',
  },
  actions: { gap: 12 },
  primaryButton: { backgroundColor: '#000', paddingVertical: 14, borderRadius: 4, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontSize: 15, fontWeight: '600', letterSpacing: 0.3 },
  secondaryButton: { paddingVertical: 14, borderRadius: 4, borderWidth: 1, borderColor: '#ddd', alignItems: 'center' },
  secondaryButtonText: { color: '#666', fontSize: 15, fontWeight: '500', letterSpacing: 0.3 },
});