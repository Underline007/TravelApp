import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, ImageBackground } from "react-native";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import axios from "axios";
import { colors } from "../../constants";

const Register = ({ navigation }) => {
    // states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    // function
    // btn func
    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (!name || !email || !password || !answer) {
                Alert.alert("Please Fill All Fields");
                setLoading(false);
                return;
            }


            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                Alert.alert("Please enter a valid email address");
                setLoading(false);
                return;
            }

            const { data } = await axios.post("/api/v1/auth/register", {
                name,
                email,
                password,
                answer,
            });

            Alert.alert(data && data.message);
            navigation.navigate("Login");
            console.log("Register Data==> ", { name, email, password, answer });
        } catch (error) {
            Alert.alert(error.response.data.message);
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/background.jpg')}
            resizeMode="cover"
            style={{ flex: 1 }}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.pageTitle}>Register</Text>
                    <View style={{ marginHorizontal: 20 }}>
                        <InputBox titleStyle={{ color: 'white' }} inputTitle={"Name"} value={name} setValue={setName} />
                        <InputBox
                            inputTitle={"Email"}
                            keyboardType="email-address"
                            autoComplete="email"
                            value={email}
                            setValue={setEmail}
                        />
                        <InputBox
                            inputTitle={"Password"}
                            secureTextEntry={true}
                            autoComplete="password"
                            value={password}
                            setValue={setPassword}
                        />
                        <Text style={{ color: 'red' }}>What is your favorite place?</Text>
                        <Text style={{ fontSize: 10, color: '#34d2eb' }}>Relate to forgetting your password later</Text>
                        <InputBox
                            inputTitle={"Answer"}
                            value={answer}
                            setValue={setAnswer}
                        />
                    </View>
                    <SubmitButton btnTitle="Register" loading={loading} handleSubmit={handleSubmit} />
                    <Text style={styles.linkText}>
                        Already Register Please{" "}
                        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
                            LOGIN
                        </Text>{" "}
                    </Text>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        padding: 16,
    },
    pageTitle: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
        marginBottom: 20,
    },
    linkText: {
        textAlign: "center",
        color: "#fff",
    },
    link: {
        color: "#34d2eb",
        fontWeight: "bold",
    },
});

export default Register;
