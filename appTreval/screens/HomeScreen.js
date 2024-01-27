import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { Chip, Searchbar } from 'react-native-paper';
import { DestinationContext } from '../context/destinationContext';
import DestinationItem from '../components/DestinationItem';
import { fontSizes } from '../constants';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [destinations, setDestinations, getAllDestinations] = useContext(DestinationContext);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllDestinations();
    }, []);

    useEffect(() => {
        axios
            .get('/api/v1/category/get-category')
            .then((response) => {
                if (response.data.success) {
                    setCategories(response.data.category);
                } else {
                    console.error('Error fetching category:', response.data.message);
                }
            })
            .catch((error) => {
                console.error('API request error:', error);
            });
    }, []);

    const filteredDestinations = () =>
        destinations.filter((destination) =>
            destination.name.toLowerCase().includes(searchText.toLowerCase())
        );

    const renderDestinationItem = ({ item }) => {
        return <DestinationItem item={item} navigation={navigation} />;
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Searchbar
                placeholder="Search"
                onChangeText={(text) => setSearchText(text)}
                value={searchText}
                style={{ margin: 10 }}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'black', marginTop: 10 }}>Category</Text>
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.name}
                data={categories}
                style={{
                    maxHeight: 60,
                }}
                renderItem={({ item }) => (
                    <Chip
                        style={{ ...styles.categoryChip, backgroundColor: '#FFA500' }}
                        onPress={() => navigation.navigate('CategoryDestination', { categorySlug: item.slug })}
                        textStyle={styles.chipText}
                    >
                        {item.name}
                    </Chip>
                )}
            />
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'black', marginTop: 10, textAlign: 'center' }}>All Destination</Text>

            {filteredDestinations().length > 0 ? (
                <FlatList
                    data={filteredDestinations()}
                    renderItem={renderDestinationItem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item._id}
                    numColumns={2}
                    contentContainerStyle={{ padding: 10 }}
                />
            ) : (
                <View style={styles.noResultsContainer}>
                    <Text style={styles.noResultsText}>Not found destination</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    categoryChip: {
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden',
        height: 45
    },
    chipText: {
        color: 'white',
    },
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noResultsText: {
        fontSize: fontSizes.h3,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default HomeScreen;
