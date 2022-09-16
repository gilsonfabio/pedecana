import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import ListItem from '../../components/ListItem';

import Icon from 'react-native-vector-icons/FontAwesome';

import api from '../../pages/Services/api';
import { AuthContext } from '../../contexts/auth';

export interface ProductsProps {
    idProd: string;
    proDescricao: string;
    proReferencia: string;
    proAvatar: number;
}

const Produtos = () => {
  const [produtos, setProdutos] = useState<Array<ProductsProps>>([]); 
  const [searchText, setSearchText] = useState('');
  const [list, setList] = useState(produtos);

  const {user } = useContext(AuthContext);

  useEffect(() => {
    api.get(`products`).then(response => { 
        setProdutos(response.data);
        setList(response.data);        
    }) 
  }, []);

  useEffect(() => {
    if (searchText === '') {
      setList(produtos);
    } else {
      setList(
        produtos.filter(
          (item) =>
            item.proDescricao.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText]);

  const handleOrderClick = () => {
    let newList = [...produtos];

    newList.sort((a, b) => (a.proDescricao > b.proDescricao ? 1 : b.proDescricao > a.proDescricao ? -1 : 0));

    setList(newList);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txtProducts} >Lista de Produtos: {user.nome}</Text>
        <TouchableOpacity onPress={() => {}} style={styles.btnCar}>
          <View style={styles.carShop}>
            <View style={styles.backQtde}>
              <Text style={styles.qtde}>99</Text>
            </View>  
            <FontAwesome name="shopping-cart" size={26} color="black" style={styles.iconCar} />
          </View>
        </TouchableOpacity>  
      </View>         
      <View style={styles.searchArea}>
        <TextInput
          style={styles.input}
          placeholder="Pesquise um produto"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={(t) => setSearchText(t)}
        />
        <TouchableOpacity onPress={handleOrderClick} style={styles.orderButton}>
          <MaterialCommunityIcons
            name="order-alphabetical-ascending"
            size={32}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={list}
        style={styles.list}
        numColumns={2}
        renderItem={({ item }) => <ListItem data={item} />}
        keyExtractor={(item) => item.idProd}
      />

      <StatusBar style="light" />
    </SafeAreaView>
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

  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#363636',
    margin: 30,
    borderRadius: 5,
    fontSize: 19,
    paddingLeft: 15,
    paddingRight: 15,
    color: '#FFFFFF',
  },
  searchArea: {
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

});

export default Produtos;