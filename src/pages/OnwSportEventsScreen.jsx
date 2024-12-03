import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import OnwSportHeader from '../components/OnwSportHeader';
import {useNavigation} from '@react-navigation/native';
import Logo from '../assets/drawer_logo.png';
import Event_1 from '../assets/event_1.png';
import Event_2 from '../assets/event_2.png';
import Event_3 from '../assets/event_3.png';
import Event_4 from '../assets/event_4.png';
import Event_5 from '../assets/event_5.png';

const events = [
  {title: 'Итальянская ночь', image: Event_1},
  {title: 'Мастер-класс', image: Event_2},
  {title: 'Секреты', image: Event_3},
  {title: 'Футбольный вечер', image: Event_4},
  {title: 'Гастрономический тур', image: Event_5},
];

const EventButton = ({title, image, onPress}) => (
  <TouchableOpacity style={styles.button} onPress={() => onPress(image)}>
    <Text
      style={[
        styles.title,
        title === 'Итальянская ночь' && {
          backgroundColor: COLORS.white,
          color: COLORS.main,
        },
      ]}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default function () {
  const navigation = useNavigation();

  const handlePress = image => {
    navigation.navigate('DrawerNavigator', {
      screen: 'OnwSportEventDetailScreen',
      params: {image},
    });
  };

  return (
    <View style={styles.container}>
      <OnwSportHeader />

      <View style={styles.logoSection}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <View style={styles.content}>
        {events.map((event, index) => (
          <EventButton
            key={index}
            title={event.title}
            image={event.image}
            onPress={handlePress}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: COLORS.main,
  },
  logoSection: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.8,
    height: 200,
    resizeMode: 'contain',
  },
  button: {
    width: width * 0.8,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  title: {
    fontSize: 22,
    fontFamily: FONTS.black,
    color: COLORS.white,
    paddingHorizontal: 15,
    paddingVertical: 12,
    textAlign: 'left',
    borderWidth: 1,
    borderColor: COLORS.main,
    width: '100%',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  content: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingVertical: 20,
    width: width,
  },
});
