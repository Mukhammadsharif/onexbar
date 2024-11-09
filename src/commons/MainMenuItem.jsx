import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS} from '../helpers/colors';

export default function MainMenuItem({
  text,
  route,
  style = {},
  textStyle = {},
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[styles.container, {...style}]}
      onPress={() => navigation.navigate(route)}>
      <Text style={[styles.text, {...textStyle}]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '70%',
    backgroundColor: COLORS.main,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    height: 60,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 32,
    fontFamily: FONTS.extraBold,
    color: COLORS.black,
  },
});
