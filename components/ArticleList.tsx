
import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

interface ArticleListProps {
  articles: { title: string; description: string; publishedAt: string }[];
}

export const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  const renderArticle = ({ item }: { item: { title: string; description: string; publishedAt: string } }) => (
    <ListItem bottomDivider>
      <Icon name="newspaper-o"/>
      <ListItem.Content>
        <ListItem.Title style={styles.articleTitle}>{item.title}</ListItem.Title>
        <ListItem.Subtitle style={styles.articleDescription}>{item.description}</ListItem.Subtitle>
        <ListItem.Subtitle style={styles.articlePublishedAt}>{item.publishedAt}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <FlatList
      data={articles}
      renderItem={renderArticle}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.articleListContainer}
    />
  );
};

const styles = StyleSheet.create({
  articleListContainer: {
    marginTop: 10,
  },
  articleTitle: {
    fontWeight: 'bold',
  },
  articleDescription: {
    color: 'gray',
  },
  articlePublishedAt: {
    color: 'gray',
    fontStyle: 'italic',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

