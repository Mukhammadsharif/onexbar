import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {globalStyles} from '../styles';
import Header from '../components/Header';
import {menuTranslation} from '../helpers/languages';
import {GlobalContext} from '../components/GlobalContext';
import {useGetRequest} from '../helpers/hooks';
import {PRODUCTS} from '../helpers/urls';
import {COLORS, FONTS} from '../helpers/colors';
import {toCapitalize} from '../helpers/functions';
import Loading from '../components/Loading';
import MenuItem from '../components/MenuItem';

export default function Menu() {
  const {translations, lang, refresh, setRefresh} = useContext(GlobalContext);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('salads');
  const getProductsRequest = useGetRequest({url: PRODUCTS});

  const getProducts = async () => {
    const {response} = await getProductsRequest.request();
    if (response?.length) {
      setProducts(response);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View style={globalStyles.container}>
      <Header text={menuTranslation[lang]} backAction={false} />
      {translations?.length && products?.length ? (
        <View style={styles.container}>
          <View style={styles.categories}>
            <TouchableOpacity
              style={
                category === 'salads' ? styles.categoryActive : styles.category
              }
              onPress={() => {
                setCategory('salads');
                setRefresh(!refresh);
              }}>
              <Text style={styles.categoryText}>
                {toCapitalize(
                  translations.find(item => item?.en === 'salads')[lang],
                )}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                category === 'starters'
                  ? styles.categoryActive
                  : styles.category
              }
              onPress={() => {
                setCategory('starters');
                setRefresh(!refresh);
              }}>
              <Text style={styles.categoryText}>
                {toCapitalize(
                  translations.find(item => item?.en === 'starters')[lang],
                )}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                category === 'desserts'
                  ? styles.categoryActive
                  : styles.category
              }
              onPress={() => {
                setCategory('desserts');
                setRefresh(!refresh);
              }}>
              <Text style={styles.categoryText}>
                {toCapitalize(
                  translations.find(item => item?.en === 'desserts')[lang],
                )}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                category === 'drinks' ? styles.categoryActive : styles.category
              }
              onPress={() => {
                setCategory('drinks');
                setRefresh(!refresh);
              }}>
              <Text style={styles.categoryText}>
                {toCapitalize(
                  translations.find(item => item?.en === 'drinks')[lang],
                )}
              </Text>
            </TouchableOpacity>
          </View>

          {products?.length ? (
            <ScrollView
              contentContainerStyle={globalStyles.scroll}
              style={globalStyles.scrollFlex}>
              {products
                .filter(p => p.type === category)
                .map((item, index) => (
                  <MenuItem
                    item={item}
                    key={index}
                    translations={translations}
                  />
                ))}
            </ScrollView>
          ) : (
            ''
          )}
        </View>
      ) : (
        <Loading />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categories: {},
  category: {
    width: '55%',
    backgroundColor: COLORS.main,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    height: 45,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryActive: {
    width: '55%',
    backgroundColor: '#3866FF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    height: 45,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryText: {
    fontSize: 28,
    fontFamily: FONTS.extraBold,
    color: COLORS.black,
  },
});
