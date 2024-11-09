import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GlobalContext} from './GlobalContext';
import {currency} from '../helpers/avatars';
import {COLORS, FONTS} from '../helpers/colors';

export default function MenuItem({item, translations}) {
  const {refresh, setRefresh, lang} = useContext(GlobalContext);
  const [added, setAdded] = useState(false);
  const [carts, setCarts] = useState([]);

  const add = async product => {
    const cartList = await AsyncStorage.getItem('cartList');
    if (cartList) {
      const cartArray = JSON.parse(cartList);
      const existProduct = cartArray.find(
        cart => cart.title.en === product.title.en,
      );
      if (!existProduct) {
        cartArray.push({...product, count: 1});
        await AsyncStorage.setItem('cartList', JSON.stringify(cartArray));
      }
    } else {
      const cartArray = [];
      cartArray.push({...product, count: 1});
      await AsyncStorage.setItem('cartList', JSON.stringify(cartArray));
    }
    await setRefresh(!refresh);
  };

  const trash = async product => {
    const cartList = await AsyncStorage.getItem('cartList');
    if (cartList) {
      const cartArray = JSON.parse(cartList);
      const existProduct = cartArray.find(
        cart => cart.title.en === product.title.en,
      );
      if (existProduct) {
        const newArray = cartArray.filter(
          cart => cart.title.en !== product.title.en,
        );
        await AsyncStorage.setItem('cartList', JSON.stringify(newArray));
      }
    }
    await setRefresh(!refresh);
  };

  const define = async product => {
    const cartList = await AsyncStorage.getItem('cartList');
    if (cartList) {
      const cartArray = JSON.parse(cartList);
      const existProduct = cartArray.find(
        cart => cart.title.en === product.title.en,
      );
      if (existProduct) {
        await trash(product);
      } else {
        await add(product);
      }
    } else {
      await add(product);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      const cartList = await AsyncStorage.getItem('cartList');
      if (cartList) {
        const cartArray = JSON.parse(cartList);
        const existProduct = cartArray.find(
          cart => cart.title.en === item.title.en,
        );
        if (existProduct) {
          setAdded(true);
        } else {
          setAdded(false);
        }
      } else {
        setAdded(false);
      }
    };

    getProduct();
  }, [refresh]);

  useEffect(() => {
    const getCartList = async () => {
      const cartList = await AsyncStorage.getItem('cartList');
      if (cartList?.length) {
        setCarts(JSON.parse(cartList));
      }
    };

    getCartList();
  }, [refresh]);

  const deleteItem = async () => {
    if (carts?.length) {
      const newArray = carts.filter(
        product => product.title.en !== item.title.en,
      );
      await setCarts(newArray);
      await AsyncStorage.setItem('cartList', JSON.stringify(newArray));
      await setRefresh(!refresh);
    }
  };

  return (
    <TouchableOpacity
      style={styles.main}
      onPress={() => {
        setRefresh(!refresh);
      }}>
      <View style={styles.container}>
        <Image source={{uri: item?.image}} style={styles.image} />

        <View style={styles.rightContainer}>
          <Text style={styles.title}>{item?.title[lang]}</Text>
          <Text style={styles.desc}>{item?.desc[lang]}</Text>

          <View style={styles.row}>
            {added ? (
              <TouchableOpacity
                style={styles.statusContainer}
                onPress={() => deleteItem()}>
                <Text style={styles.status}>
                  {translations.find(t => t?.en === 'Added')[lang]}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.statusContainer}
                onPress={() => define(item)}>
                <Text style={styles.status}>
                  {translations.find(t => t?.en === 'Add')[lang]}
                </Text>
              </TouchableOpacity>
            )}

            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                {item?.price} {currency}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '95%',
    backgroundColor: COLORS.white,
    marginTop: 20,
    borderRadius: 12,
    alignSelf: 'center',
  },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 5,
    objectFit: 'fill',
  },
  rightContainer: {
    marginLeft: 10,
    width: '100%',
  },
  rightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    width: '90%',
  },
  currencyText: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
  },
  title: {
    fontSize: 22,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    textAlign: 'left',
  },
  desc: {
    fontSize: 16,
    fontFamily: FONTS.light,
    color: COLORS.black,
    textAlign: 'left',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  statusContainer: {
    backgroundColor: COLORS.main,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 15,
  },
  status: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },
  priceContainer: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: COLORS.main,
  },
  price: {
    fontSize: 22,
    fontFamily: FONTS.bold,
    color: COLORS.main,
  },
});
