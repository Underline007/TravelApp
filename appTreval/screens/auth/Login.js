import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../../context/authContext';
import InputBox from '../../components/Forms/InputBox';
import SubmitButton from '../../components/Forms/SubmitButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = ({ navigation }) => {
    const [state, setState] = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);

            if (!email || !password) {
                Alert.alert("Please Fill All Fields");
                setLoading(false);
                return;
            }

            setLoading(false);
            const { data } = await axios.post("api/v1/auth/login", { email, password });

            if (data.success === true) {
                await AsyncStorage.setItem("@auth", JSON.stringify(data));
                setState(data);
                navigation.navigate("Home");
            } else {
                alert("Invalid email or password");
            }
        } catch (error) {
            alert(error);
            setLoading(false);
            console.log(error);
        }
    };

    const getLcoalStorageData = async () => {
        let data = await AsyncStorage.getItem("@auth");
        console.log("Local Storage ==> ", data);
    };
    getLcoalStorageData();

    return (
        <ImageBackground source={require('../../assets/background.jpg')} resizeMode="cover" style={{ flex: 1 }}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.pageTitle}>Login</Text>
                    <View style={{ marginHorizontal: 20 }}>
                        <InputBox inputTitle={'Email'} keyboardType="email-address" autoComplete="email" value={email} setValue={setEmail} />
                        <InputBox inputTitle={'Password'} secureTextEntry={true} autoComplete="password" value={password} setValue={setPassword} />
                    </View>
                    <SubmitButton btnTitle="Login" loading={loading} handleSubmit={handleSubmit} />
                    <Text style={styles.linkText}>
                        Don't have an account?{' '}
                        <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
                            REGISTER
                        </Text>{' '}
                    </Text>
                    <Text style={{ marginTop: 20, textAlign: 'center' }}>
                        <Text style={styles.link} onPress={() => navigation.navigate('ForgotPassword')}>
                            Forgot Password
                        </Text>{' '}
                    </Text>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        padding: 16,
    },
    pageTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20,
    },
    linkText: {
        textAlign: 'center',
        color: '#fff',
    },
    link: {
        color: 'red',
        fontWeight: 'bold',
    },
});

export default Login;
