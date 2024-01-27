import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const TourCheckIn = () => {
    const [orderId, setOrderId] = useState('');
    const [scannedData, setScannedData] = useState('');

    const increaseOrderStatus = async () => {
        try {
            const response = await axios.put(`api/v1/order/${orderId}/check-in`, {

            });

            if (response.status === 200) {
                Alert.alert(response.data.message);
            }
            else {
                Alert.alert('Error', 'Check In Tour failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error.message);
            Alert.alert('Error', 'Check-in failed. Please try again.');
        }
    };

    const handleQRCodeRead = ({ data }) => {
        setOrderId(data);
    };

    const handleBackPress = () => {
        console.log('Back button pressed');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="arrow-back" size={24} color="black" onPress={handleBackPress} />
                <Text style={styles.checkInText}>Check In</Text>
            </View>
            <QRCodeScanner
                onRead={handleQRCodeRead}
                reactivate={true}
                showMarker={true}
                containerStyle={styles.qrScannerContainer}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Order ID"
                value={orderId}
                onChangeText={(text) => setOrderId(text)}
            />
            <Button title="Check In" onPress={increaseOrderStatus} style={styles.checkInButton} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        width: '100%',
    },
    checkInText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: '39%',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        width: '100%',
        color: 'green'
    },
    qrScannerContainer: {
        marginTop: -80,
    },
    scannedDataText: {
        marginBottom: 16,
    },
    checkInButton: {
        marginTop: 16,
    },
});

export default TourCheckIn;
