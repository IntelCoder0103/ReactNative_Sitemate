import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

interface SearchBoxProps {
  onSearch: (text: string) => void;
}

export const SearchBox: React.FC<React.PropsWithChildren<SearchBoxProps>> = ({ onSearch, children }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.searchBoxContainer}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search news"
        onChangeText={text => setSearchText(text)}
        value={searchText}
      />
      <Button title="Search" onPress={handleSearch} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBox: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
});
