import React, { useState, useEffect} from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';

import api from '../../pages/Services/api';

export interface ProductsProps {
  iteCarId: number;
  iteCarIte: number;
  iteCarProId: number;
  iteCarProQtde: number;
  iteCarProVlrUnit: number;
  iteCarProVlrTotal: number;
}

const width = Dimensions.get('window').width - 5; 

const ListIteCar = ({ data }:any) => {

  const imageUrl = require("../../assets/images/1.jpg");
  const navigation = useNavigation();

  const [countItens, setCountItens] = useState(0);

  const images = [
    { id: 0, path: require('../../assets/images/0.jpg') },
    { id: 1, path: require('../../assets/images/1.jpg') },
    { id: 2, path: require('../../assets/images/2.jpg') },
    { id: 3, path: require('../../assets/images/3.jpg') },
    { id: 4, path: require('../../assets/images/4.jpg') },
    { id: 5, path: require('../../assets/images/5.jpg') },
    { id: 6, path: require('../../assets/images/6.jpg') },
    { id: 7, path: require('../../assets/images/7.jpg') },
    { id: 8, path: require('../../assets/images/8.jpg') },
    { id: 9, path: require('../../assets/images/9.jpg') },
    { id: 10, path: require('../../assets/images/10.jpg') },
    { id: 11, path: require('../../assets/images/11.jpg') },
    { id: 12, path: require('../../assets/images/12.jpg') },
    { id: 13, path: require('../../assets/images/13.jpg') },
    { id: 14, path: require('../../assets/images/14.jpg') },
    { id: 15, path: require('../../assets/images/15.jpg') },
    { id: 16, path: require('../../assets/images/16.jpg') },
  ];

  const onPressAdd = () => {    
    let qtdProd = 1;
    api.post('adiprocar', {   
      iteCarId: data.iteCarId,
      iteCarIte: data.iteCarIte,
      iteCarProId: data.iteCarProId,
      iteCarProQtde: data.iteCarProQtde,
      iteCarProVlrUnit: data.iteCarProVlrUnit,
      iteCarProVlrTotal: data.iteCarProVlrTotal,
    }).then(() => {
        alert('Produto adicionado com sucesso!')
    }).catch(() => {
        alert('Erro no cadastro!');
    })  
    
  }

  const onPressSub = () => {    
    let qtdProd = 1;
    api.post('subprocar', {      
      iteCarId: data.iteCarId,
      iteCarIte: data.iteCarIte,
      iteCarProId: data.iteCarProId,
      iteCarProQtde: data.iteCarProQtde,
      iteCarProVlrUnit: data.iteCarProVlrUnit,
      iteCarProVlrTotal: data.iteCarProVlrTotal,
    }).then(() => {
        alert('Produto subtraido com sucesso!')
    }).catch(() => {
        alert('Erro no cadastro!');
    })  
  }

  return (
    <View style={styles.containerProd}>
      <View style={styles.itemInfo}>
        <Text>{data.proDescricao}</Text>
        <Text>{data.proReferencia}</Text>
        <Text>{data.iteCarProQtde}</Text>
        <Text>R$ {data.iteCarProVlrTotal}</Text>
          
        <TouchableOpacity style={styles.buttonSub} onPress={onPressSub}>  
          <AntDesign name="minuscircleo" size={24} color='white' />
        </TouchableOpacity>                   
        <TouchableOpacity style={styles.buttonAdd} onPress={onPressAdd}>  
          <AntDesign name="pluscircleo" size={24} color='white' />
        </TouchableOpacity>            
        
      </View>        
    </View>  
  );
};

const styles = StyleSheet.create({  
  containerProd: { 
    width: '100%',
    backgroundColor: '#FFF',
    marginBottom: 5,
  },
  
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 5,
  },
  
  buttonAdd: {
    alignItems: 'center',
    backgroundColor: '#14aa7d',
    color: '#fff',
    padding: 2, 
    borderRadius: 50,
  },

  buttonSub: {
    alignItems: 'center',
    backgroundColor: '#9e1313',
    color: '#fff',
    padding: 2,
    borderRadius: 50,
  },

});

export default ListIteCar;
