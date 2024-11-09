import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../components/GlobalContext';
import {useGetRequest} from '../helpers/hooks';
import {TRANSLATE} from '../helpers/urls';
import {globalStyles} from '../styles';
import BackgroundImage from '../assets/backgrounds/background.png';
import Header from '../components/Header';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {COLORS, FONTS} from '../helpers/colors';

const {width, height} = Dimensions.get('window');
export default function ReserveSuccess({route}) {
  const {lang} = useContext(GlobalContext);
  const [translations, setTranslations] = useState([]);
  const getLanguagesRequest = useGetRequest({url: TRANSLATE});

  const getLanguages = async () => {
    const {response} = await getLanguagesRequest.request();
    if (response?.length) {
      setTranslations(response);
    }
  };

  useEffect(() => {
    getLanguages();
  }, []);
  return (
    <View style={globalStyles.container}>
      <ImageBackground source={BackgroundImage} style={globalStyles.container}>
        <Header />

        <View style={styles.main}>
          {translations?.length ? (
            <Text style={styles.emptyTitle}>
              {
                translations.find(
                  item =>
                    item?.en === 'Your table has been successfully booked!',
                )[lang]
              }
            </Text>
          ) : (
            ''
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: COLORS.black,
    fontFamily: FONTS.bold,
    fontSize: 25,
    lineHeight: 32,
    textAlign: 'center',
    paddingHorizontal: 40,
    marginTop: 20,
    fontWeight: 'bold',
  },
  main: {
    height: height / 2,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    color: COLORS.black,
    fontSize: 32,
    fontFamily: FONTS.bold,
    textAlign: 'center',
    alignSelf: 'center',
    padding: 10,
    marginTop: Dimensions.get('window').height * 0.3,
    borderBottomWidth: 2,
    borderColor: COLORS.black,
    width: '100%',
  },
});
