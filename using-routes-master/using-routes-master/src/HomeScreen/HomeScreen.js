// src/HomeScreen/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [listas, setListas] = useState([]);

  useEffect(() => {
    carregarListas();
  }, []);

  const carregarListas = async () => {
    try {
      const listasSalvas = await AsyncStorage.getItem('listas');
      if (listasSalvas !== null) {
        setListas(JSON.parse(listasSalvas));
      }
    } catch (error) {
      console.error('Falha ao carregar as listas:', error);
    }
  };

  const excluirLista = async (id) => {
    const listasAtualizadas = listas.filter(lista => lista.id !== id);
    await AsyncStorage.setItem('listas', JSON.stringify(listasAtualizadas));
    setListas(listasAtualizadas);
  };
  const editarLista = async (id, novoNome) => {
    let listasAtualizadas = listas.map(lista => {
      if (lista.id === id) {
        return { ...lista, nome: novoNome, dataAlteracao: new Date().toISOString() };
      }
      return lista;
    });
    await AsyncStorage.setItem('listas', JSON.stringify(listasAtualizadas));
    setListas(listasAtualizadas);
  };


  const renderItem = ({ item }) => (
    <View style={styles.listaItem}>
      <Text>{item.nome}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Cadastrar Lista', {
        nomeLista: item.nome,
        id: item.id,
        editarLista: editarLista,
      })}>
        <Text>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => excluirLista(item.id)}>
        <Text>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  const adicionarLista = async (nomeLista) => {
    const novaLista = { id: Math.random().toString(36).substr(2, 9), nome: nomeLista, dataAlteracao: new Date().toISOString() };
    let listasAtualizadas = [...listas, novaLista];
    await AsyncStorage.setItem('listas', JSON.stringify(listasAtualizadas));
    setListas(listasAtualizadas);
  };

  return (
    <View style={styles.container}>
      <Button title="Adicionar Lista" onPress={() => navigation.navigate('Cadastrar Lista', {
        salvarLista: adicionarLista,
      })} />
      <FlatList
        data={listas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  listaItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  // Estilos adicionais, se necessário
});

export default HomeScreen;
