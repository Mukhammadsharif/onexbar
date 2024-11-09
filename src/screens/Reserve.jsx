import React, {useContext, useState} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import {globalStyles} from '../styles';
import BackgroundImage from '../assets/backgrounds/background.png';
import Header from '../components/Header';
import {GlobalContext} from '../components/GlobalContext';
import {usePostRequest} from '../helpers/hooks';
import {BOOKING} from '../helpers/urls';
import {COLORS, FONTS} from '../helpers/colors';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../components/CustomButton';

export default function Reserve() {
  const {lang, translations} = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const bookingRequest = usePostRequest({url: BOOKING});
  const navigation = useNavigation();

  const booking = async () => {
    setLoading(true);
    const {response} = await bookingRequest.request();
    if (response) {
      navigation.navigate('ReserveSuccess');
      setLoading(false);
    }
  };
  return (
    <View style={globalStyles.container}>
      <ImageBackground source={BackgroundImage} style={globalStyles.container}>
        <Header
          text={translations.find(item => item?.en === 'Booking')[lang]}
          account={false}
        />

        {translations?.length ? (
          <>
            <View style={styles.main}>
              <ScrollView>
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={COLORS.textInputPlaceHolder}
                  placeholder={
                    translations.find(item => item?.en === 'Your Name')[lang]
                  }
                />

                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={COLORS.textInputPlaceHolder}
                  placeholder={
                    translations.find(item => item?.en === 'Your phone')[lang]
                  }
                />

                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={COLORS.textInputPlaceHolder}
                  placeholder={
                    translations.find(item => item?.en === 'E-mail')[lang]
                  }
                />

                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={COLORS.textInputPlaceHolder}
                  placeholder={
                    translations.find(item => item?.en === 'Select date')[lang]
                  }
                />

                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={COLORS.textInputPlaceHolder}
                  placeholder={
                    translations.find(item => item?.en === 'Select time')[lang]
                  }
                />
              </ScrollView>
            </View>

            <CustomButton
              text={translations.find(item => item?.en === 'Book now')[lang]}
              onPress={() => booking()}
              style={{
                ...globalStyles.button,
                width: '50%',
                alignSelf: 'flex-end',
              }}
            />
          </>
        ) : (
          ''
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: COLORS.brownFill,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    textAlign: 'center',
  },
  main: {
    width: '100%',
    alignSelf: 'flex-start',
    paddingVertical: 40,
    marginTop: 100,
    backgroundColor: COLORS.main,
  },
  textInput: {
    height: 50,
    backgroundColor: COLORS.white,
    width: '80%',
    marginTop: 10,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    paddingLeft: 20,
    fontSize: 25,
    fontFamily: FONTS.bold,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
});
