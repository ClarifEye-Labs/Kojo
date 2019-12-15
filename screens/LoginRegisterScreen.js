import React from 'react'
import { View, StyleSheet, Text, TextInput, Button, TouchableOpacity} from 'react-native'
import { OutlineButton,  BlackOverlay, LogoPlaceholder} from '../Components'
import { dimens, colors } from '../constants'
import * as Facebook from 'expo-facebook';



const LoginRegisterScreen = (props) => {  

  const {
    lowerContainer, 
    upperContainer, 
    middleContainer,
    mainContainer, 
    logo,
    logoText,
    loginText,
    loginSubText,
    loginContainer,
    textInputStyle,
    facebookButton
  } = styles;

  const id = "1017119615324098";

  login = async () => {
    console.log("hello")
    await Facebook.initializeAsync("1017119615324098","Kojo")
    await Facebook.setAutoInitEnabledAsync(true)
    const {type,token} = await Facebook.logInWithReadPermissionsAsync("1017119615324098", {permissions: ['public_profile', 'email', 'user_friends']})
    if(type=='success'){
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`

      );

      console.log('response', response);
      // const json = await response.json();
      // console.log("USER_INFO", json);

    } else {
      alert(type)
    } 

  }

  


  // async function loginWithFacebook(){
  //   const { type, token } = await Facebook.logInWithReadPermissionsAsync(
  //     "1017119615324098",
  //     {
  //       permissions: ["public_profile"]
  //     }
  //   );
  //   if (type === "success") {
  //     // Handle successful authentication here
  //   } else {
  //     // Handle errors here.
  //   }
  // }

  return (
    <View style={mainContainer}>
      <View style={upperContainer}>
        <LogoPlaceholder style={logo} />
        <Text style={logoText}> Welcome to KOJO!</Text>
      </View>
      <View style={middleContainer}>
        <TextInput 
        placeholder='Username' 
        autoCompleteType='username'  
        placeholderTextColor={colors.blackTransluscent} 
        style={textInputStyle}/>
        <TextInput 
        placeholder='Password' 
        autoCompleteType='off' 
        style={textInputStyle}
        placeholderTextColor={colors.blackTransluscent} 
        secureTextEntry={true}/>
        <TextInput 
        placeholder='Confirm Password' 
        autoCompleteType='off' 
        style={textInputStyle}
        placeholderTextColor={colors.blackTransluscent} 
        secureTextEntry={true}/>
        <TouchableOpacity onPress={()=> this.login()}>
          <View style={facebookButton}>
            <Text style={{color:'white'}}>Login with Facebook</Text>
          </View>
        </TouchableOpacity>

  
      </View>
      <View style={lowerContainer}>
        <View style={loginContainer}>
          <Text style={loginSubText}>Already a customer?</Text>
          <Text style={loginText}> Log In.</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  upperContainer: {
    width: '100%',
    height: 300,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContainer: {
    width: '100%',
    height: '100%'
  },
  buttonStyle:{
    width: '40%',
    margin: 15
  },
  logo:{
    width: 120,
    height: 120,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.colorPrimary,
  },
  middleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 30
  },
  logoText: {
    color: colors.colorPrimary,
    fontSize: 22,
    marginTop: 10,
    width: '100%',
    textAlign: 'center',
    fontFamily: 'open-sans-regular'
  },
  lowerContainer:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 75,
    width: '100%'
  },
  loginText: {
    fontSize: 18,
    color: colors.colorPrimary
  },
  loginSubText: {
    fontSize: 18,
    color: colors.blackTransluscent
  },
  loginContainer:{
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center'
  },
  textInputStyle:{
    width: '60%',
    borderColor: colors.colorPrimary,
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    margin: 10,
    textAlign: 'center',
    fontFamily: 'open-sans-light'
  },
  facebookButton:{
   width: '50%',
   borderRadius: 4,
   padding: 24,
   backgroundColor: '#3b5998' 
  }
})

export default LoginRegisterScreen

