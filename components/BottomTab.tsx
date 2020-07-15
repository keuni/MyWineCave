import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyCaveStack from './MyCave/MyCaveStack';
import MyPage from './MyPage';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='MyCaveStack'
        tabBarOptions={{
          inactiveTintColor: 'grey',
          activeTintColor: '#62CCAD',
          activeBackgroundColor: 'white',
          inactiveBackgroundColor: 'white',
        }}
      >
        <Tab.Screen
          name='MyCaveStack'
          component={MyCaveStack}
          options={{
            tabBarLabel: 'My Cave',
          }}
        />
        <Tab.Screen
          name='MyPage'
          component={MyPage}
          options={{
            tabBarLabel: 'My Page',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
