
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootNavigation from './navigation';
import BottomTabNavigator from './BottomTabNavigator';




export default function App() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <RootNavigation />
        </NavigationContainer>
    );
}
