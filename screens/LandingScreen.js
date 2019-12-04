import React from 'react'
import { Text, Image, View, StyleSheet } from 'react-native'
import {BlackOverlay, BackgroundImage, LandingContentView, OutlineButton} from '../Components'
import colors from '../constants/colors'

const LandingScreen = (props) => {  

    const {fullPageContainer, textStyle, button } = styles
    const component = 
    (
       <View style={fullPageContainer}>
            <BlackOverlay>  
                <BackgroundImage source={require('../assets/landing/1.jpg')}/>
            </BlackOverlay>
            <LandingContentView> 
                <OutlineButton style={button} />
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
        backgroundColor: colors.colorPrimary, 
        color: colors.colorAccent
    },
    fullPageContainer: {
        width: '100%',
        height: '100%'
    },
    button:{
        width: 250,
    }
})

export default LandingScreen

