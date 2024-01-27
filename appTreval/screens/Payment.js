import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { Title, Button, IconButton } from 'react-native-paper';
import { Menu, Provider } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from '@env';
import RazorpayCheckout from 'react-native-razorpay';
import { AuthContext } from '../context/authContext';

const Payment = ({ route, navigation }) => {
    const { destinationId, desprice } = route.params;

    const [state, setState] = useContext(AuthContext);

    const [guideOptions, setGuideOptions] = useState([]);
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [visible, setVisible] = useState(false);
    const [appointmentMeeting, setAppointmentMeeting] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [startDate, setStartDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [price, setPrice] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isStartDateVisible, setStartDateVisibility] = useState(false);
    const [tourGuide, setTourGuide] = useState();
    const [destinationName, setDestinationName] = useState('');
    const [discountCode, setDiscountCode] = useState('');
    const [discountApplied, setDiscountApplied] = useState(false);

    const handleCheckDiscount = async () => {
        try {
            const response = await axios.post('/api/v1/discount/check-discount', {
                name: discountCode,
            });

            if (response.data.success) {
                const discount = response.data.discount;

                if (discount) {
                    const currentDate = new Date().toISOString();

                    if (discount.expirationDate && discount.expirationDate < currentDate) {
                        Alert.alert('Error', 'Discount has expired.');
                    } else {
                        const discountedAmount = totalAmount * (discount.value / 100);
                        setTotalAmount(totalAmount - discountedAmount);
                        setDiscountApplied(true);
                    }
                } else {
                    Alert.alert('Error', 'Invalid discount code.');
                }
            } else {
                Alert.alert('Error', 'Error checking discount. Please try again.');
            }
        } catch (error) {
            console.error('Error checking discount:', error);

            if (error.response && error.response.status === 404) {
                Alert.alert('Error', 'Discount not found.');
            } else {
                Alert.alert('Error', 'Error checking discount. Please try again.');
            }
        }
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const formattedDate = date.toISOString().slice(0, 10);
        setStartDate(formattedDate);
        setStartDateVisibility(true);
        hideDatePicker();
    };

    const sendEmail = async () => {
        const year = startDate.substring(0, 4);
        const month = startDate.substring(5, 7);
        const day = startDate.substring(8, 10);

        try {
            const userEmail = state.user.email;
            const guideResponse = await axios.get(`/api/v1/auth/tourguide-name/${tourGuide}`);
            const tourGuideName = guideResponse.data.name;

            const emailData = {
                email: userEmail,
                subject: `You have successfully paid for tour ${destinationName}`,
                message: `Tour information:
                    Tour guide name: ${tourGuideName}
                    Start Date: ${startDate}
                    Appointment meeting: ${appointmentMeeting}
                    Amount: $ ${totalAmount}
                    
                    Please remember date ${day} month ${month} year ${year} to arrive at location: ${appointmentMeeting} to start the tour. 
                    
                    Thank you for placing your order on our system
                    
                    Best regards!
                    Dxung
                `,
            };

            const response = await axios.post('/api/v1/email/sendEmail', emailData);
            console.log(response.data);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const createOrder = async () => {
        try {
            if (!destinationId) {
                alert('Destination ID is missing');
                return;
            }

            const orderData = {
                buyer: state.user._id,
                destination: destinationId,
                startDate,
                appointmentMeeting,
                amount: totalAmount,
                tourGuide: tourGuide,
            };

            const response = await axios.post('/api/v1/order/create', orderData);
            console.log(response.data);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    let razorpayKeyId = RAZORPAY_KEY_ID;
    let razorpayKeySecret = RAZORPAY_KEY_SECRET;

    const currency = 'USD';

    const handlePayment = () => {
        if (!tourGuide || !startDate || !appointmentMeeting) {
            alert('Please enter all required information before booking.');
            return;
        }
        if (totalAmount <= 0) {
            alert('Total amount is invalid');
            return;
        }

        var options = {
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: currency,
            key: razorpayKeyId,
            amount: totalAmount * 100,
            name: 'Payment',
            prefill: {
                email: 'xyz@gmail.com',
                contact: '9999999999',
                name: 'Dung',
            },
            theme: { color: '#F37254' },
        };

        RazorpayCheckout.open(options)
            .then((data) => {
                createOrder();
                sendEmail();
                alert(`Payment Success With ID: ${data.razorpay_payment_id}`);
                navigation.navigate('Home');
            })
            .catch((error) => {
                console.log(error);
                alert(`Error: ${error.code} | ${error.description}`);
            });
    };

    useEffect(() => {
        axios
            .get(`api/v1/destination/destination-name/${destinationId}`)
            .then((response) => {
                setDestinationName(response.data.name);
            })
            .catch((error) => {
                console.error('Error fetching guide options:', error);
            });
    }, []);

    useEffect(() => {
        axios
            .get('api/v1/auth/users/role2')
            .then((response) => {
                setGuideOptions(response.data.users);
            })
            .catch((error) => {
                console.error('Error fetching guide options:', error);
            });
    }, []);

    useEffect(() => {
        const calculatedPrice = calculatePrice();
        setPrice(calculatedPrice);
        const calculatedTotalAmount = calculatedPrice * quantity;
        setTotalAmount(calculatedTotalAmount);
    }, [selectedGuide, appointmentMeeting, quantity, startDate]);

    const calculatePrice = () => {
        return desprice;
    };

    const handleGuideChange = (guide) => {
        setSelectedGuide(guide);
        setTourGuide(guide._id);
        setVisible(false);
    };

    const handleQuantityChange = (text) => {
        if (/^\d+$/.test(text) || text === '') {
            setQuantity(text);
        }
    };

    return (
        <Provider>
            <View style={styles.container}>
                <View style={styles.header}>
                    <IconButton
                        icon="arrow-left"
                        size={30}
                        color="#FFF"
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    />
                    <Title style={styles.headerTitle}>Payment</Title>
                </View>
                <Text style={styles.subtitle}>Select Tour Guide</Text>
                <Menu
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    anchor={
                        <Menu.Item
                            onPress={() => setVisible(true)}
                            title={`Tour Guide Name: ${selectedGuide ? `${selectedGuide.name}` : 'Select'}`}
                        />
                    }
                >
                    {guideOptions.map((guide) => (
                        <Menu.Item key={guide._id} onPress={() => handleGuideChange(guide)} title={guide.name} />
                    ))}
                </Menu>
                <View style={styles.divider} />
                <Text style={styles.subtitle}>Appointment Meeting:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Appointment Meeting"
                    value={appointmentMeeting}
                    onChangeText={(text) => setAppointmentMeeting(text)}
                />
                <View style={styles.divider} />

                <Text style={styles.subtitle}>Tour participants</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Tour participants"
                    value={quantity}
                    onChangeText={handleQuantityChange}
                />

                <View style={styles.divider} />

                <Text style={styles.subtitle}>Price:</Text>
                <Text style={{ fontSize: 16 }}>{price}</Text>

                <View style={styles.divider} />
                <Text style={styles.subtitle}>Start Date:</Text>

                <View style={{
                    flexDirection: 'row',
                }}>

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />

                    {isStartDateVisible && <Text style={{ flex: 1, fontSize: 16, marginTop: 5 }}>{String(startDate)}</Text>}
                    <Button mode="contained" onPress={showDatePicker} style={styles.pickBtn}>
                        Show Date Picker
                    </Button>
                </View>
                <View style={styles.divider} />


                <TextInput
                    style={styles.input}
                    placeholder="Enter Discount Code"
                    value={discountCode}
                    onChangeText={(text) => setDiscountCode(text)}
                />
                <Button
                    mode="contained"
                    onPress={handleCheckDiscount}
                    style={styles.disButton}
                    disabled={discountApplied}
                >
                    Check Discount
                </Button>

                <View style={{
                    flexDirection: 'row',
                }}>
                    <Text style={styles.amount}>Total Amount:</Text>
                    <Text style={{ marginTop: 16, fontWeight: 'bold', fontSize: 30 }}>${totalAmount}</Text>
                </View>

                <Button mode="contained" onPress={handlePayment} style={styles.button}>
                    Book Now
                </Button>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#FFA500',
        padding: 8,
        borderRadius: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: '20%',
        color: 'black',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        flex: 1,
    },

    amount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333333',
        flex: 1,
        marginTop: 20
    },
    input: {
        height: 40,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    button: {
        marginTop: 16,
        backgroundColor: '#FFA500',
        borderRadius: 8,
    },
    pickBtn: {
        backgroundColor: '#1811ed',
        borderRadius: 8,
    },

    disButton: {
        backgroundColor: '#FFA500',
        borderRadius: 8,
    },
    divider: {
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 1,
        marginVertical: 16,
    },
});

export default Payment;
