import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';

import api from '../../pages/Services/api';

type ParamsProps = {
  proId: string;
}

export interface ProductsProps {
    idProd: string;
    proDescricao: string;
    proReferencia: string;
    proAvatar: string;
}

const Detalhes = () => {
  const [produtos, setProdutos] = useState<Array<ProductsProps>>([]); 

  const navigation = useNavigation();
  const route = useRoute();
  const { proId } = route.params as ParamsProps;

  const imageUrl = require("../../assets/images/1.jpg");

  useEffect(() => {

    api.get(`detproduct/${proId}`).then(response => { 
        setProdutos(response.data);
    }) 
  }, []);

  const [count, setCount] = useState(0);
  const onPress = () => {
    
    setCount(prevCount => prevCount + 1);
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.txtProducts} >Detalhes do Produto:{proId} </Text>
        <TouchableOpacity onPress={() => {}} style={styles.btnCar}>
          <View style={styles.carShop}>
            <View style={styles.backQtde}>
              <Text style={styles.qtde}>{count}</Text>
            </View>  
            <FontAwesome name="shopping-cart" size={26} color="black" style={styles.iconCar} />
          </View>
        </TouchableOpacity>
      </View>    
      <View>       
        <Image source={imageUrl} style={styles.itemPhoto} />
        <Text style={styles.title}>Descrição do Produto</Text>
        <Text style={styles.subTitle}>Referencia do Produto</Text>
        <View style={styles.containerBtn} >
          <View style={styles.btnNormal}>
            <Text style={styles.txtPreNormal}>R$ 250,00</Text>
          </View>
          <TouchableOpacity style={styles.btnPromo} onPress={onPress}>  
            <Text style={styles.txtPrePromo}>R$ 190,00</Text>
          </TouchableOpacity>
        </View>  
      </View>                            
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8f0',
  },
  
  header: {
    flexDirection: 'row',
    height: 120,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FF7826',
    color: '#FFF',
  },

  icone: {
    width: 50,
    height: 50,
    color: '#000',
    fontSize: 30,
    padding: 10,
    marginTop: 35,
  },

  imgPhoto: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  orderButton: {
    width: 32,
    marginRight: 30,
  },

  list: {
    flex: 1,
  },

  txtProducts: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },

  btnCar: {

  },

  carShop: {
    marginRight: 10,
  },

  backQtde: {
    marginLeft: 10,
    alignItems: 'center',
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
  },

  qtde: {
    color: '#a30c0c',
    fontSize: 12,
    fontWeight: 'bold',
  },

  iconCar: {
    marginTop: -10,
  },

  itemPhoto:{
    resizeMode: 'contain',
    marginTop: 5,
    width: '100%',
  },

  title: {
    marginTop: 10,
    fontSize: 25,
    color: '#000',
  },

  subTitle: {
    marginTop: 10,
    fontSize: 20,
    color: '#DDD',
  },

  containerBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  btnNormal: {
    width: '50%',
    height: 40,
    backgroundColor: '#a30c0c',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  txtPreNormal: {
    color: '#fff',
    fontSize: 20,
  },

  btnPromo: {
    width: '50%',
    height: 40,
    backgroundColor: '#1c665c',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  txtPrePromo: {
    color: '#fff',
    fontSize: 25,
  },

});

export default Detalhes;