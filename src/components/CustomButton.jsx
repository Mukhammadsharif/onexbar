import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS} from '../helpers/colors';

export default function CustomButton({
  text,
  onPress,
  style = {},
  textStyle = {},
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={[styles.button, {...style}]}>
        <Text style={[styles.text, {...textStyle}]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 50,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 25,
    width: '70%',
    backgroundColor: COLORS.white,
    alignSelf: 'center',
  },
  text: {
    color: COLORS.blue900,
    fontSize: 24,
    fontFamily: FONTS.bold,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  image: {
    height: 60,
    objectFit: 'contain',
    position: 'absolute',
    right: -20,
  },
});
