import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

interface SearchHistoryProps {
  searchHistory: string[];
  onSearch: (searchText: string) => void;
  clearSearchHistory: () => void;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({ searchHistory, onSearch, clearSearchHistory }) => {
  const handleSearch = (searchText: string) => {
    onSearch(searchText);
  };

  const renderSearchHistory = () =>
    searchHistory.map(searchText => (
      <TouchableOpacity key={searchText} style={styles.historyItem} onPress={() => handleSearch(searchText)}>
        <Text style={styles.historyText}>{searchText}</Text>
      </TouchableOpacity>
    ));

  return (
    <View style={styles.historyContainer}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>Recent Searches</Text>
        <Icon name="trash" type="font-awesome" onPress={clearSearchHistory} />
      </View>
      <View style={styles.historyList}>{renderSearchHistory()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  historyContainer: {
    marginTop: 10,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  historyList: {
    marginTop: 10,
  },
  historyItem: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  historyText: {
    fontSize: 16,
  },
});
