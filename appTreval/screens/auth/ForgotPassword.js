import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const ForgotPasswordScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [answer, setAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleResetPassword = async () => {
        try {
            const response = await axios.post('/api/v1/auth/forgot-password', {
                email,
                answer,
                newPassword,
            });

            if (response.data.success) {
                Alert.alert("Reset Password Successfully")
                navigation.navigate('Login');
            } else {
                Alert.alert(response.data.message);
            }
        } catch (error) {
            // console.error('Error resetting password:', error);
            Alert.alert('Reset password failed');
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/background.jpg')}
            resizeMode="cover"
            style={styles.container}
        >
            <Text style={styles.title}>Forgot Password</Text>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                />
                <Text style={styles.label}>Answer:</Text>
                <TextInput
                    style={styles.input}
                    value={answer}
                    onChangeText={(text) => setAnswer(text)}
                    placeholder="Enter your answer"
                />
                <Text style={styles.label}>New Password:</Text>
                <TextInput
                    style={styles.input}
                    value={newPassword}
                    onChangeText={(text) => setNewPassword(text)}
                    placeholder="Enter your new password"
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                    <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1e2225',
        marginBottom: 20,
    },
    formContainer: {
        marginHorizontal: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#fff', // Màu chữ trắng để hiển thị trên hình ảnh
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Màu nền ô input với độ trong suốt
        borderRadius: 10,
        color: '#1e2225', // Màu chữ trên ô input
    },
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ForgotPasswordScreen;
