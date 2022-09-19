import React, { useState, useEffect,  useContext  } from 'react';
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
import { AuthContext } from '../../contexts/auth';
import moment from 'moment';

import api from '../../pages/Services/api';

type ParamsProps = {
  proId: number;
  idProduto: number;
  proDescricao: string;
  proReferencia: string;
  proPreNormal: number; 
}

type AvatarProps = {
  proAvatar: number;
}

type UserProps = {
    idUsr: number;
    nome: string;
    email: string;
    status: string;
  }

const Detalhes = () => {
  const [idProduto, setIdProduto] = useState('');
  const [proDescricao, setProDescricao] = useState('');
  const [proReferencia, setProReferencia] = useState('');
  const [proPreNormal, setProPreNormal] = useState('');
  const [proPrePromo, setProPrePromo] = useState('');
  const [proQtdEstoque, setProQtdEstoque] = useState('');
  const [proAvatar, setProAvatar] = useState(0);


  const [carData, setCarData] = useState();
  const [carHora, setCarHora] = useState();
  const [carUser, setCarUser] = useState();
  const [carQtdTotal, setCarQtdTotal] = useState();
  const [carVlrTotal, setCarVlrTotal] = useState();
  const [carDesTotal, setCarDesTotal] = useState();
  const [carCodCupom, setCarCodCupom] = useState();
  const [carVlrPagar, setCarVlrPagar] = useState();
  const [iteCarProId, setIteCarProId] = useState();
  const [iteCarProQtde, setIteCarProQtde] = useState();
  const [iteCarProVlrUnit, setIteCarProVlrUnit] = useState();
  const [iteCarProVlrtotal, setIteCarProVlrtotal] = useState();


  const navigation = useNavigation();
  const route = useRoute();
  const { proId } = route.params as ParamsProps;
  
  const {user } = useContext(AuthContext);
  
  const imageUrl = require("../../assets/images/1.jpg");

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


  useEffect(() => {

    api.get(`detproduct/${proId}`).then(response => { 
        setIdProduto(response.data.idProd);
        setProDescricao(response.data.proDescricao);
        setProReferencia(response.data.proReferencia);
        setProPreNormal(response.data.proPreVenda);
        //setProPrePromo(response.data.proPrePromo);
        //setProQtdEstoque(response.data.proQtdEstoque);
        setProAvatar(response.data.proAvatar);
    }) 
  }, []);

  const [count, setCount] = useState(0);
  const onPress = () => {    
    setCount(prevCount => prevCount + 1);
    
    let qtdProd = 1;
    let dataAtual = new Date()
    let desconto = 0;
    let cupom = "";


    api.post('newprocar', {
        carData: new Date(),
        carHora: moment().format('LTS'), 
        carUser: user.idUsr, 
        carQtdTotal: qtdProd, 
        carVlrTotal: proPreNormal, 
        carDesTotal: desconto, 
        carCodCupom: cupom, 
        carVlrPagar: proPreNormal,
        iteCarProId: proId, 
        iteCarProQtde: qtdProd, 
        iteCarProVlrUnit: proPreNormal, 
    }).then(() => {
        alert('Produto separado com sucesso!')
    }).catch(() => {
        alert('Erro no cadastro!');
    })  
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.txtProducts} >Detalhes do Produto:{proId} - {idProduto} </Text>
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
        <Image source={images[proAvatar].path} resizeMode="cover" />
        <Text>{idProduto} - {proDescricao}</Text>
        <Text>{proReferencia}</Text>
        <View>
          <View>
            <Text>R$ {proPreNormal}</Text>
          </View>
          <TouchableOpacity onPress={onPress}>  
            <Text>R$ {proPrePromo}</Text>
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
    resizeMode: 'couver',
    marginTop: 5,
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