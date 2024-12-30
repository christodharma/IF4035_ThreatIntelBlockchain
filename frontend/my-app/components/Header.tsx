import React from "react";
import { View } from "react-native";
import { Searchbar, Text } from "react-native-paper";

export default function Header() {
    const [searchQuery, setSearchQuery] = React.useState('');
    return (
        <View style={{ flexDirection: "row", backgroundColor: "gray", padding: 10 }}>
            <Text style={{ alignContent: "center", padding: 16, fontSize: 24 }}>Threat Intelligence Marketplace</Text>
            <Searchbar style={{ flex: 1 }} 
                placeholder="What are you looking for?"
                onChangeText={setSearchQuery}
                value={searchQuery} />
        </View>
    )
}