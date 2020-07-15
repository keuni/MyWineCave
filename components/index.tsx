import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomTab from './BottomTab';

export default function Index() {
  return <BottomTab />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
