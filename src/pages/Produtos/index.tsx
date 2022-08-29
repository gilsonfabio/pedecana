import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { HeaderList } from '../../components/HeaderList';
import LinhasList from '../../components/LinhasList';
import ProductsItem from '../../components/ProductsItem';

export default function Produtos() {
    return(
        <View style={styles.container}>
            <HeaderList />
            <LinhasList />
            <ProductsItem />            
        </View>
    )    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },      
})