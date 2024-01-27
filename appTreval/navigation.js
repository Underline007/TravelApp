import { View, Text } from 'react-native'
import React from 'react'
import { AuthProvider } from './context/authContext'
import ScreenMenu from './components/Menus/ScreenMenu'
import { DestinationProvider } from './context/destinationContext'
// import { PostProvider } from './context/postContext'

const RootNavigation = () => {
    return (
        <AuthProvider>
            <DestinationProvider>
                <ScreenMenu />
            </DestinationProvider>
        </AuthProvider>
    )
}

export default RootNavigation