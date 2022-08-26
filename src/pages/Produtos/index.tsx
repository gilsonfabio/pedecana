import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, ImageProps } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import api from '../Services/api';

export interface ProductsProps {
    proId: string;
    proImage: ImageProps["source"];
    proDescricao: string;
}

export default function Produtos() {
    const [produtos, setProdutos] = useState<Array<ProductsProps>>([]);

    const navigation = useNavigation();
    useEffect(() => {
        api.get(`products`).then(response => {
            setProdutos(response.data);
            
        })
    },[]);

    return (
        <View style={styles.container}>
             <FlatList 
                style={{marginTop: 35}}
                contentContainerStyle={{marginHorizontal: 20}}
                data={produtos}
                keyExtractor={item => String(item.proId)}
                renderItem={({item}) => <ListItem data={item}/> }
             />
            
        </View>
    );
}


function ListItem({data}){
    return(
        <View style={styles.listItem}>
            <Text style={styles.listText}>{data.proDescricao}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    }, 
    listItem: {
        backgroundColor: '#121212',
        padding: 30,
        marginTop: 20,
        borderRadius: 10,
    }, 
    listText: {
        fontSize: 16,
        color: '#FFF',
    },    
})