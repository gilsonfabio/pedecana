import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Animatable.Image animation="flipInY"
                    source={require('../../assets/icone1.png')} style={{width: '100%'}} resizeMode="contain" 
                />                
            </View>   
            <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm} >
                <Text style={styles.title}>A melhor rede social, ainda é uma rodada de cerveja com os amigos!</Text>
                <Text style={styles.text}>Vamos Bebemorar hoje!</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF7826',
    },
    containerLogo: {
        flex: 2, 
        backgroundColor: '#FF7826',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#a1a1a1',
    },
    button: {
        position: 'absolute',
        backgroundColor: '#FF7826',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
        alignSelf: 'center',
        bottom: '15%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold'
    },
})