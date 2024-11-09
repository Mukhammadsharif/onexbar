import React, {useContext} from 'react';
import {globalStyles} from '../styles';
import Header from '../components/Header';
import {ImageBackground, View} from 'react-native';
import {GlobalContext} from '../components/GlobalContext';

export default function Weekend() {
  const {lang} = useContext(GlobalContext);

  const images = {
    en: require('../assets/backgrounds/en_weekend.png'),
    ru: require('../assets/backgrounds/ru_weekend.png'),
    es: require('../assets/backgrounds/es_weekend.png'),
    it: require('../assets/backgrounds/it_weekend.png'),
    de: require('../assets/backgrounds/de_weekend.png'),
    fr: require('../assets/backgrounds/fr_weekend.png'),
    sw: require('../assets/backgrounds/de_weekend.png'),
    pl: require('../assets/backgrounds/pl_weekend.png'),
  };
  return (
    <View style={globalStyles.container}>
      <ImageBackground source={images[lang]} style={globalStyles.container}>
        <Header route={'Events'} />
      </ImageBackground>
    </View>
  );
}
