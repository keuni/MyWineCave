import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Scanner from './Scanner';

export default function MyWine() {
  return (
    <View style={styles.container}>
      <Text>my Wine</Text>
      <Scanner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
