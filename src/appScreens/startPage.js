import React, { useState } from "react";
import showToast from "./customComponent/toast";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Image, Button, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CustomLoginButton from "./customComponent/customButtonLogin";
import Drawers from "./Navigation/Drawer";

const Stack = createNativeStackNavigator();

function Start(prop)
{
    async function logoutHandler()
    {
        try
        {
            await AsyncStorage.multiRemove(['@AccessId','@VerificationId']);
            prop.addUser({});
            prop.updateAuthenticated();
            prop.setIsVerified(false);
        }
        catch
        {
            showToast("Logout Failed");
        }
    }
    return(
        <NavigationContainer>
            <Stack.Navigator
            initialRouteName="main"
            screenOptions={{
                title: 'Pay Track',
                headerStyle: {
                  backgroundColor: 'black',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerLeft:()=> <Image style={styles.headerImage} source={require('../../Resources/image.png')} />,
                headerRight:()=> {return(<CustomLoginButton buttonText="Log out" img='google' press={logoutHandler} bgcolor='white' color='black'/>)}
            }}
            >
                <Stack.Screen name="main" component={Drawers} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
const styles = StyleSheet.create({
    headerImage: {
      width:30,
      height:32,
      marginRight:15
    }
  });
export default Start;