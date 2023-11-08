import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CadastrarListaScreen = ({ route, navigation }) => {
    const { nomeLista } = route.params;

  const handleEditarLista = () => {
    // Implemente a lógica para editar a lista
    // Pode abrir uma nova tela para edição ou exibir um modal, por exemplo
  }

  return (
    <View>
      <Text>{nomeLista}</Text>
      <TouchableOpacity onPress={handleEditarLista}>
        <Icon name="edit" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
}


export default CadastrarListaScreen;
