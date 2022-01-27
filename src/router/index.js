// In App.js in a new project

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {BottomNavigator} from '../components/organism';
import Detail from '../pages/Detail';
import DetailEpisode from '../pages/Detail/DetailEpisode';
import DetailMovies from '../pages/Detail/DetailMovies';
import Episodes from '../pages/Episodes';
import GenrePage from '../pages/GenrePage';
import Home from '../pages/Home';
import Library from '../pages/Library';
import Search from '../pages/Search';
import Splash from '../pages/Splash';

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
        name="DetailMovies"
        component={DetailMovies}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailEpisode"
        component={DetailEpisode}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Episodes"
        component={Episodes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GenrePage"
        component={GenrePage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
