import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
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
import ListIteCar from '../../components/ListIteCar';

import Icon from 'react-native-vector-icons/FontAwesome';

import api from '../Services/api';
import { AuthContext } from '../../contexts/auth';
import LocEntrega from '../LocEntrega';

export interface CarProps {
  carId: number;
  carData: string;
  carHora: string;
  carUser: number;
  carQtdTotal: number;
  carVlrTotal: number;
  carDesTotal: number;
  carCodCupom: string;
  carVlrPagar: number;
  carStatus: string;
  usrNome: string;
}

export interface ProductsProps {
  iteCarId: number;
  iteCarIte: number;
  iteCarProId: number;
  iteCarProQtde: number;
  iteCarProVlrUnit: number;
  iteCarProVlrTotal: number;
  proDescricao: string;
  proReerencia: string;
  proAvatar: string;
}

export interface numberCarProps {
  carId: number;
}

const CarShopping = () => {
  const [car, setCar] = useState<Array<CarProps>>([]); 
  const [items, setItems] = useState<Array<ProductsProps>>([]); 
  const [atualiza, setAtualiza] = useState(0);

  const [idCar, setIdCar] = useState(0);
  const [carData, setCarData] = useState('');
  const [carHora, setCarHora] = useState('');
  const [carUser, setCarUser] = useState(0);
  const [carQtdTotal, setCarQtdTotal] = useState(0);
  const [carVlrTotal, setCarVlrTotal] = useState(0);
  const [carDesTotal, setCarDesTotal] = useState(0);
  const [carCodCupom, setCarCodCupom] = useState(0);
  const [carVlrPagar, setCarVlrPagar] = useState(0);
  const [carStatus, setCarStatus] = useState('');
  const [usrNome, setUsrNome] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const { carId } = route.params as numberCarProps;

  const {user }:any = useContext(AuthContext) 

  useEffect(() => {
    api.get(`headerCar/${carId}`).then(response => { 
        setIdCar(response.data.carId);
        setCarData(response.data.carData);
        setCarHora(response.data.carHora);
        setCarUser(response.data.carUser);
        setCarQtdTotal(response.data.carQtdTotal);
        setCarVlrTotal(response.data.carVlrTotal);
        setCarDesTotal(response.data.carDesTotal);
        setCarCodCupom(response.data.carCodCupom);
        setCarVlrPagar(response.data.carVlrPagar);
        setCarStatus(response.data.carStatus);
        setUsrNome(response.data.carUsrNome);
    })
    api.get(`itemscar/${carId}`).then(resp => { 
      setItems(resp.data);
    })  
  }, []);

  function handleLocEntrega(){
    navigation.navigate("LocEntrega");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txtProducts} >Lista de Compras: {carId}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.txtPedido}>Nro Pedido: {idCar}</Text>
        <Text>Data: {carData} - {carHora}</Text>
      </View>    

      <FlatList
        data={items}
        style={styles.list}
        numColumns={1}
        renderItem={({ item }) => <ListIteCar data={item} />}
        keyExtractor={(item) => item.iteCarIte.toString()}
      />
      <View>
        <TouchableOpacity style={styles.button} onPress={handleLocEntrega}>
          <Text style={styles.buttonText}>Finaliza Compra</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8f0',
  },
  
  header: {
    marginBottom: 10,
    flexDirection: 'row',
    height: 120,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FF7826',
    color: '#FFF',
  },

  content: {
    marginTop:10,
    marginBottom: 10,
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

  txtPedido: {
    fontSize: 25,
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
  
  button: {
    backgroundColor: '#FF7826',
    borderRadius: 4,
    paddingVertical: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold'
  },

});

export default CarShopping;