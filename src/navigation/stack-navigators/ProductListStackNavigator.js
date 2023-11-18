import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLOURS, TEXTSIZE, FONTFAMILY} from '../../contants/theme';
import {connect} from 'react-redux';
import {getProductsList, getProducts} from '../../redux/actions/productAction';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {DrawerActions} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const ProductList = ({
  products,
  productsList,
  loading,
  error,
  getProductsList,
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    getProductsList();
    getProducts();
  }, []);

  useEffect(() => {
    console.log('PRODUCT LIST-----------------:', productsList.data);
  }, [productsList, products]);

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
        <StatusBar
          barstyle={Platform.OS == 'ios' ? 'Dark-content' : 'light-content'}
          backgroundColor={'white'}
        />
        <View style={styles.headerContainer}>
          <Icon
            style={styles.barsIcon}
            name="bars"
            size={30}
            color={COLOURS.themeOrange}
            onPress={() => {
              navigation.dispatch(DrawerActions.toggleDrawer());
            }}
          />
          <Icon
            style={styles.barsIcon}
            name="bell"
            size={30}
            color={COLOURS.themeBlue}
          />
        </View>
        <View style={styles.scrollProductsContainer}>
          <FlatList
            horizontal
            data={products.data?.categories || []}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.productListScrollContainer}>
                <Image
                  source={{
                    uri: `https://apiv5.akilliticaretim.com${item.link}`,
                  }}
                  style={styles.productImage}
                />
                <Text style={styles.productText}>{item.categoryName}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.productContainer}>
            <FlatList
              style={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
              data={productsList?.data || []}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <TouchableOpacity style={styles.productListContainer}>
                  {/* {item.productImages.map((imageUrl, index) => (
                    <Image
                      key={index}
                      source={{uri: imageUrl}}
                      style={{width: 50, height: 50}}
                    />
                  ))} */}
                  <Icon
                    style={styles.plusIcon}
                    name="plus"
                    size={30}
                    color={'black'}
                    onPress={() => navigation.navigate('MyBasketPage')}
                  />
                  <Text style={styles.productText}>{item.stockName}</Text>
                </TouchableOpacity>
              )}
              numColumns={2}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const ProductListStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProductList" component={ProductList} />
    </Stack.Navigator>
  );
};

const mapStateToProps = state => ({
  productsList: state.product.productsList,
  products: state.product.products,
  loading: state.product.loading,
  error: state.product.error,
});

const mapDispatchToProps = {
  getProductsList,
  getProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

//----------------------------------- style -------------------------------------------
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
  scrollProductsContainer: {
    flex: 3,
  },
  productListScrollContainer: {
    backgroundColor: COLOURS.themeGray,
    width: windowWidth / 2.5,
    height: windowHeight / 7,
    margin: '3%',
    borderRadius: 15,
    alignSelf: 'center',
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
    flex: 3,
  },
  productListContainer: {
    backgroundColor: COLOURS.themeGray,
    width: windowWidth / 2.5,
    height: windowHeight / 5,
    margin: '3%',
    borderRadius: 15,
  },
  plusIcon: {
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  },
  productImage: {
    width: 100,
    height: 80,
  },
  productText: {
    fontSize: TEXTSIZE.button,
    color: COLOURS.black,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
