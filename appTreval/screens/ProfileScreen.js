import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Avatar, Button, TextInput } from 'react-native-paper';
import { AuthContext } from '../context/authContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const ProfileScreen = () => {
    const [state, setState] = useContext(AuthContext);
    const { user, token } = state;

    const [name, setName] = useState(user?.name);
    const [password, setPassword] = useState(user?.password);
    const [email] = useState(user?.email);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const { data } = await axios.put("api/v1/auth/profile", {
                name,
                password,
                email,
            });
            setLoading(false);
            let UD = JSON.stringify(data);
            setState({ ...state, user: UD?.updatedUser });
            alert(data && data.message);
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
            console.log(error);
        }
    };

    const getRoleText = () => {
        const roleTextMap = {
            0: 'User',
            1: 'Admin',
            2: 'TourGuide',
        };
        return roleTextMap[state.user.role] || 'Unknown Role';
    };

    const handleLogout = async () => {
        setState({ token: "", user: null });
        await AsyncStorage.removeItem("@auth");

    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.avatarContainer}>
                    <Avatar.Image
                        size={200}
                        source={{
                            uri: "https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png",
                        }}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        label="Role"
                        value={getRoleText()}
                        mode="outlined"
                        disabled
                        style={styles.inputBox}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        label="Email"
                        value={email}
                        mode="outlined"
                        disabled
                        style={styles.inputBox}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        label="Name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                        mode="outlined"
                        style={styles.inputBox}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                        mode="outlined"
                        style={styles.inputBox}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        onPress={handleUpdate}
                        loading={loading}
                        style={styles.updateBtn}
                    >
                        {loading ? "Please Wait" : "Update Profile"}
                    </Button>
                    <Button
                        mode="contained"
                        onPress={handleLogout}
                        loading={loading}
                        style={styles.logoutBtn}
                    >
                        Logout
                    </Button>

                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        marginTop: 40,
        backgroundColor: "#fff"
    },
    avatarContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    inputContainer: {
        marginVertical: 10,
        marginHorizontal: 20,
    },
    inputBox: {
        marginTop: 5,
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 30,
    },
    updateBtn: {
        width: 250,
        borderRadius: 10,
    },
    logoutBtn: {
        marginTop: 20,
        backgroundColor: "#d41330",
        width: 100,
    }
});

export default ProfileScreen;
