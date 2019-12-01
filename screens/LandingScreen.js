import React from 'react'
import { Text, View, StyleSheet} from 'react-native'

const LandingScreen = (props) => {    
    return <Text style={styles.textStyle}>This is working from Landing Screen</Text>
}

const styles = StyleSheet.create({
    textStyle : {
        fontFamily: 'open-sans-italic'
    }
})

export default LandingScreen

