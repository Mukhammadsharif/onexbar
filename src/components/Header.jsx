import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Text,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS} from '../helpers/colors';
import {back, myAccount} from '../helpers/languages';
import {GlobalContext} from './GlobalContext';
import AccountIcon from '../assets/icons/account_tab_icon.png';

export default function Header({
  backAction = true,
  account = true,
  route = null,
  text,
}) {
  const navigation = useNavigation();
  const {lang} = useContext(GlobalContext);

  return (
    <View style={styles.container}>
      <View>
        {text ? <Text style={styles.text}>{text.toUpperCase()}</Text> : ''}

        {backAction ? (
          <TouchableOpacity
            onPress={() => {
              if (route) {
                navigation.navigate(route);
              } else {
                navigation.goBack();
              }
            }}
            style={styles.backContainer}>
            <Text style={styles.backText}>{back[lang]}</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>

      {account ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('TabScreen', {screen: 'Account'})}
          style={styles.accountContainer}>
          <Image source={AccountIcon} style={styles.accountIcon} />
          <Text style={styles.accountText}>{myAccount[lang]}</Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 45 : 20,
  },
  backIcon: {
    width: 25,
    height: 25,
    objectFit: 'contain',
  },
  drawerIcon: {
    width: 35,
    height: 35,
    objectFit: 'contain',
  },
  text: {
    color: COLORS.black,
    fontSize: 40,
    fontFamily: FONTS.bold,
    marginLeft: 20,
  },
  backContainer: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderColor: COLORS.black,
    backgroundColor: COLORS.main,
    width: Dimensions.get('window').width / 4,
  },
  accountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    height: 50,
    borderColor: COLORS.black,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  accountIcon: {
    width: 40,
    height: 40,
  },
  accountText: {
    color: COLORS.black,
    fontSize: 24,
    fontFamily: FONTS.bold,
    marginLeft: 8,
  },
  backText: {
    fontFamily: FONTS.bold,
    fontSize: 22,
  },
});
