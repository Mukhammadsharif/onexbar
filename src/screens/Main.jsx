import React, {useContext} from 'react';
import {ImageBackground, View} from 'react-native';
import {globalStyles} from '../styles';
import BackgroundImage from '../assets/backgrounds/main_background.png';
import MainMenuItem from '../commons/MainMenuItem';
import {GlobalContext} from '../components/GlobalContext';
import Loading from '../components/Loading';
import {menuTranslation} from '../helpers/languages';

export default function Main() {
  const {lang, translations} = useContext(GlobalContext);
  return (
    <View style={globalStyles.container}>
      <ImageBackground
        source={BackgroundImage}
        style={globalStyles.container}
        imageStyle={{width: '110%', marginLeft: -10}}>
        <View style={{marginTop: 100}} />
        {translations?.length ? (
          <>
            <MainMenuItem text={menuTranslation[lang]} route={'Menu'} />
            <MainMenuItem
              text={translations.find(item => item?.en === 'Booking')[lang]}
              route={'Reserve'}
            />
            <MainMenuItem
              text={translations.find(item => item?.en === 'Broadcasts')[lang]}
              route={'Broadcasts'}
            />
            <MainMenuItem
              text={translations.find(item => item?.en === 'Events')[lang]}
              route={'Events'}
            />
          </>
        ) : (
          <Loading />
        )}
      </ImageBackground>
    </View>
  );
}
