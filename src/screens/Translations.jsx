import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../components/GlobalContext';
import {useGetRequest} from '../helpers/hooks';
import {BROADCASTS} from '../helpers/urls';
import {globalStyles} from '../styles';
import BackgroundImage from '../assets/backgrounds/background.png';
import Header from '../components/Header';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import {COLORS, FONTS} from '../helpers/colors';
import Loading from '../components/Loading';
import BroadCastIcon from '../assets/icons/broadcast_icon.png';

export default function Translations() {
  const {lang, translations} = useContext(GlobalContext);
  const [broadcasts, setBroadcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const broadcastsRequest = useGetRequest({url: BROADCASTS});

  const getBroadcasts = async () => {
    const {response} = await broadcastsRequest.request();
    if (response?.length) {
      setBroadcasts(response);
    }
  };

  useEffect(() => {
    getBroadcasts();
  }, []);

  return (
    <View style={globalStyles.container}>
      <ImageBackground source={BackgroundImage} style={globalStyles.container}>
        <Header />

        {translations?.length && broadcasts?.length ? (
          <>
            <ScrollView
              style={globalStyles.scrollFlex}
              contentContainerStyle={globalStyles.scroll}>
              {broadcasts?.map((item, index) => (
                <View key={index} style={styles.container}>
                  <Text style={styles.title}>{item?.liga}</Text>
                  <View style={styles.row}>
                    <View style={styles.left}>
                      <Text style={styles.league}>{item?.team1}</Text>

                      <Text style={styles.league}>{item?.team2}</Text>

                      <Image source={BroadCastIcon} style={styles.icon} />
                    </View>

                    <View style={styles.right}>
                      <Text style={styles.date}>{item?.date}</Text>
                      <Text style={styles.time}>{item?.time}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </>
        ) : (
          ''
        )}
      </ImageBackground>

      {!translations?.length || loading ? <Loading /> : ''}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    color: COLORS.black,
    textAlign: 'center',
    fontSize: 28,
    fontFamily: FONTS.bold,
  },
  league: {
    color: COLORS.white,
    fontSize: 28,
    fontFamily: FONTS.bold,
    marginTop: 5,
  },
  row: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 25,
  },
  left: {
    backgroundColor: COLORS.main,
    width: '70%',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    paddingLeft: 20,
    position: 'relative',
    height: 80,
  },
  right: {
    backgroundColor: '#3866FF',
    width: '20%',
    borderRadius: 12,
    height: 80,
  },
  icon: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 5,
  },
  date: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: FONTS.bold,
    backgroundColor: COLORS.blue500,
    padding: 5,
    borderRadius: 25,
  },
  time: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 24,
    fontFamily: FONTS.bold,
    backgroundColor: COLORS.input,
    padding: 5,
    borderRadius: 25,
  },
});
