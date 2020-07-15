import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MyCave from './MyCave';
import Search from './Search';

const Stack = createStackNavigator();

export default function MyCaveStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='My Cave' component={MyCave} />
      <Stack.Screen name='Search' component={Search} />
    </Stack.Navigator>
  );
}
