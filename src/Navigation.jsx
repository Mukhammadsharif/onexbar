import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, View, Image} from 'react-native';
import {GlobalContext} from './components/GlobalContext';
import {COLORS, FONTS} from './helpers/colors';
import Main from './screens/Main';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainTabIcon from './assets/icons/main_tab_icon.png';
import AccountTabIcon from './assets/icons/account_tab_icon.png';
import CartTabIcon from './assets/icons/cart_tab_icon.png';
import Account from './screens/Account';
import Menu from './screens/Menu';
import Cart from './screens/Cart';
import CartSuccess from './screens/CartSuccess';
import Reserve from './screens/Reserve';
import ReserveSuccess from './screens/ReserveSuccess';
import Translations from './screens/Translations';
import Events from './screens/Events';
import Cinema from './screens/Cinema';
import Japan from './screens/Japan';
import Anime from './screens/Anime';
import Weekend from './screens/Weekend';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen component={TabScreen} name="TabScreen" />
        <Stack.Screen component={Menu} name="Menu" />
        <Stack.Screen component={CartSuccess} name="CartSuccess" />
        <Stack.Screen component={Reserve} name="Reserve" />
        <Stack.Screen component={ReserveSuccess} name="ReserveSuccess" />
        <Stack.Screen component={Translations} name="Broadcasts" />
        <Stack.Screen component={Events} name="Events" />
        <Stack.Screen component={Cinema} name="Cinema" />
        <Stack.Screen component={Japan} name="Japan" />
        <Stack.Screen component={Anime} name="Anime" />
        <Stack.Screen component={Weekend} name="Weekend" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const TabScreen = ({navigation}) => {
  const {lang, translations} = useContext(GlobalContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingHorizontal: 10,
          backgroundColor: COLORS.main,
          height: 80,
        },
        tabBarLabelStyle: {
          fontFamily: FONTS.bold,
          fontSize: 20,
          marginTop: 10,
          fontWeight: 'bold',
        },
        tabBarHideOnKeyboard: true,
        gestureEnabled: false,
      }}>
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                backgroundColor: COLORS.white,
                width: 115,
                height: 115,
                borderRadius: 90,
                marginBottom: -10,
              }}>
              <Image source={AccountTabIcon} style={styles.accountTabIcon} />
            </View>
          ),
          tabBarLabel: translations.length
            ? translations?.find(item => item?.en === 'Account')[lang]
            : '',
          tabBarActiveTintColor: COLORS.black,
          tabBarInactiveTintColor: COLORS.inactiveBlack,
        }}
      />

      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                backgroundColor: COLORS.white,
                borderRadius: 90,
                width: 115,
                height: 115,
                marginBottom: -10,
              }}>
              <Image source={MainTabIcon} style={styles.mainTabIcon} />
            </View>
          ),
          tabBarLabel: translations.length
            ? translations?.find(item => item?.en === 'Home')[lang]
            : '',
          tabBarActiveTintColor: COLORS.black,
          tabBarInactiveTintColor: COLORS.inactiveBlack,
        }}
      />

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                backgroundColor: COLORS.white,
                borderRadius: 90,
                width: 115,
                height: 115,
                marginBottom: -10,
              }}>
              <Image source={CartTabIcon} style={styles.cartTabIcon} />
            </View>
          ),
          tabBarLabel: translations.length
            ? translations?.find(item => item?.en === 'Cart')[lang]
            : '',
          tabBarActiveTintColor: COLORS.black,
          tabBarInactiveTintColor: COLORS.inactiveBlack,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  mainTabIcon: {
    width: 60,
    height: 60,
    objectFit: 'contain',
    marginTop: 10,
  },
  accountTabIcon: {
    width: 70,
    height: 70,
    objectFit: 'contain',
    marginTop: 10,
  },
  cartTabIcon: {
    width: 75,
    height: 75,
    objectFit: 'contain',
    marginTop: 10,
  },
});
