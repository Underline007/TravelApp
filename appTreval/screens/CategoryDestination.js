import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Button, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { IconButton, Card, Title, Paragraph, Colors } from 'react-native-paper';
import { BASE_URL } from '../constants/IpConfig';
import axios from 'axios';

const CategoryDestination = ({ route, navigation }) => {
    const { categorySlug } = route.params;
    const [destinations, setDestinations] = useState([]);
    const [category, setCategory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (categorySlug) {
            getDestinationsByCategory();
        }
    }, [categorySlug]);

    const getDestinationsByCategory = async () => {
        try {
            const response = await axios.get(`/api/v1/destination/destination-category/${categorySlug}`);
            const data = response.data;
            setDestinations(data.destinations);
            setCategory(data.category);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="blue" />
                <Text>Finding destinations with category: {categorySlug}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <IconButton
                icon="arrow-left"
                size={30}
                color="black"
                onPress={() => navigation.goBack()}
                style={styles.backButton}
            />
            <Text style={styles.categoryHeader}>Category - {category?.name}</Text>
            <Text style={styles.resultText}>{destinations.length} destinations found</Text>
            {destinations.length > 0 ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {destinations.map((destination) => (
                        <Card key={destination._id} style={styles.destinationContainer}>
                            <Card.Cover
                                source={{ uri: `http://${BASE_URL}:8080/api/v1/destination/destination-photo/${destination._id}` }}
                                style={styles.destinationImage}
                            />
                            <Card.Content>
                                <Title style={styles.destinationName}>{destination.name}</Title>
                                <View style={styles.detailsContainer}>
                                    <View style={styles.detailItem}>
                                        <Text style={styles.detailLabel}>Duration:</Text>
                                        <Text style={styles.detailValue}>{destination.duration} hours</Text>
                                    </View>
                                    <View style={styles.detailItem}>
                                        <Text style={styles.detailLabel}>Price:</Text>
                                        <Text style={styles.detailValue}>{destination.price} USD</Text>
                                    </View>
                                </View>
                            </Card.Content>
                            <Card.Actions style={styles.buttonContainer}>
                                <Button
                                    title="More Details"
                                    onPress={() => navigation.navigate('DestinationDetail', { slug: destination.slug })}
                                />
                            </Card.Actions>
                        </Card>
                    ))}
                </ScrollView>
            ) : (
                <View style={styles.noDestinationContainer}>
                    <Text style={styles.noDestinationText}>No Destinations Found</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    categoryHeader: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
    },
    resultText: {
        textAlign: 'center',
    },
    destinationContainer: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'black',
    },
    destinationImage: {
        height: 200,
        resizeMode: 'cover',
    },
    destinationName: {
        fontSize: 18,
        textAlign: 'center',
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    detailItem: {
        flex: 1,
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 14,
        color: 'gray',
    },
    detailValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        justifyContent: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDestinationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDestinationText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default CategoryDestination;
