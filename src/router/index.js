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
        name="Series"
        component={Series}
        options={{
          tabBarLabel: 'TV Series',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Play"
        component={Playlist}
        options={{
          tabBarLabel: 'Playlist',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          // tabBarIcon: ({color, size}) => (
          //   <MaterialCommunityIcons name="home" color={color} size={size} />
          // ),
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
