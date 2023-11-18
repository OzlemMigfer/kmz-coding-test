import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider, useSelector} from 'react-redux';
import store from './redux/store';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {COLOURS} from './contants/theme';

import Login from './pages/Auth/Login/Login';
//Tab Screens
import HomePage from './pages/TabPages/HomePage/HomePage';
import SearchPage from './pages/TabPages/SearchPage/SearchPage';
import MyBasketPage from './pages/TabPages/MyBasketPage/MyBasketPage';
import LabelPage from './pages/TabPages/LabelPage/LabelPage';
import ProfilePage from './pages/TabPages/ProfilePage/ProfilePage';
//Drawer Screens
import DrawerNavigator from './navigation/DrawerNavigator';
import ProductListStackNavigator from './navigation/stack-navigators/ProductListStackNavigator';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomePage"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;

          if (route.name === 'HomePage') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'SearchPage') {
            iconName = focused ? 'search' : 'search';
          } else if (route.name === 'MyBasketPage') {
            iconName = focused ? 'shopping-cart' : 'shopping-cart';
          } else if (route.name === 'LabelPage') {
            iconName = focused ? 'tag' : 'tag';
          } else if (route.name === 'ProfilePage') {
            iconName = focused ? 'user' : 'user';
          }

          return (
            <Icon
              name={iconName}
              size={focused ? 35 : 30}
              color={focused ? 'white' : '#cccccc'}
              style={{top: 5}}
            />
          );
        },
        tabBarLabel: '',
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: COLOURS.themeOrange,
          height: '9%',
        },
      })}>
      <Tab.Screen name="HomePage" component={HomePage} />
      <Tab.Screen name="SearchPage" component={SearchPage} />
      <Tab.Screen name="MyBasketPage" component={MyBasketPage} />
      <Tab.Screen name="LabelPage" component={LabelPage} />
      <Tab.Screen name="ProfilePage" component={ProfilePage} />
    </Tab.Navigator>
  );
};

const DrawerApp = () => {
  return (
    <Drawer.Navigator
      initialRouteName=""
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: 'white',
          width: '100%',
          height: '100%',
          marginTop: '15%',
        },
        overlayColor:"transparent"
      }}
      drawerContent={props => <DrawerNavigator {...props} />}>
      <Drawer.Screen name="BottomTab" component={BottomTab} />
      <Drawer.Screen name="ProductListStackNavigator" component={ProductListStackNavigator} />
    </Drawer.Navigator>
  );
};

const App = () => {
  // get user data redux
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  return isAuthenticated ? <DrawerApp /> : <LoginStack />;
};

const Router = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </Provider>
  );
};

export default Router;
