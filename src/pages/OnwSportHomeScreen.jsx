import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import {AppContext} from '../components/AppContext';
import OnwSportHeader from '../components/OnwSportHeader';
import OnwSportMenuComponent from '../components/OnwSportMenuComponent';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import {onwinProducts} from '../helpers/onwinProducts';

const categories = [
  {label: 'Напитки', image: require('../assets/naputki.png')},
  {label: 'Закуска', image: require('../assets/zakuska.png')},
  {label: 'Морепродукты', image: require('../assets/moreprodukti.png')},
  {label: 'Десерт', image: require('../assets/desert.png')},
];

const OnwSportCategoryButton = ({label, active, onPress, image}) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={image} style={styles.image} />
    <Text style={active ? styles.categoryActive : styles.category}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default function OnwSportHomeScreen() {
  const [category, setCategory] = useState(0);
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);

  const handleCategoryChange = index => {
    setCategory(index);
    toggleRefresh(!shouldRefresh);
  };

  return (
    <View style={styles.container}>
      <OnwSportHeader />

      <Text style={styles.mainTitle}>Категории</Text>

      <View style={styles.categoryContainer}>
        {categories.map((item, index) => (
          <OnwSportCategoryButton
            key={index}
            label={item.label}
            active={category === index}
            onPress={() => handleCategoryChange(index)}
            image={item.image}
          />
        ))}
      </View>

      <Text style={styles.title}>{categories[category].label}</Text>

      <ScrollView style={styles.flex} contentContainerStyle={styles.main}>
        {onwinProducts[category].map((product, index) => (
          <OnwSportMenuComponent key={index} item={product} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    flex: 1,
    backgroundColor: COLORS.white,
  },
  categoryContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width,
  },
  category: {
    fontFamily: FONTS.bold,
    color: COLORS.black,
    fontSize: 16,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  categoryActive: {
    fontFamily: FONTS.bold,
    color: COLORS.white,
    fontSize: 16,
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginTop: 10,
  },
  title: {
    fontFamily: FONTS.bold,
    color: COLORS.secondary,
    fontSize: 20,
    marginLeft: 20,
    paddingHorizontal: 10,
  },
  mainTitle: {
    fontFamily: FONTS.bold,
    color: COLORS.black,
    fontSize: 24,
    textAlign: 'center',
  },
  main: {
    paddingBottom: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  image: {
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
});
