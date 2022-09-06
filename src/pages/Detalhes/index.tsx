import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import api from '../../pages/Services/api';

export interface ProductsProps {
    idProd: number;
    proDescricao: string;
    proReferencia: string;
    proAvatar: string;
}

const Detalhes = () => {
  const [produtos, setProdutos] = useState([]); 
  const idProd = 4;
  const imageUrl = require("../../assets/images/1.jpg");

  useEffect(() => {
    api.get(`detproduct/${idProd}`).then(response => { 
        setProdutos(response.data);
    }) 
  }, []);

  return (
    <View style={styles.container} >
                      
    </View>    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#76768f',
  },

  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  
});

export default Detalhes;