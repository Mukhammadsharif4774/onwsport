import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../components/AppContext';
import OnwSportCartItemComponent from '../components/OnwSportCartItemComponent';
import OnwSportButtonComponent from '../components/OnwSportButtonComponent';
import OnwSportHeader from '../components/OnwSportHeader';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import EmptyText from '../assets/cart_empty_text.png';
import EmptyIcon from '../assets/cart_empty_icon.png';

export default function () {
  const navigation = useNavigation();
  const {shouldRefresh} = useContext(AppContext);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const storedCart = await AsyncStorage.getItem('cartList');
      setCart(storedCart ? JSON.parse(storedCart) : []);
    };

    fetchCart();
  }, [shouldRefresh]);

  useEffect(() => {
    const calculatedPrice = cart.reduce(
      (sum, item) => sum + item.price * item.count,
      0,
    );
    setTotalPrice(calculatedPrice);
  }, [cart]);

  const handleOrder = () => {
    const destinationScreen = cart.length
      ? 'OnwSportCartSuccessScreen'
      : 'OnwSportHomeScreen';
    navigation.navigate('DrawerNavigator', {screen: destinationScreen});
  };

  return (
    <View style={styles.container}>
      <OnwSportHeader />

      {!cart.length && (
        <>
          <Image style={styles.empty} source={EmptyText} />
          <Image style={styles.emptyIcon} source={EmptyIcon} />
        </>
      )}

      {cart.length > 0 && (
        <>
          <View style={{height: height * 0.7}}>
            <ScrollView style={styles.flex} contentContainerStyle={styles.main}>
              {cart.map((item, index) => (
                <OnwSportCartItemComponent item={item} key={index} />
              ))}
            </ScrollView>
          </View>

          <View style={[styles.row, styles.summaryContainer]}>
            <Text style={styles.sumTitle}>Сума к оплате</Text>
            <Text style={styles.sum}>{totalPrice}$</Text>
          </View>
        </>
      )}

      <OnwSportButtonComponent
        text={cart.length ? 'ЗАКАЗАТЬ' : 'На главную'}
        style={styles.orderButton}
        onPress={handleOrder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: COLORS.white,
  },
  flex: {
    height: 200,
  },
  main: {
    paddingBottom: 100,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 40,
  },
  empty: {
    marginTop: 20,
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  emptyIcon: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  summaryContainer: {
    justifyContent: 'space-between',
    marginTop: 40,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    width,
    position: 'absolute',
    bottom: 120,
  },
  sumTitle: {
    fontSize: 20,
    fontFamily: FONTS.regular,
    color: COLORS.black,
    textAlign: 'center',
  },
  sum: {
    fontSize: 30,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    textAlign: 'center',
    marginLeft: 20,
  },
  orderButton: {
    position: 'absolute',
    bottom: 50,
  },
});
