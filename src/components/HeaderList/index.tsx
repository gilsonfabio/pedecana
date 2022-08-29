import React from 'react';
import {useWindowDimensions, ImageBackground, StyleSheet} from 'react-native';
import { View, Text } from 'react-native-animatable';

const cover = require('../../assets/bannerHeader.png');
const dimensions = {
  with: 1200,
  height: 700,
};

const ratio = dimensions.height / dimensions.with;

export function HeaderList() {
  const window = useWindowDimensions();

  const width = window.width;
  const height = width * ratio;

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          imageStyle={styles.image}
          style={[{width, height}, styles.container]}
          source={cover}
        />      
      </View>
      <View style={styles.title}>
        <Text style={styles.text}>Lista de Produtos</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    
  },
  container: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  title: {
    backgroundColor: '#FF7826',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    alignItems: 'center',    
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',    
  },

});