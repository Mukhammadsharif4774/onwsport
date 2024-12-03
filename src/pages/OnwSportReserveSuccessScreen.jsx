import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import {useNavigation} from '@react-navigation/native';
import OnwSportHeader from '../components/OnwSportHeader';
import OnwSportButtonComponent from '../components/OnwSportButtonComponent';
import Smile from '../assets/smile.png';

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
        резерв!
      </Text>

      <Image
        source={Smile}
        style={{
          alignSelf: 'center',
          width: width * 0.5,
          height: width * 0.5,
          objectFit: 'contain',
          marginTop: 40,
        }}
      />

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
  title: {
    textAlign: 'center',
    fontFamily: FONTS.black,
    color: COLORS.white,
    fontSize: 30,
    marginTop: Dimensions.get('window').height * 0.1,
    paddingVertical: 30,
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
  text: {
    color: COLORS.main,
    textAlign: 'center',
    fontFamily: FONTS.black,
    fontSize: 40,
    marginTop: '25%',
  },
});
