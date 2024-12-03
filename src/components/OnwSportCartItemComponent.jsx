import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from './AppContext';
import {COLORS, FONTS} from '../helpers/colors';
import {onwinProductsAll} from '../helpers/onwinProducts';
import PlusIcon from '../assets/plus.png';
import MinusIcon from '../assets/minus.png';

const OnwSportCartItemComponent = ({item}) => {
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);
  const [carts, setCarts] = useState([]);

  const updateCart = async updatedCarts => {
    await AsyncStorage.setItem('cartList', JSON.stringify(updatedCarts));
    setCarts(updatedCarts);
    toggleRefresh(!shouldRefresh);
  };
  const increment = () => {
    const updatedCarts = carts.map(product =>
      product.name === item.name
        ? {...product, count: product.count + 1}
        : product,
    );
    updateCart(updatedCarts);
  };

  const decrement = () => {
    const updatedCarts = carts
      .map(product => {
        if (product.name === item.name) {
          const newCount = Math.max(product.count - 1, 0);
          return {...product, count: newCount};
        }
        return product;
      })
      .filter(product => product.count > 0); // Remove item if count is zero
    updateCart(updatedCarts);
  };

  const deleteItem = () => {
    const updatedCarts = carts.filter(product => product.name !== item.name);
    updateCart(updatedCarts);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartList = await AsyncStorage.getItem('cartList');
      setCarts(cartList ? JSON.parse(cartList) : []);
    };
    fetchCartItems();
  }, [shouldRefresh]);

  const productImage = onwinProductsAll.find(p => p.name === item.name)?.image;

  return (
    <View style={styles.container}>
      <Image source={productImage} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.row}>
          <Text style={styles.currencyText}>{`${item.price} $`}</Text>

          <View style={styles.countContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                carts.find(product => product.name === item.name)?.count > 1
                  ? decrement()
                  : deleteItem()
              }>
              <Image style={styles.plusMinus} source={MinusIcon} />
            </TouchableOpacity>

            <Text style={styles.count}>
              {carts.find(product => product.name === item.name)?.count || 0}
            </Text>

            <TouchableOpacity style={styles.actionButton} onPress={increment}>
              <Image style={styles.plusMinus} source={PlusIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: Dimensions.get('window').width * 0.3,
    height: 140,
    resizeMode: 'contain',
  },
  details: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    width: '80%',
  },
  description: {
    fontSize: 11,
    fontFamily: FONTS.light,
    color: COLORS.black,
    width: '80%',
  },
  currencyText: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.main,
    paddingVertical: 2,
    borderRadius: 25,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 15,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 15,
    borderWidth: 2,
    borderColor: COLORS.main,
    padding: 4,
    borderRadius: 25,
  },
  count: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    marginHorizontal: 20,
    color: COLORS.black,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
  },
  deleteButton: {
    marginLeft: 10,
    position: 'absolute',
    right: 10,
    top: 0,
  },
  icon: {
    width: 20,
    height: 35,
    objectFit: 'contain',
  },
  plusMinus: {
    width: 25,
    height: 25,
    objectFit: 'contain',
  },
});

export default OnwSportCartItemComponent;
