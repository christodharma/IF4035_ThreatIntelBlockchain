import React from "react";
import { Card, Text, Chip } from "react-native-paper";
import { StyleSheet, View } from "react-native";

export default function ThreatCard (item: ThreatCard) {
    return (
        <Card style={styles.card} contentStyle={{gap: 8}}>
      <Card.Content style={{gap: 8}}>
        <Text style={[styles.text, {textAlign: 'left'}]}>Submitted by {item.owner}</Text>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.text}>{item.price} ETH</Text>
          <Text style={styles.text}>Purchased: {item.purchaseCount} time(s)</Text>
        </View>
      </Card.Content>
      <Card.Actions>
        {
          item.isVerified && <Chip style={{ backgroundColor: "green" }} disabled>
            <Text style={styles.text}>Verified!</Text>
          </Chip>
        }
        {
          item.isMalware && <Chip style={{ backgroundColor: "red" }}>
            <Text style={styles.text}>Malware!</Text>
          </Chip>
        }
      </Card.Actions>
    </Card>
    )
}

const styles = StyleSheet.create({
  card: {
    margin: 5,
    borderRadius: 8,
    elevation: 4,
  },
  text: {
    fontSize: 16,
  },
});