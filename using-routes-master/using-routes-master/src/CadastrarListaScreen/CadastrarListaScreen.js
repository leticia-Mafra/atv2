// src/CadastrarListaScreen/CadastrarListaScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CadastrarListaScreen = ({ route, navigation }) => {
  const [nomeLista, setNomeLista] = useState('');
  const { salvarLista, id, editarLista } = route.params || {};

  useEffect(() => {
    if (route.params?.nomeLista) {
      setNomeLista(route.params.nomeLista);
    }
  }, [route.params?.nomeLista]);

  const handleSalvarLista = async () => {
    if (nomeLista) {
      if (id) {
        await editarLista(id, nomeLista);
      } else {
        await salvarLista(nomeLista);
      }
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setNomeLista}
        value={nomeLista}
        placeholder="Nome da Lista"
      />
      <Button title="Salvar Lista" onPress={handleSalvarLista} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    alignItems: 'center'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '90%',
  },
});

export default CadastrarListaScreen;
