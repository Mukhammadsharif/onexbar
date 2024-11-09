import React, {useContext} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {GlobalContext} from './GlobalContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, FONTS} from '../helpers/colors';
import LangChecked from '../assets/icons/selected_lang_icon.png';
import LangUnChecked from '../assets/icons/unselected_lang_icon.png';

export default function LanguageModal({
  modalVisible,
  setModalVisible,
  translations,
  language,
  setLanguage,
}) {
  const {setLang, lang} = useContext(GlobalContext);

  const setNewLanguage = value => {
    setLang(value);
    AsyncStorage.setItem('language', value);
    setLanguage(false);
    setModalVisible(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onDismiss={() => setModalVisible(!modalVisible)}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.content}>
              <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.main}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setNewLanguage('ru')}>
                    <Text style={styles.buttonText}>Русский</Text>
                    {lang === 'ru' ? (
                      <Image source={LangChecked} style={styles.icon} />
                    ) : (
                      <Image source={LangUnChecked} style={styles.icon} />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setNewLanguage('en')}>
                    <Text style={styles.buttonText}>English</Text>
                    {lang === 'en' ? (
                      <Image source={LangChecked} style={styles.icon} />
                    ) : (
                      <Image source={LangUnChecked} style={styles.icon} />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setNewLanguage('es')}>
                    <Text style={styles.buttonText}>Español</Text>
                    {lang === 'es' ? (
                      <Image source={LangChecked} style={styles.icon} />
                    ) : (
                      <Image source={LangUnChecked} style={styles.icon} />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setNewLanguage('it')}>
                    <Text style={styles.buttonText}>Italiano</Text>
                    {lang === 'it' ? (
                      <Image source={LangChecked} style={styles.icon} />
                    ) : (
                      <Image source={LangUnChecked} style={styles.icon} />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setNewLanguage('de')}>
                    <Text style={styles.buttonText}>Deutsch</Text>
                    {lang === 'de' ? (
                      <Image source={LangChecked} style={styles.icon} />
                    ) : (
                      <Image source={LangUnChecked} style={styles.icon} />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setNewLanguage('fr')}>
                    <Text style={styles.buttonText}>Français</Text>
                    {lang === 'fr' ? (
                      <Image source={LangChecked} style={styles.icon} />
                    ) : (
                      <Image source={LangUnChecked} style={styles.icon} />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setNewLanguage('sw')}>
                    <Text style={styles.buttonText}>Schweizerisch</Text>
                    {lang === 'sw' ? (
                      <Image source={LangChecked} style={styles.icon} />
                    ) : (
                      <Image source={LangUnChecked} style={styles.icon} />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => setNewLanguage('pl')}>
                    <Text style={styles.buttonText}>Polski</Text>
                    {lang === 'pl' ? (
                      <Image source={LangChecked} style={styles.icon} />
                    ) : (
                      <Image source={LangUnChecked} style={styles.icon} />
                    )}
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  modalView: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    width: 20,
    height: 20,
    objectFit: 'contain',
    alignSelf: 'center',
  },
  content: {
    width: '100%',
    height: '50%',
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    zIndex: 101,
    borderRadius: 20,
    borderColor: COLORS.mainSecondary,
    borderWidth: 2,
    marginTop: 20,
  },
  main: {
    width: '100%',
  },
  scrollView: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  button: {
    height: (Dimensions.get('window').height * 0.35) / 8,
    borderBottomWidth: 1,
    borderColor: COLORS.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonText: {
    fontFamily: FONTS.bold,
    fontSize: 26,
    color: COLORS.black,
  },
});
