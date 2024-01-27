// OrderDetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Title, DataTable, Button, IconButton } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const OrderDetailScreen = ({ route }) => {
    const { orderId } = route.params;
    const [order, setOrder] = useState(null);
    const [destinationName, setDestinationName] = useState('');
    const [tourGuideName, setTourGuideName] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`/api/v1/order/single-orders/${orderId}`);
                const orderData = response.data.order;

                // Fetch destination name
                const destinationResponse = await axios.get(`/api/v1/destination/destination-name/${orderData.destination}`);
                setDestinationName(destinationResponse.data.name);

                // Fetch tour guide name
                const tourGuideResponse = await axios.get(`/api/v1/auth/tourguide-name/${orderData.tourGuide}`);
                setTourGuideName(tourGuideResponse.data.name);

                setOrder(orderData);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    const isCheckInDisabled = order?.status === 3;


    let statusText = '';
    switch (order?.status) {
        case 0:
            statusText = 'Cancelled';
            break;
        case 1:
            statusText = 'Paid';
            break;
        case 2:
            statusText = 'On Tour';
            break;
        case 3:
            statusText = 'Completed Tour';
            break;
        default:
            statusText = 'Unknown Status';
    }

    const handleCheckIn = () => {
        // Navigate to the Check-In screen with the Order Id
        navigation.navigate('CheckIn', { orderId: orderId });
    };

    if (!order) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View>
                <IconButton
                    style={{
                        backgroundColor: '#FFA500',
                        borderRadius: 50,
                    }}
                    icon="arrow-left"
                    size={30}
                    color="#FFF"
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.title}>Orders Detail</Text>
            </View>

            <Card style={styles.card}>
                <Card.Content>
                    <Title style={{
                        textAlign: 'center',
                        color: '#0c6b09',
                        fontWeight: "bold"
                    }} >Tour {destinationName}</Title>
                    <DataTable style={styles.dataTable}>
                        <DataTable.Row style={styles.headerRow}>
                            <DataTable.Cell>Tour Guide</DataTable.Cell>
                            <View style={styles.verticalDivider} />
                            <DataTable.Cell style={styles.centeredCell}>{tourGuideName}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row style={styles.dataRow}>
                            <DataTable.Cell>Start Date</DataTable.Cell>
                            <View style={styles.verticalDivider} />
                            <DataTable.Cell style={styles.centeredCell}>{order.startDate}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row style={styles.headerRow}>
                            <DataTable.Cell>Appointment Meeting</DataTable.Cell>
                            <View style={styles.verticalDivider} />
                            <DataTable.Cell style={styles.centeredCell}>{order.appointmentMeeting}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row style={styles.dataRow}>
                            <DataTable.Cell>Amount</DataTable.Cell>
                            <View style={styles.verticalDivider} />
                            <DataTable.Cell style={styles.centeredCell}>{order.amount}</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row style={styles.headerRow}>
                            <DataTable.Cell>Status</DataTable.Cell>
                            <View style={styles.verticalDivider} />
                            <DataTable.Cell style={styles.centeredCell}>{statusText}</DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </Card.Content>
            </Card>

            {/* Check-In Button */}
            <View style={styles.checkInButtonContainer}>
                <Button
                    mode="contained"
                    icon="check"
                    style={[styles.checkInButton, isCheckInDisabled && styles.disabledCheckInButton]}
                    onPress={handleCheckIn}
                    disabled={isCheckInDisabled}
                >
                    Check-In
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffd9b3'
    },
    card: {
        margin: 16,
        elevation: 4,
        marginTop: 150,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        marginTop: -50,
    },
    dataTable: {
        marginTop: 16,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#3498db',
    },
    dataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#d288fc',
    },
    verticalDivider: {
        width: 1,
        height: '100%',
        backgroundColor: '#ecf0f1',
    },
    checkInButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        marginBottom: 16,
    },
    checkInButton: {
        backgroundColor: '#4caf50',
        borderRadius: 50,
    },
    disabledCheckInButton: {
        backgroundColor: '#A9A9A9',
        borderRadius: 50,
    },
    centeredCell: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default OrderDetailScreen;
