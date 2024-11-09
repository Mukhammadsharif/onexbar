import React, {useContext} from 'react';
import {globalStyles} from '../styles';
import Header from '../components/Header';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {GlobalContext} from '../components/GlobalContext';
import {COLORS, FONTS} from '../helpers/colors';
import {useNavigation} from '@react-navigation/native';
import EventIcon from '../assets/icons/event_icon.png';

export default function Events() {
  const navigation = useNavigation();
  const {lang, translations} = useContext(GlobalContext);

  const languages = {
    cinema: {
      de: 'Familienfilmabend',
      en: 'Family Movie Night',
      es: 'Noche de cine familiar',
      fr: 'Soirée cinéma en famille',
      it: 'Serata cinema in famiglia',
      pl: 'Rodzinny seans filmowy',
      ru: 'Семейный кинопросмотр',
      sw: 'Familjefilmkväll',
    },
    japan: {
      de: 'Japanisches Mittagessen',
      en: 'Japanese Lunch',
      es: 'Almuerzo japonés',
      fr: 'Déjeuner japonais',
      it: 'Pranzo giapponese',
      pl: 'Japoński lunch',
      ru: 'Японский ланч',
      sw: 'Japansk lunch',
    },
    anime: {
      de: 'Anime-Party',
      en: 'Anime Party',
      es: 'Fiesta de anime',
      fr: 'Soirée anime',
      it: 'Festa anime',
      pl: 'Impreza anime',
      ru: 'Аниме вечеринка',
      sw: 'Animefest',
    },
    weekend: {
      de: 'Basketball-Wochenende',
      en: 'Basketball Weekend',
      es: 'Fin de semana de baloncesto',
      fr: 'Week-end de basket',
      it: 'Weekend di basket',
      pl: 'Koszykarski weekend',
      ru: 'Баскетбольный уикенд',
      sw: 'Baskethelg',
    },
  };

  return (
    <View style={globalStyles.container}>
      <Header
        text={
          translations
            ? translations.find(item => item?.en === 'Events')[lang]
            : ''
        }
      />
      <ScrollView
        style={globalStyles.scrollFlex}
        contentContainerStyle={globalStyles.scroll}>
        <TouchableOpacity
          style={[styles.container, {marginLeft: -30}]}
          onPress={() => navigation.navigate('Cinema')}>
          <ImageBackground source={EventIcon} style={styles.eventIcon}>
            <Text style={styles.name}>{languages.cinema[lang]}</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>18:00</Text>
            </View>
            <Text style={styles.date}>28.11.24</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.container,
            {alignSelf: 'flex-end', marginTop: -80, marginRight: -30},
          ]}
          onPress={() => navigation.navigate('Japan')}>
          <ImageBackground source={EventIcon} style={styles.eventIcon}>
            <Text style={styles.name}>{languages.japan[lang]}</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>14:00</Text>
            </View>
            <Text style={styles.date}>29.11.24</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.container, {marginTop: -20, marginLeft: 30}]}
          onPress={() => navigation.navigate('Anime')}>
          <ImageBackground source={EventIcon} style={styles.eventIcon}>
            <Text style={styles.name}>{languages.anime[lang]}</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>12:00</Text>
            </View>
            <Text style={styles.date}>30.11.24</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.container,
            {alignSelf: 'flex-end', marginTop: -20, marginRight: -30},
          ]}
          onPress={() => navigation.navigate('Weekend')}>
          <ImageBackground source={EventIcon} style={styles.eventIcon}>
            <Text style={styles.name}>{languages.weekend[lang]}</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>19:00</Text>
            </View>
            <Text style={styles.date}>30.11.24</Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  eventIcon: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: COLORS.brownFill,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    lineHeight: 32,
    fontFamily: FONTS.bold,
    color: COLORS.brown,
  },
  scrollView: {
    alignItems: 'center',
  },
  container: {
    marginTop: 50,
    height: 200,
    width: 200,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    position: 'relative',
  },
  name: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 25,
    marginTop: 50,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  timeContainer: {
    backgroundColor: '#3866FF',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: '33%',
    top: -20,
  },
  time: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 20,
  },
  date: {
    color: COLORS.black,
    fontFamily: FONTS.bold,
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
  },
  dateSecond: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 25,
    backgroundColor: COLORS.input,
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
});
