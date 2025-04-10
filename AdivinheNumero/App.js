import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native';

export default function App() {
  const [numeroAleatorio, setNumeroAleatorio] = useState(Math.floor(Math.random() * 100) + 1);
  const [palpite, setPalpite] = useState('');
  const [tentativas, setTentativas] = useState(0);
  const [mensagem, setMensagem] = useState('Tente adivinhar um número entre 1 e 100');
  const [feedback, setFeedback] = useState('');
  const [jogoAtivo, setJogoAtivo] = useState(true);

  const verificarPalpite = () => {
    if (!jogoAtivo) return;
    
    const palpiteNum = parseInt(palpite);
    
    if (isNaN(palpiteNum) || palpiteNum < 1 || palpiteNum > 100) {
      Alert.alert('Valor inválido', 'Por favor, digite um número entre 1 e 100');
      return;
    }

    const novasTentativas = tentativas + 1;
    setTentativas(novasTentativas);

    if (palpiteNum === numeroAleatorio) {
      setFeedback(`Você acertou em ${novasTentativas} tentativas!`);
      setJogoAtivo(false);
      Alert.alert(
        'Parabéns!',
        `Você acertou em ${novasTentativas} tentativas!`,
        [{ text: 'OK', onPress: reiniciarJogo }]
      );
    } else if (novasTentativas >= 5) {
      setFeedback(`Game Over! O número era ${numeroAleatorio}`);
      setJogoAtivo(false);
      Alert.alert(
        'Game Over',
        `Suas tentativas acabaram! O número era ${numeroAleatorio}`,
        [{ text: 'OK', onPress: reiniciarJogo }]
      );
    } else {
      const dica = palpiteNum < numeroAleatorio ? 'maior' : 'menor';
      setFeedback(`O número é ${dica} que ${palpiteNum}`);
      setMensagem(`Tentativa ${novasTentativas} de 5`);
    }
    
    setPalpite('');
  };

  const reiniciarJogo = () => {
    setNumeroAleatorio(Math.floor(Math.random() * 100) + 1);
    setPalpite('');
    setTentativas(0);
    setMensagem('Tente adivinhar um número entre 1 e 100');
    setFeedback('');
    setJogoAtivo(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo de Adivinhação</Text>
      <Text style={styles.hint}>{mensagem}</Text>
      
      {feedback ? (
        <Text style={[
          styles.feedback,
          feedback.includes('acertou') ? styles.success : 
          feedback.includes('Game Over') ? styles.error : styles.hint
        ]}>
          {feedback}
        </Text>
      ) : null}
      
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={setPalpite}
        value={palpite}
        placeholder="Digite seu palpite (1-100)"
        editable={jogoAtivo}
      />
      
      <Pressable
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: pressed ? '#45a049' : '#4CAF50',
            opacity: jogoAtivo ? 1 : 0.6
          }
        ]}
        onPress={verificarPalpite}
        disabled={!jogoAtivo}
      >
        <Text style={styles.buttonText}>Verificar Palpite</Text>
      </Pressable>
      
      <Text style={styles.attempts}>Tentativas: {tentativas}/5</Text>
      
      {!jogoAtivo && (
        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: pressed ? '#f44336' : '#ff5722',
              marginTop: 10
            }
          ]}
          onPress={reiniciarJogo}
        >
          <Text style={styles.buttonText}>Jogar Novamente</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  hint: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  feedback: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  success: {
    color: '#4CAF50',
  },
  error: {
    color: '#f44336',
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#4CAF50',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  attempts: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});