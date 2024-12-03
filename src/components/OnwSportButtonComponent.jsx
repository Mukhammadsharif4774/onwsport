import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, FONTS} from '../helpers/colors';

export default function OnwSportButtonComponent({
  text,
  onPress,
  style = {},
  textStyle = {},
  buttonStyle = {},
}) {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
        <Text style={[styles.text, textStyle]}>{text.toUpperCase()}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderRadius: 12,
    width: '90%',
    backgroundColor: COLORS.main,
    alignSelf: 'center',
  },
  text: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: FONTS.black,
    fontWeight: 'bold',
    lineHeight: 28,
    letterSpacing: 3,
  },
});
