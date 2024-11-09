import {StyleSheet} from 'react-native';
import {COLORS} from '../helpers/colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: '101%',
    width: '100%',
    backgroundColor: COLORS.white,
  },
  scroll: {
    paddingBottom: 200,
  },
  scrollFlex: {
    flex: 1,
  },
  button: {
    backgroundColor: COLORS.main,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    width: '100%',
    height: 55,
    marginTop: 15,
  },
});
