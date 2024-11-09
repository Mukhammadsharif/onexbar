import React, {useContext} from 'react';
import {globalStyles} from '../styles';
import Header from '../components/Header';
import {ImageBackground, View} from 'react-native';
import {GlobalContext} from '../components/GlobalContext';

export default function Cinema() {
  const {lang} = useContext(GlobalContext);

  const images = {
    en: require('../assets/backgrounds/en_family.png'),
    ru: require('../assets/backgrounds/ru_family.png'),
    es: require('../assets/backgrounds/es_family.png'),
    it: require('../assets/backgrounds/it_family.png'),
    de: require('../assets/backgrounds/de_family.png'),
    fr: require('../assets/backgrounds/fr_family.png'),
    sw: require('../assets/backgrounds/de_family.png'),
    pl: require('../assets/backgrounds/pl_family.png'),
  };
  return (
    <View style={globalStyles.container}>
      <ImageBackground source={images[lang]} style={globalStyles.container}>
        <Header route={'Events'} />
      </ImageBackground>
    </View>
  );
}
