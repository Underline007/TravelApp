import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Title, IconButton } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';

const CheckInScreen = ({ route }) => {
    const { orderId } = route.params;
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    icon="arrow-left"
                    size={30}
                    color="#FFF"
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                />
                <Title style={styles.title}>Check-In</Title>
            </View>
            <View style={styles.content}>
                <View style={styles.qrCodeContainer}>
                    <QRCode value={orderId} size={200} />
                </View>
                <Text style={styles.subtitle}>Scan QR Code to check in tour</Text>
                <Text style={styles.additionalText}>Or</Text>
                <Text style={styles.additionalText}>Input Order ID to check in tour</Text>
                <View style={styles.orderIdContainer}>
                    <Text style={styles.orderIdLabel}>Order ID:</Text>
                    <Text style={styles.orderId}>{orderId}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffd9b3'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: '20%',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
    },
    qrCodeContainer: {
        borderWidth: 5,
        borderColor: '#3498db',
        padding: 10,
        borderRadius: 10,
    },
    subtitle: {
        fontSize: 22,
        color: 'green',
        marginTop: 16,
    },
    additionalText: {
        fontSize: 18,
        color: 'black',
        marginTop: 16,
    },
    orderIdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    orderIdLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 8,
    },
    orderId: {
        fontSize: 18,
        color: '#3498db', // or any color you prefer
    },
    backButton: {
        backgroundColor: '#FFA500',
        borderRadius: 50,
    },
});

export default CheckInScreen;
