import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { colors, fontSizes } from '../constants';
import { BASE_URL } from '../constants/IpConfig';
const DestinationItem = ({ item, navigation }) => {
    return (
        <TouchableOpacity
            style={styles.destinationItem}
            onPress={() => navigation.navigate(`DestinationDetail`, { slug: item.slug })}
        >
            <Card style={styles.card}>
                <Card.Cover source={{ uri: `http://${BASE_URL}:8080/api/v1/destination/destination-photo/${item._id}` }} />
                <Card.Content>
                    <Title style={styles.destinationTitle}>{item.name}</Title>
                    <Paragraph style={styles.destinationPrice}>Price: ${item.price}</Paragraph>
                    <Paragraph style={styles.destinationDuration}>Duration: {item.duration} hours</Paragraph>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    destinationItem: {
        flex: 0.5,
        margin: 10,
    },
    card: {
        borderRadius: 10,
        elevation: 2,
    },
    destinationTitle: {
        fontSize: fontSizes.h6,
        fontWeight: 'bold',
        marginTop: 8,
    },
    destinationPrice: {
        fontSize: fontSizes.body,
        fontWeight: 'bold',
        color: colors.primary,
    },
    destinationDuration: {
        fontSize: fontSizes.body,
    },
});

export default DestinationItem;
