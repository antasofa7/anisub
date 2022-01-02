// In App.js in a new project

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {BottomNavigator} from '../components/organism';
import {
  Detail,
  Episodes,
  Home,
  Movies,
  Playlist,
  PlayVideo,
  Profile,
  Series,
  Splash,
} from '../pages';
import Library from '../pages/Library';
import Search from '../pages/Search';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Episodes"
        component={Episodes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PlayVideo"
        component={PlayVideo}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
