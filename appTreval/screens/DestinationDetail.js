import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import { useRoute, useNavigation } from '@react-navigation/native';
import { Card, Title, Button, Paragraph, Chip, IconButton } from 'react-native-paper';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { BASE_URL } from '../constants/IpConfig';

const DestinationDetail = () => {
    const [state, setState] = useContext(AuthContext);
    const { user } = state;

    const route = useRoute();
    const { slug } = route.params;
    const [destination, setDestination] = useState({});
    const [similarDestinations, setSimilarDestinations] = useState([]);

    useEffect(() => {
        if (slug) {
            getDestination();
        }
    }, [slug]);

    const getDestination = async () => {
        try {
            const { data } = await axios.get(`/api/v1/destination/get-destination/${slug}`);
            setDestination(data?.destination);
            getSimilarDestinations(data?.destination._id, data?.destination.category._id);
        } catch (error) {
            console.log(error);
        }
    };

    const getSimilarDestinations = async (destinationId, categoryId) => {
        try {
            const { data } = await axios.get(`/api/v1/destination/related-destination/${destinationId}/${categoryId}`);
            setSimilarDestinations(data?.destinations);
        } catch (error) {
            console.log(error);
        }
    };

    const navigation = useNavigation();

    const handleBookNow = () => {
        const destinationId = destination._id;
        const desprice = destination.price;
        navigation.navigate('Payment', { destinationId, desprice });
    };

    const handleSimilarDestinationPress = (destinationId) => {
        // Navigate to the detail screen with the destinationId
        navigation.navigate('DestinationDetail', { slug: destinationId });
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    icon="arrow-left"
                    size={30}
                    color="#FFF"
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                />
                <Title style={styles.headerTitle}>Destination Detail</Title>
            </View>
            <Card style={styles.mainCard}>
                <Card.Cover source={{ uri: `http://${BASE_URL}:8080/api/v1/destination/destination-photo/${destination._id}` }} />
                <Card.Content>
                    <Title style={styles.destinationTitle}>{destination.name}</Title>
                    <Paragraph style={styles.destinationDescription}>{destination.description}</Paragraph>
                    <Chip style={[styles.chip, { backgroundColor: '#2196F3' }]}>Category: {destination?.category?.name}</Chip>
                    <Chip style={[styles.chip, { backgroundColor: '#4CAF50' }]}>Price: ${destination.price}/person</Chip>
                    <Chip style={[styles.chip, { backgroundColor: '#FFC107' }]}>Duration: {destination.duration} hours</Chip>
                </Card.Content>
                <Card.Actions>
                    <Button
                        icon="book"
                        mode="contained"
                        onPress={handleBookNow}
                        style={styles.bookNowButton}
                        disabled={user.role === 2}
                    >
                        Book Now
                    </Button>
                </Card.Actions>
            </Card>

            <View style={styles.similarDestinationsContainer}>
                <Title style={styles.similarDestinationsTitle}>Similar Destinations</Title>
                {similarDestinations.length < 1 && (
                    <Paragraph style={styles.noSimilarDestinationsText}>No Similar Destinations found</Paragraph>
                )}
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {similarDestinations.map((d) => (
                        <TouchableOpacity
                            key={d._id}
                            style={styles.touchableCard}
                            onPress={() => handleSimilarDestinationPress(d.slug)}>
                            <Card style={styles.similarDestinationCard}>
                                <Card.Cover source={{ uri: `http://${BASE_URL}:8080/api/v1/destination/destination-photo/${d._id}` }} />
                                <Card.Content>
                                    <Title style={styles.similarDestinationTitle}>{d.name}</Title>
                                    <Chip style={[styles.chip, { backgroundColor: '#19d5e3' }]}>Price: ${d.price}</Chip>
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    backButton: {
        backgroundColor: '#FFA500',
        borderRadius: 50,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 40,
        color: 'black',
    },
    mainCard: {
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    destinationTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    destinationDescription: {
        fontSize: 16,
        marginBottom: 8,
    },
    chip: {
        marginVertical: 4,
    },
    bookNowButton: {
        marginTop: 8,
    },
    similarDestinationsContainer: {
        marginBottom: 16,
    },
    similarDestinationsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    noSimilarDestinationsText: {
        fontSize: 16,
        textAlign: 'center',
    },
    similarDestinationCard: {
        marginRight: 16,
        width: 180,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 8,
    },
    similarDestinationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
    touchableCard: {
        marginLeft: -5,
    },
});

export default DestinationDetail;
