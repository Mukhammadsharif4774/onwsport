import React, {useContext, useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from './AppContext';
import {COLORS, FONTS, width} from '../helpers/colors';
import PlusIcon from '../assets/plus.png';
import MinusIcon from '../assets/minus.png';

export default function ({item}) {
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);
  const navigation = useNavigation();
  const [added, setAdded] = useState(false);

  const updateCart = useCallback(async () => {
    const cartList = await AsyncStorage.getItem('cartList');
    const cartArray = cartList ? JSON.parse(cartList) : [];
    const isProductInCart = cartArray.some(cart => cart.name === item.name);
    setAdded(isProductInCart);
  }, [item.name]);

  const handleCartUpdate = async action => {
    const cartList = await AsyncStorage.getItem('cartList');
    let cartArray = cartList ? JSON.parse(cartList) : [];

    if (action === 'add') {
      if (!cartArray.some(cart => cart.name === item.name)) {
        cartArray.push({...item, count: 1});
      }
    } else if (action === 'remove') {
      cartArray = cartArray.filter(cart => cart.name !== item.name);
    }

    await AsyncStorage.setItem('cartList', JSON.stringify(cartArray));
    toggleRefresh(prev => !prev);
  };

  const toggleCart = () => {
    added ? handleCartUpdate('remove') : handleCartUpdate('add');
  };

  useEffect(() => {
    updateCart();
  }, [updateCart, shouldRefresh]);

  return (
    <View style={styles.main}>
      <Image source={item?.image} style={styles.image} />

      <Text style={styles.title}>{item?.name}</Text>
      <Text style={styles.description}>{item?.description}</Text>

      <View style={styles.row}>
        <Text style={styles.price}>{item?.price} $</Text>

        <TouchableOpacity onPress={toggleCart}>
          <Text style={styles.button}>{added ? 'Убрать' : 'Купить'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '47%',
    alignSelf: 'center',
    height: 280,
    marginTop: 15,
    justifyContent: 'space-between',
  },
  image: {
    width: '98%',
    height: 150,
    objectFit: 'contain',
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    width: '90%',
  },
  description: {
    fontSize: 12,
    fontFamily: FONTS.light,
    color: COLORS.black,
    width: '90%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  price: {
    fontSize: 15,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    paddingHorizontal: 8,
    borderRadius: 25,
    backgroundColor: COLORS.main,
    textAlign: 'center',
    verticalAlign: 'middle',
    marginRight: 15,
  },
  button: {
    backgroundColor: COLORS.main,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 25,
    color: COLORS.white,
    fontFamily: FONTS.medium,
  },
});
