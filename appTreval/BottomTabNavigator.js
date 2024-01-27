import React, { useContext } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import TourCheckIn from './screens/TourCheckIn';
import OrdersScreen from './screens/OrdersScreen';
import { AuthContext } from './context/authContext';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
    const [state, setState] = useContext(AuthContext);
    const { user } = state;

    const renderTabs = () => {
        if (user && user.role === 2) {
            return (
                <Tab.Navigator
                    activeColor="#e8a217"
                    inactiveColor="#ffffff"
                    barStyle={{
                        backgroundColor: '#15d8ed',
                        borderRadius: 25,
                        overflow: 'hidden',
                        width: '80%',
                        alignSelf: 'center',
                    }}
                    style={{
                        backgroundColor: 'white',
                        marginBottom: 5,
                    }}
                    shifting={true}
                >
                    <Tab.Screen
                        name="HomePage"
                        component={HomeScreen}
                        options={{
                            tabBarLabel: 'Home',
                            tabBarIcon: ({ color }) => (
                                <Icon name="home" color={color} size={26} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="CheckIn"
                        component={TourCheckIn}
                        options={{
                            tabBarLabel: 'Check In',
                            tabBarIcon: ({ color }) => (
                                <Icon name="check" color={color} size={26} />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Profile"
                        component={ProfileScreen}
                        options={{
                            tabBarLabel: 'User',
                            tabBarIcon: ({ color }) => (
                                <Icon name="account" color={color} size={26} />
                            ),
                        }}
                    />
                </Tab.Navigator>
            );
        } else {
            return (
                <Tab.Navigator
                    activeColor="#e8a217"
                    inactiveColor="#ffffff"
                    barStyle={{
                        backgroundColor: '#15d8ed',
                        borderRadius: 25,
                        overflow: 'hidden',
                        width: '80%',
                        alignSelf: 'center',
                    }}
                    style={{
                        backgroundColor: 'white',
                        marginBottom: 5,
                    }}
                    shifting={true}
                >
                    <Tab.Screen
                        name="HomePage"
                        component={HomeScreen}
                        options={{
                            tabBarLabel: 'Home',
                            tabBarIcon: ({ color }) => (
                                <Icon name="home" color={color} size={26} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Orders"
                        component={OrdersScreen}
                        options={{
                            tabBarLabel: 'Orders',
                            tabBarIcon: ({ color }) => (
                                <Icon name="clipboard-list" color={color} size={26} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Profile"
                        component={ProfileScreen}
                        options={{
                            tabBarLabel: 'User',
                            tabBarIcon: ({ color }) => (
                                <Icon name="account" color={color} size={26} />
                            ),
                        }}
                    />
                </Tab.Navigator>
            );
        }
    };

    return renderTabs();
};

export default BottomTabNavigator;
