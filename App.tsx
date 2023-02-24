import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SearchBox } from './components/SearchBox';
import { ArticleList } from './components/ArticleList';
import { SearchHistory } from './components/SearchHistory';

interface Article {
  title: string;
  description: string;
  publishedAt: string;
}

export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('searchHistory')
      .then(history => setSearchHistory(history ? JSON.parse(history) : []))
      .catch(error => console.log(error));
  }, []);

  const saveSearchHistory = (search: string) => {
    const updatedHistory = [search, ...searchHistory.filter(s => s !== search)];
    AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory))
      .then(() => setSearchHistory(updatedHistory))
      .catch(error => console.log(error));
  };

  const clearSearchHistory = () => {
    AsyncStorage.removeItem('searchHistory')
      .then(() => setSearchHistory([]))
      .catch(error => console.log(error));
  };

  const searchNews = (searchText: string) => {
    const apiKey = '183daca270264bad86fc5b72972fb82a';
    const url = `https://newsapi.org/v2/everything?q=${searchText}&apiKey=${apiKey}`;

    axios
      .get(url)
      .then(response => {
        setArticles(response.data.articles);
        setError(null);
        saveSearchHistory(searchText);
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          setError('An error occurred while retrieving news. Please try again later.');
        } else if (error.request) {
          console.log(error.request);
          setError('Could not retrieve news. Please check your network connection and try again.');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          setError('An unexpected error occurred. Please try again later.');
        }
      });
  };

  const renderSearchHistory = () => (
    <SearchHistory searchHistory={searchHistory} onSearch={searchNews} clearSearchHistory={clearSearchHistory} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>News App</Text>
      <SearchBox onSearch={searchNews}>
      </SearchBox>
        {error && <Text style={styles.error}>{error}</Text>}
        {articles.length > 0 && <ArticleList articles={articles} />}
      {searchHistory.length > 0 && (
        <>
          <Text style={styles.historyTitle}>Search History</Text>
          {renderSearchHistory()}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginVertical: 10,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
});
