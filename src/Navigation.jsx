import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {COLORS, FONTS} from './helpers/colors';
import OnwSportHomeScreen from './pages/OnwSportHomeScreen';
import OnwSportCartScreen from './pages/OnwSportCartScreen';
import OnwSportCartSuccessScreen from './pages/OnwSportCartSuccessScreen';
import OnwSportReservationScreen from './pages/OnwSportReservationScreen';
import OnwSportReservationSuccessScreen from './pages/OnwSportReserveSuccessScreen';
import OnwSportContactsScreen from './pages/OnwSportContactsScreen';
import OnwSportEventsScreen from './pages/OnwSportEventsScreen';
import OnwSportEventDetailScreen from './pages/OnwSportEventDetailScreen';
import CloseIcon from './assets/close_icon.png';
import CartIcon from './assets/drawer_cart_icon.png';
import Logo from './assets/drawer_logo.png';
import OnwSportTranslationsScreen from './pages/OnwSportTranslationsScreen';
import BackgroundImage from './assets/main_background.png';

const {width, height} = Dimensions.get('window');
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width,
          height,
          backgroundColor: COLORS.main,
        },
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {drawerScreens.map(({name, component}) => (
        <Drawer.Screen key={name} name={name} component={component} />
      ))}
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  const navigation = useNavigation();

  const drawerItems = [
    {label: 'ГЛАВНАЯ', screen: 'OnwSportHomeScreen'},
    {label: 'КОРЗИНА', screen: 'OnwSportCartScreen'},
    {label: 'ТРАНСЛЯЦИИ', screen: 'OnwSportTranslationsScreen'},
    {label: 'КОНТАКТЫ', screen: 'OnwSportContactsScreen'},
    {label: 'РЕЗЕРВ СТОЛИКА', screen: 'OnwSportReservationScreen'},
    {label: 'СОБЫТИЯ', screen: 'OnwSportEventsScreen'},
  ];

  const navigateToScreen = screen => {
    navigation.navigate('DrawerNavigator', {screen});
  };

  return (
    <ImageBackground source={BackgroundImage} style={styles.container}>
      <View style={styles.closeIconContainer}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Image source={CloseIcon} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={styles.mainContainer}>
        {drawerItems.map(({label, screen}) => (
          <TouchableOpacity
            key={screen}
            onPress={() => navigateToScreen(screen)}
            style={
              screen === 'OnwSportHomeScreen'
                ? styles.drawerItemFirst
                : styles.drawerItem
            }>
            <Text
              style={
                screen === 'OnwSportHomeScreen'
                  ? styles.itemTextFirst
                  : styles.itemText
              }>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={() => navigateToScreen('OnwSportCartScreen')}>
        <Image source={CartIcon} style={styles.cartIcon} />
      </TouchableOpacity>
    </ImageBackground>
  );
}

const drawerScreens = [
  {name: 'OnwSportHomeScreen', component: OnwSportHomeScreen},
  {name: 'OnwSportCartScreen', component: OnwSportCartScreen},
  {name: 'OnwSportCartSuccessScreen', component: OnwSportCartSuccessScreen},
  {name: 'OnwSportReservationScreen', component: OnwSportReservationScreen},
  {
    name: 'OnwSportReservationSuccessScreen',
    component: OnwSportReservationSuccessScreen,
  },
  {name: 'OnwSportContactsScreen', component: OnwSportContactsScreen},
  {name: 'OnwSportEventsScreen', component: OnwSportEventsScreen},
  {name: 'OnwSportEventDetailScreen', component: OnwSportEventDetailScreen},
  {name: 'OnwSportTranslationsScreen', component: OnwSportTranslationsScreen},
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
    height: height,
    width: width,
  },
  closeIconContainer: {
    position: 'absolute',
    left: 20,
    bottom: 40,
  },
  closeIcon: {
    width: 25,
    height: 25,
  },
  logoContainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.8,
    height: 200,
    resizeMode: 'contain',
  },
  mainContainer: {
    marginTop: 40,
    alignItems: 'flex-end',
    width: width,
  },
  drawerItemFirst: {
    justifyContent: 'center',
    width: '70%',
    marginTop: 10,
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  drawerItem: {
    justifyContent: 'center',
    width: '70%',
    marginTop: 10,
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 23,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    textAlign: 'left',
    paddingLeft: 15,
  },
  itemTextFirst: {
    fontSize: 23,
    fontFamily: FONTS.bold,
    color: COLORS.main,
    textAlign: 'left',
    paddingLeft: 15,
  },
  cartIcon: {
    width: 60,
    height: 70,
    alignSelf: 'center',
    objectFit: 'contain',
    position: 'absolute',
    top: 100,
  },
});
