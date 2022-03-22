// In App.js in a new project

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {BottomNavigator} from '../components/organism';
import Detail from '../pages/Detail';
import DetailMovies from '../pages/Detail/DetailMovies';
import DetailUpcoming from '../pages/Detail/DetailUpcoming';
import Episodes from '../pages/Episodes';
import GenrePage from '../pages/GenrePage';
import Home from '../pages/Home';
import Library from '../pages/Library';
import Login from '../pages/Login';
import PlayVideo from '../pages/PlayVideo';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
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
        name="PlayVideo"
        component={PlayVideo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailUpcoming"
        component={DetailUpcoming}
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
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
