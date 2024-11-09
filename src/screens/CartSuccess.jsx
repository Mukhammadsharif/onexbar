import React, {useContext} from 'react';
import {GlobalContext} from '../components/GlobalContext';
import {globalStyles} from '../styles';
import BackgroundImage from '../assets/backgrounds/cart_background.png';
import Header from '../components/Header';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {COLORS, FONTS} from '../helpers/colors';

const {width, height} = Dimensions.get('window');
export default function CartSuccess({route}) {
  const {qrImage} = route.params;
  const {lang, translations} = useContext(GlobalContext);

  return (
    <View style={globalStyles.container}>
      <ImageBackground source={BackgroundImage} style={globalStyles.container}>
        <Header route={'Menu'} />

        <View style={styles.main}>
          {translations?.length ? (
            <Text style={styles.text}>
              {
                translations.find(
                  item => item?.en === 'Show this code to the waiter',
                )[lang]
              }
            </Text>
          ) : (
            ''
          )}

          {qrImage ? (
            <View style={styles.qrContainer}>
              <Image source={{uri: qrImage}} style={styles.qrImage} />
            </View>
          ) : (
            ''
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  qrContainer: {
    backgroundColor: 'white',
    width: width / 2.5,
    height: width / 2.5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 20,
  },
  qrImage: {
    width: width / 3,
    height: width / 3,
    alignSelf: 'center',
  },
  text: {
    color: COLORS.black,
    fontSize: 32,
    fontFamily: FONTS.bold,
    textAlign: 'center',
    alignSelf: 'center',
    padding: 10,
    borderBottomWidth: 2,
    borderColor: COLORS.black,
    width: '100%',
  },
  main: {
    height: height / 2,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.1,
  },
});
