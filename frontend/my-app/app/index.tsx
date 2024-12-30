import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

interface GridItem {
  id: string;
  title: string;
}

const data: GridItem[] = Array.from({ length: 20 }, (_, index) => ({
  id: index.toString(),
  title: `Threat case ${index + 1}`,
}));

export default function HomeScreen() {

  const renderItem = ({ item }: { item: GridItem }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.text}>{item.title}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      numColumns={5}
      columnWrapperStyle={styles.row}
    />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 8,
    elevation: 4,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});
