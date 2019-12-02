import React from 'react'
import { Text, Image, View, StyleSheet } from 'react-native'
import {BlackOverlay, BackgroundImage, LandingContentView} from '../Components'
import colors from '../constants/colors'

const LandingScreen = (props) => {  

    const {fullPageContainer, textStyle } = styles
    const component = 
    (
       <View style={fullPageContainer}>
            <BlackOverlay>  
                <BackgroundImage source={require('../assets/landing/1.jpg')} />
            </BlackOverlay>
            <LandingContentView> 
                <Text style={textStyle}>Welcome to KOJO!</Text> 
            </LandingContentView>
       </View>
       
        
    )

    return component
}

const styles = StyleSheet.create({
    textStyle : {
        alignContent: 'center',
        justifyContent: 'center',
        fontFamily: 'open-sans-bolditalic',
        fontSize: 40,
        color: colors.colorPrimary
    },
    fullPageContainer: {
        width: '100%',
        height: '100%'
    }
})

export default LandingScreen

