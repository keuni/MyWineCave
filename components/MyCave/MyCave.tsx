import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'native-base';
import Search from './Search';
import MyCaveList from './MyCaveList';

export default function MyCave(props: any) {
  return (
    <View style={styles.container}>
      <Text>my Wine</Text>
      <View style={styles.searchContainer}>
        <Button
          transparent
          style={styles.searchButton}
          onPress={() => {
            props.navigation.navigate('Search');
          }}
        >
          {/* <Icon active name='search' style={{ color: 'grey' }} /> */}
          <Text style={styles.searchText}>검색어를 입력해주세요</Text>
        </Button>
        {/* <SimpleLineIcons
          name='equalizer'
          size={24}
          style={styles.filter}
          onPress={() => {
            this.props.navigation.navigate('FilterContainer');
          }}
        /> */}
      </View>
      <MyCaveList />
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
  searchContainer: {
    borderRadius: 5,
    alignSelf: 'center',
    height: '7%',
    flexDirection: 'row',
    backgroundColor: 'white',
    position: 'absolute',
    top: '4%',
    width: '95%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  searchButton: {
    backgroundColor: '#ebebeb',
    width: '55%',
    alignSelf: 'center',
    height: '70%',
    borderRadius: 20,
    paddingHorizontal: 5,
  },
  searchText: {
    position: 'absolute',
    left: 45,
    color: 'grey',
  },
});
