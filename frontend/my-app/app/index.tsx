import ThreatCard from '@/components/ThreatCard';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Chip, Text } from 'react-native-paper';

const data: ThreatCard[] = Array.from({ length: 21 }, (_, index) => ({
  id: index.toString(),
  owner: `${index + 1}`,
  price: index + 1,
  purchaseCount: index + 1,
  isVerified: true,
  isMalware: false,
}));

export default function HomeScreen() {

  const renderItem = ({ item }: { item: ThreatCard }) => (
    <ThreatCard id={item.id} owner={item.owner} price={item.price} purchaseCount={item.purchaseCount} isVerified={item.isVerified} isMalware={item.isMalware} />
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
    justifyContent: 'space-evenly',
    paddingVertical: 10,
  },
});
