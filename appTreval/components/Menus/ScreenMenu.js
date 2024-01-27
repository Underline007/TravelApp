import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from '../../screens/auth/Register';
import Login from '../../screens/auth/Login';
import HomeScreen from '../../screens/HomeScreen';
import { AuthContext } from '../../context/authContext';
import DestinationDetail from '../../screens/DestinationDetail';
import Payment from '../../screens/Payment';
import CategoryDestination from '../../screens/CategoryDestination';
import OrdersScreen from '../../screens/OrdersScreen';
import OrderDetailScreen from '../../screens/OrderDetailScreen';
import BottomTabNavigator from '../../BottomTabNavigator';
import CheckInScreen from '../../screens/CheckInScreen';
import TourCheckIn from '../../screens/TourCheckIn';
import ForgotPasswordScreen from '../../screens/auth/ForgotPassword';






const ScreenMenu = () => {

    //global state
    const [state] = useContext(AuthContext)
    //auth condition true false
    const authenticatedUser = state?.user && state?.token
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }} >
            {authenticatedUser ?
                (<>
                    <Stack.Screen
                        name='Home'
                        component={BottomTabNavigator}

                    />
                    <Stack.Screen
                        name='DestinationDetail'
                        component={DestinationDetail}

                    />
                    <Stack.Screen
                        name='Payment'
                        component={Payment}

                    />
                    <Stack.Screen
                        name='CategoryDestination'
                        component={CategoryDestination}

                    />
                    <Stack.Screen
                        name='Orders'
                        component={OrdersScreen}
                    />
                    <Stack.Screen
                        name='OrderDetail'
                        component={OrderDetailScreen}
                    />
                    <Stack.Screen
                        name='CheckIn'
                        component={CheckInScreen}
                    />
                    <Stack.Screen
                        name='TourCheck'
                        component={TourCheckIn}
                    />

                </>) : (
                    <>
                        <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
                        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                        <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} options={{ headerShown: false }} />

                    </>
                )}


        </Stack.Navigator>

    )
}

export default ScreenMenu