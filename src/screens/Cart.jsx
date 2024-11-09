import React, {useContext, useEffect, useState} from 'react';
import {
  ImageBackground,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {globalStyles} from '../styles';
import BackgroundImage from '../assets/backgrounds/background.png';
import Header from '../components/Header';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../components/GlobalContext';
import {usePostRequest} from '../helpers/hooks';
import {ORDER} from '../helpers/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';
import CartItem from '../components/CartItem';
import {currency} from '../helpers/avatars';
import Loading from '../components/Loading';
import {COLORS, FONTS} from '../helpers/colors';
import EmptyImage from '../assets/icons/cart_tab_icon.png';

export default function Cart() {
  const navigation = useNavigation();
  const {lang, refresh, setRefresh, translations} = useContext(GlobalContext);
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const orderRequest = usePostRequest({url: ORDER});

  const order = async () => {
    setLoading(true);
    const {response} = await orderRequest.request();
    if (response) {
      await AsyncStorage.setItem('cartList', '');
      navigation.navigate('CartSuccess', {qrImage: response?.res});
      setLoading(false);
      setRefresh(!refresh);
    }
  };

  useEffect(() => {
    const getCart = async () => {
      const list = await AsyncStorage.getItem('cartList');
      if (list?.length) {
        setCart(JSON.parse(list));
      } else {
        setCart(null);
      }
    };

    getCart();
  }, [refresh]);

  useEffect(() => {
    if (cart?.length) {
      let sum = 0;
      cart.forEach(product => {
        sum += product.price * product.count;
      });

      setPrice(sum);
    }
  }, [cart, refresh]);

  return (
    <View style={globalStyles.container}>
      <ImageBackground
        style={globalStyles.container}
        source={cart?.length && BackgroundImage}>
        <Header text={translations.find(item => item?.en === 'Cart')[lang]} />

        {cart && cart.length && translations?.length ? (
          <>
            <View style={styles.main}>
              <ScrollView
                style={globalStyles.scrollFlex}
                contentContainerStyle={globalStyles.scroll}>
                {cart.map((item, index) => (
                  <CartItem item={item} key={index} />
                ))}

                <View style={styles.currency}>
                  <Text style={styles.priceTitle}>
                    {
                      translations.find(item => item?.en === 'Total Amount')[
                        lang
                      ]
                    }
                    :
                  </Text>
                  <Text style={styles.price}>
                    {price} {currency}
                  </Text>
                </View>
              </ScrollView>
            </View>

            <CustomButton
              text={translations.find(item => item?.en === 'Place Order')[lang]}
              onPress={() => order()}
              style={{
                ...globalStyles.button,
                width: '50%',
                alignSelf: 'flex-end',
              }}
            />
          </>
        ) : translations?.length ? (
          <View>
            <Text style={styles.emptyTitle}>
              {
                translations.find(item => item?.en === 'Your cart is empty')[
                  lang
                ]
              }
              !
            </Text>
            <Image source={EmptyImage} style={styles.boyBall} />
          </View>
        ) : (
          ''
        )}

        {!translations?.length || loading ? <Loading /> : ''}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.main,
    width: '100%',
    alignSelf: 'flex-start',
    marginTop: 60,
    height: '60%',
  },
  currency: {
    borderRadius: 12,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  priceTitle: {
    fontFamily: FONTS.bold,
    color: COLORS.black,
    fontSize: 30,
  },
  price: {
    fontFamily: FONTS.bold,
    color: COLORS.black,
    fontSize: 28,
  },
  boyBall: {
    alignSelf: 'center',
    width: Dimensions.get('window').width * 0.5,
    height: Dimensions.get('window').width * 0.5,
  },
  emptyTitle: {
    color: COLORS.black,
    fontSize: 32,
    fontFamily: FONTS.bold,
    textAlign: 'center',
    alignSelf: 'center',
    padding: 10,
    marginTop: Dimensions.get('window').height * 0.3,
    borderBottomWidth: 2,
    borderColor: COLORS.black,
    width: '100%',
  },
});
