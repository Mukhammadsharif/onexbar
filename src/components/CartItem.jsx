import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GlobalContext} from './GlobalContext';
import {currency} from '../helpers/avatars';
import {COLORS, FONTS} from '../helpers/colors';
import DeleteIcon from '../assets/icons/cart_delete_icon.png';
import BallIcon from '../assets/icons/cart_icon.png';
export default function CartItem({item}) {
  const {refresh, lang, setRefresh} = useContext(GlobalContext);
  const [carts, setCarts] = useState([]);

  const increment = async () => {
    if (carts?.length) {
      const updatedCarts = carts.map(product => {
        if (product.title.en === item.title.en) {
          return {...product, count: product.count + 1}; // Increment count
        }
        return product;
      });
      await AsyncStorage.setItem('cartList', JSON.stringify(updatedCarts));
      await setRefresh(!refresh); // Trigger refresh
    }
  };

  const decrement = async () => {
    if (carts?.length) {
      const updatedCarts = carts.map(product => {
        if (product.title.en === item.title.en && product.count > 0) {
          return {...product, count: product.count - 1}; // Decrease count
        }
        return product;
      });
      await AsyncStorage.setItem('cartList', JSON.stringify(updatedCarts));
      await setRefresh(!refresh); // Trigger refresh
    }
  };

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

  useEffect(() => {
    const getCartList = async () => {
      const cartList = await AsyncStorage.getItem('cartList');
      if (cartList?.length) {
        setCarts(JSON.parse(cartList));
      }
    };

    getCartList();
  }, [refresh]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={BallIcon} style={styles.ball} />

        <Text style={styles.title}>{item?.title[lang]}</Text>

        <View style={styles.countContainer}>
          <TouchableOpacity
            style={styles.actionContainer}
            onPress={() => {
              if (carts.find(product => product.name === item.name).count > 1) {
                decrement();
              } else {
                deleteItem();
              }
            }}>
            <Text style={styles.increment}>-</Text>
          </TouchableOpacity>

          <Text style={styles.count}>
            {carts.find(product => product.title.en === item.title.en)?.count}{' '}
          </Text>

          <TouchableOpacity
            style={styles.actionContainer}
            onPress={() => increment()}>
            <Text style={styles.increment}>+</Text>
          </TouchableOpacity>

          <Text style={styles.currencyText}>
            {item?.price} {currency}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.delete} onPress={() => deleteItem()}>
        <Image source={DeleteIcon} style={styles.delete} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.main,
    borderBottomWidth: 1,
    borderColor: COLORS.white,
    position: 'relative',
  },
  currencyText: {
    fontFamily: FONTS.bold,
    color: COLORS.black,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  title: {
    fontSize: 22,
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },
  count: {
    fontSize: 22,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countContainer: {
    flexDirection: 'row',
    paddingRight: 30,
  },
  actionContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 90,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  increment: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  delete: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 15,
    height: 15,
    zIndex: 110,
  },
  ball: {
    width: 60,
    height: 70,
    objectFit: 'contain',
  },
});
