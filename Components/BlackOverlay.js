import React from 'react'
import {  Text, View, StyleSheet } from 'react-native'
import colors from '../constants/colors'
import { red } from 'ansi-colors'

const BlackOverlay = props => {
    const {container, blackOverlay, contentContainer} = styles
    const component = 
    <View style={container}> 
        <View style = {contentContainer}>
            {props.children}
        </View>
        <View style = {blackOverlay} />
    </View>
    return component 
}

const styles = StyleSheet.create({
    container : {
        width: '100%',
        height: '100%'
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    blackOverlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: colors.blackTransluscent
    }
})

export default BlackOverlay;

