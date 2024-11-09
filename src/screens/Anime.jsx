import React, {useContext} from 'react';
import {globalStyles} from '../styles';
import Header from '../components/Header';
import {ImageBackground, View} from 'react-native';
import {GlobalContext} from '../components/GlobalContext';

export default function Anime() {
  const {lang} = useContext(GlobalContext);

  const images = {
    en: require('../assets/backgrounds/en_anime.png'),
    ru: require('../assets/backgrounds/ru_anime.png'),
    es: require('../assets/backgrounds/es_anime.png'),
    it: require('../assets/backgrounds/it_anime.png'),
    de: require('../assets/backgrounds/de_anime.png'),
    fr: require('../assets/backgrounds/fr_anime.png'),
    sw: require('../assets/backgrounds/de_anime.png'),
    pl: require('../assets/backgrounds/pl_anime.png'),
  };
  return (
    <View style={globalStyles.container}>
      <ImageBackground source={images[lang]} style={globalStyles.container}>
        <Header route={'Events'} />
      </ImageBackground>
    </View>
  );
}
