import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { useNavigation } from '@react-navigation/native';

const OrdersScreen = () => {
    const [state, setState] = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [destinationNames, setDestinationNames] = useState({});
    const [tourGuideNames, setTourGuideNames] = useState({});
    const buyerId = state.user._id;
    const navigation = useNavigation();

    const cardColors = ['#ADD8E6', '#98FB98', '#FFD700', '#FFA07A', '#FF6347'];

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`/api/v1/order/my-orders/${buyerId}`);
                setOrders(response.data.orders);


                const destNames = {};
                for (const order of response.data.orders) {
                    const response = await axios.get(`/api/v1/destination/destination-name/${order.destination}`);
                    destNames[order.destination] = response.data.name;
                }
                setDestinationNames(destNames);

                const tgNames = {};
                for (const order of response.data.orders) {
                    const response = await axios.get(`/api/v1/auth/tourguide-name/${order.tourGuide}`);
                    tgNames[order.tourGuide] = response.data.name;
                }
                setTourGuideNames(tgNames);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Orders </Text>
            <FlatList
                data={orders}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                    <Card
                        style={[
                            styles.card,
                            { backgroundColor: cardColors[index % cardColors.length] },
                        ]}
                        onPress={() => navigation.navigate('OrderDetail', { orderId: item._id })}
                    >
                        <Card.Content>
                            <Title style={styles.cardTitle}>
                                Tour {destinationNames[item.destination] || ''}
                            </Title>
                            <Paragraph style={styles.cardText}>
                                Tour Guide: {tourGuideNames[item.tourGuide] || ''}
                            </Paragraph>
                            <Paragraph style={styles.cardText}>Start Date: {item?.startDate}</Paragraph>
                            <Paragraph style={styles.cardText}>
                                Appointment Meeting: {item?.appointmentMeeting}
                            </Paragraph>
                            <Paragraph style={styles.cardText}>Amount: {item?.amount}$</Paragraph>
                        </Card.Content>
                    </Card>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    card: {
        marginVertical: 8,
        elevation: 4,
    },
    cardTitle: {
        color: '#f51b1b', // Title color
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    cardText: {
        color: '#333', // Text color
        fontSize: 14,
        marginBottom: 4,
    },
});

export default OrdersScreen;
