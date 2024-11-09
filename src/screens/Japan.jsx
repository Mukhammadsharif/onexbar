import React, {useContext} from 'react';
import {globalStyles} from '../styles';
import Header from '../components/Header';
import {ImageBackground, View} from 'react-native';
import {GlobalContext} from '../components/GlobalContext';

export default function Japan() {
  const {lang} = useContext(GlobalContext);

  const images = {
    en: require('../assets/backgrounds/en_japan.png'),
    ru: require('../assets/backgrounds/ru_japan.png'),
    es: require('../assets/backgrounds/es_japan.png'),
    it: require('../assets/backgrounds/it_japan.png'),
    de: require('../assets/backgrounds/de_japan.png'),
    fr: require('../assets/backgrounds/fr_japan.png'),
    sw: require('../assets/backgrounds/de_japan.png'),
    pl: require('../assets/backgrounds/pl_japan.png'),
  };
  return (
    <View style={globalStyles.container}>
      <ImageBackground source={images[lang]} style={globalStyles.container}>
        <Header route={'Events'} />
      </ImageBackground>
    </View>
  );
}
