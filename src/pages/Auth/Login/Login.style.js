import {StyleSheet, Dimensions} from 'react-native';
import {COLOURS, TEXTSIZE} from '../../../contants/theme';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.themeGray,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  headerText: {
    fontSize: TEXTSIZE.header,
    color: COLOURS.themeOrange,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bodyContainer: {
    flex: 2,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    height: windowHeight/ 15,
    width: windowWidth/ 1.2,
    marginVertical: '2%',
    borderRadius: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: windowHeight/ 15,
    width: windowWidth/ 1.5,
    borderRadius: 20,
    backgroundColor: COLOURS.themeOrange,
    marginVertical: '3%',
  },
  buttonText: {
    fontSize: TEXTSIZE.button,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default styles;
