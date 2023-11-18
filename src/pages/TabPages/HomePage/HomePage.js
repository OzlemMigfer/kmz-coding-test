import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
import {COLOURS, TEXTSIZE} from '../../../contants/theme';
import styles from './HomePage.style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {getProducts} from '../../../redux/actions/productAction';
import {DrawerActions} from '@react-navigation/native';

const HomePage = ({products, loading, error, getProducts}) => {
  const navigation = useNavigation();

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    // console.log('Products:', products);
  }, [products]);

  // waiting for data
  if (loading) {
    return <Text>Yükleniyor...</Text>;
  }
  if (error) {
    return <Text>Hata: {error}</Text>;
  }

  //scroll image array
  const imageList = [
    {id: 1, source: require('../../../../assets/image1.jpg')},
    {id: 2, source: require('../../../../assets/image2.jpg')},
    {id: 3, source: require('../../../../assets/image3.jpg')},
  ];

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
        <View style={styles.scrollImageContainer}>
          <FlatList
            data={imageList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <Image
                source={item.source}
                style={{width: 400, height: 200}}
                resizeMode="cover"
              />
            )}
            horizontal
          />
        </View>
        <View style={styles.bodyContainer}>
          <View style={styles.productContainer}>
            <FlatList
              style={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
              data={products.data?.categories || []}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.productListContainer}
                >
                  <Image
                    source={{
                      uri: `https://apiv5.akilliticaretim.com${item.link}`,
                    }}
                    style={styles.productImage}
                  />
                  <Text style={styles.productText}>{item.categoryName}</Text>
                  <Text style={styles.productText}>{item.parentId}</Text>
                </TouchableOpacity>
              )}
              numColumns={2}
              initialNumToRender={products.length}
            />
          </View>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
