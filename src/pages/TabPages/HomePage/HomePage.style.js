import {StyleSheet, Dimensions} from 'react-native';
import {COLOURS, TEXTSIZE} from '../../../contants/theme';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '3%',
  },
  barsIcon: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  scrollImageContainer: {
    flex: 3,
  },
  bodyContainer: {
    flex: 8,
    backgroundColor: 'white',
  },
  productContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: '15%',
  },
  scrollContainer: {
  },
  productListContainer: {
    backgroundColor: COLOURS.themeGray,
    width: windowWidth/ 2.5,
    height: windowHeight/5,
    margin: '3%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  productImage: {
    width: 100,
    height: 80,
  },
  productText: {
    fontSize: TEXTSIZE.button,
    color: COLOURS.black,
    fontWeight: 'bold',
  },
});

export default styles;
