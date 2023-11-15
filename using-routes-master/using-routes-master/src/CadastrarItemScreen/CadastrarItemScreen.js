import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const CadastrarItemScreen = ({ route, navigation }) => {
  const [nomeItem, setNomeItem] = useState('');
  const { idLista } = route.params; 
  const salvarItemNaLista = async () => {
    try {
      const listasSalvas = await AsyncStorage.getItem('listas');
      let listas = listasSalvas ? JSON.parse(listasSalvas) : [];
      const indexLista = listas.findIndex(lista => lista.id === idLista);
      if (indexLista !== -1) {
        const novoItem = { id: Date.now(), nome: nomeItem, dataAlteracao: new Date() };
        listas[indexLista].itens.push(novoItem);
        await AsyncStorage.setItem('listas', JSON.stringify(listas));
        navigation.goBack();
      } else {
        
      }
    } catch (error) {
      
      console.error('Falha ao salvar o item:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setNomeItem}
        value={nomeItem}
        placeholder="Nome do Item"
      />
      <Button title="Salvar Item" onPress={salvarItemNaLista} />
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

export default CadastrarItemScreen;
