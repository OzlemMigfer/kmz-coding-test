import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {COLOURS, TEXTSIZE, FONTFAMILY} from '../contants/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect, useDispatch, useSelector} from 'react-redux';
import {getProducts} from '../redux/actions/productAction';

const DrawerNavigator = ({
  products,
  loading,
  error,
  getProducts,
  navigation,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    // console.log('DRAWER Products:', products.data);
  }, [products]);

  // waiting for data
  if (loading) {
    return <Text>Yükleniyor...</Text>;
  }
  if (error) {
    return <Text>Hata: {error}</Text>;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          data={products.data?.categories || []}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                navigation.navigate('ProductListStackNavigator');
              }}>
              <Text
                style={[
                  styles.buttonText,
                  {color: item.color, fontWeight: item.fontWeight},
                ]}>
                {item.categoryName}
              </Text>
              <Icon
                name="chevron-right"
                size={25}
                color={'#b7b9bb'}
                style={styles.rightIcon}
              />
            </TouchableOpacity>
          )}
          initialNumToRender={products.length}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  products: state.product.products,
  loading: state.product.loading,
  error: state.product.error,
});

const mapDispatchToProps = {
  getProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigator);

//---------------------- style -------------------------
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: COLOURS.themeGray,
  },
  buttonContainer: {
    marginVertical: '1%',
    borderTopWidth: 2,
    borderColor: COLOURS.themeGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: TEXTSIZE.menuHeader,
    padding: 6,
    marginLeft: '3%',
  },
  rightIcon: {
    marginRight: '3%',
    alignSelf: 'center',
  },
});
