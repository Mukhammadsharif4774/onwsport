import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import QRCode from 'react-native-qrcode-svg';
import {useNavigation} from '@react-navigation/native';
import OnwSportHeader from '../components/OnwSportHeader';
import OnwSportButtonComponent from '../components/OnwSportButtonComponent';

export default function () {
  const navigation = useNavigation();

  const handleNavigateHome = () => {
    navigation.navigate('DrawerNavigator', {screen: 'OnwSportHomeScreen'});
  };

  return (
    <View style={styles.container}>
      <OnwSportHeader />

      <Text style={styles.text}>
        Спасибо за {'\n'}
        заказ!
      </Text>

      <View style={styles.qrContainer}>
        <QRCode
          value="https://www.yelp.com/search?find_desc=Sports+Bars&find_loc=Columbus%2C+OH"
          size={Dimensions.get('window').width / 2.5}
          color={COLORS.main}
        />
      </View>

      <OnwSportButtonComponent
        text="На главную"
        style={styles.button}
        onPress={handleNavigateHome}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: COLORS.white,
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
  successIcon: {
    marginTop: 20,
    width: width * 0.6,
    objectFit: 'contain',
    alignSelf: 'center',
  },
  text: {
    color: COLORS.main,
    textAlign: 'center',
    fontFamily: FONTS.black,
    fontSize: 40,
    marginTop: '25%',
  },
});
