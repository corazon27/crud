/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React from 'react';

//Import Navigators
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

//Import External Screens
import HomeScreen from './drawerScreens/HomeScreen';
import SettingsScreen from './drawerScreens/SettingsScreen';
import CobaScreen from './drawerScreens/CobaScreen';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHeader';

const FirstActivity_StackNavigator = createStackNavigator({
  First: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Home Screen',
      headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#307ecc',
      },
      headerTintColor: '#fff',
    }),
  },
});

const SecondActivity_StackNavigator = createStackNavigator({
  First: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Setting Screen',
      headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#307ecc',
      },
      headerTintColor: '#fff',
    }),
  },
});

const ThirdActivity_StackNavigator = createStackNavigator({
  First: {
    screen: CobaScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Coba Screen',
      headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#307ecc',
      },
      headerTintColor: '#fff',
    }),
  },
});

const DrawerNavigatorRoutes = createDrawerNavigator(
  {
    HomeScreen: {
      screen: FirstActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Home Screen',
      },
    },
    SettingsScreen: {
      screen: SecondActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Setting Screen',
      },
    },
    CobaScreen: {
      screen: ThirdActivity_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Coba Screen',
      },
    },
  },
  {
    contentComponent: CustomSidebarMenu,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
  }
);
export default DrawerNavigatorRoutes;