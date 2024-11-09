import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
} from 'react-native';
import {globalStyles} from '../styles';
import {COLORS, FONTS} from '../helpers/colors';
import {addressLang, back, languageList, phoneLang} from '../helpers/languages';
import {GlobalContext} from '../components/GlobalContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {avatars} from '../helpers/avatars';
import Avatars from '../components/Avatars';
import EditIcon from '../assets/icons/edit_icon.png';
import PersonIcon from '../assets/icons/persob_icon.png';
import LanguageIcon from '../assets/icons/language_icon.png';
import LocationIcon from '../assets/icons/geolocation_icon.png';
import PhoneIcon from '../assets/icons/phone_icon.png';
import LanguageModal from '../components/LanguageModal';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import AccountMainImage from '../assets/images/account_image.png';

export default function Account() {
  const {
    lang,
    avatar,
    name,
    setName,
    translations,
    phone,
    setPhone,
    address,
    setAddress,
  } = useContext(GlobalContext);

  const navigation = useNavigation();

  const [avatarModal, setAvatarModal] = useState(false);
  const [languageModal, setLanguageModal] = useState(false);
  const [language, setLanguage] = useState(false);

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Main')}>
            <Text style={styles.backText}>{back[lang]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={() => setAvatarModal(true)}>
            {avatar ? (
              <Image
                source={avatars.find(item => item?.name === avatar)?.image}
                style={styles.avatarImage}
              />
            ) : (
              <Text style={styles.changeAvatarText}>
                {translations?.length &&
                  translations.find(item => item?.en === 'Change avatar')[lang]}
              </Text>
            )}

            <Image source={EditIcon} style={styles.editIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={
                translations?.length &&
                translations.find(item => item?.en === 'Your Name')[lang]
              }
              placeholderTextColor={COLORS.placeholder}
              value={name}
              onChangeText={value => {
                setName(value);
                AsyncStorage.setItem('name', value);
              }}
            />

            <Image source={PersonIcon} style={styles.textInputIcon} />
            <Image source={EditIcon} style={styles.textInputEditIcon} />
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={
                translations?.length &&
                translations.find(item => item?.en === 'Choose Language')[lang]
              }
              placeholderTextColor={COLORS.placeholder}
              value={languageList[lang]}
              onChangeText={value => {}}
              editable={false}
              onPress={() => setLanguageModal(!languageModal)}
            />

            <Image source={LanguageIcon} style={styles.textInputIcon} />
            <Image source={EditIcon} style={styles.textInputEditIcon} />
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={addressLang[lang]}
              placeholderTextColor={COLORS.placeholder}
              value={address}
              onChangeText={value => {
                setAddress(value);
                AsyncStorage.setItem('address', value);
              }}
            />

            <Image source={LocationIcon} style={styles.textInputIcon} />
            <Image source={EditIcon} style={styles.textInputEditIcon} />
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={phoneLang[lang]}
              placeholderTextColor={COLORS.placeholder}
              value={phone}
              onChangeText={value => {
                setPhone(value);
                AsyncStorage.setItem('phone', value);
              }}
            />

            <Image source={PhoneIcon} style={styles.textInputIcon} />
            <Image source={EditIcon} style={styles.textInputEditIcon} />
          </View>
        </View>
      </View>

      <View style={styles.main}>
        <ScrollView
          style={globalStyles.scrollFlex}
          contentContainerStyle={globalStyles.scroll}
          showsVerticalScrollIndicator={false}>
          <CustomButton
            text={
              translations?.length &&
              translations.find(item => item?.en === 'Cart')[lang]
            }
            textStyle={{color: COLORS.white, fontSize: 28}}
            style={{...globalStyles.button}}
            onPress={() => navigation.navigate('Cart')}
          />

          <CustomButton
            text={
              translations?.length &&
              translations.find(item => item?.en === 'Broadcasts')[lang]
            }
            textStyle={{color: COLORS.white, fontSize: 28}}
            style={{...globalStyles.button}}
            onPress={() => navigation.navigate('Broadcasts')}
          />

          <Image source={AccountMainImage} style={styles.mainImage} />
        </ScrollView>
      </View>

      {avatarModal ? (
        <Avatars
          modalVisible={avatarModal}
          setModalVisible={setAvatarModal}
          translations={translations}
        />
      ) : (
        ''
      )}

      {languageModal ? (
        <LanguageModal
          modalVisible={languageModal}
          setModalVisible={setLanguageModal}
          translations={translations}
          language={language}
          setLanguage={setLanguage}
        />
      ) : (
        ''
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 0.35,
    backgroundColor: COLORS.main,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  headerLeft: {
    width: '40%',
  },
  backButton: {
    width: '70%',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderColor: COLORS.black,
    backgroundColor: COLORS.main,
  },
  backText: {
    fontFamily: FONTS.bold,
    fontSize: 32,
  },
  avatarContainer: {
    width: Dimensions.get('window').width * 0.35,
    height: Dimensions.get('window').width * 0.35,
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 90,
    borderColor: COLORS.black,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeAvatarText: {
    fontFamily: FONTS.bold,
    fontSize: 20,
  },
  editIcon: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: -10,
    top: '50%',
  },
  avatarImage: {
    alignSelf: 'center',
    width: Dimensions.get('window').width * 0.35,
    height: Dimensions.get('window').width * 0.35,
    objectFit: 'contain',
  },
  headerRight: {
    width: '60%',
  },
  textInput: {
    width: Dimensions.get('window').width * 0.5,
    alignSelf: 'center',
    height: 45,
    backgroundColor: COLORS.white,
    textAlign: 'left',
    fontFamily: FONTS.bold,
    fontSize: 24,
    borderRadius: 12,
    paddingLeft: 50,
  },
  textInputContainer: {
    position: 'relative',
    marginTop: 20,
  },
  textInputIcon: {
    height: 30,
    width: 30,
    position: 'absolute',
    left: 30,
    top: 7,
  },
  textInputEditIcon: {
    width: 25,
    height: 25,
    position: 'absolute',
    right: 10,
    top: '60%',
  },
  main: {
    flex: 0.65,
    backgroundColor: COLORS.accountBackground,
    width: '90%',
    marginTop: 20,
    alignSelf: 'center',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 20,
  },
  mainImage: {
    width: '90%',
    height: Dimensions.get('window').height / 3.5,
    alignSelf: 'center',
    objectFit: 'contain',
    marginTop: 20,
  },
});
