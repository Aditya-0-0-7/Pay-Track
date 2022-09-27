import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Image, Button, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Drawers from "./Navigation/Drawer";

const Stack = createNativeStackNavigator();

function Start(prop)
{
    const logoutHandler=()=>{
        AsyncStorage.removeItem('@AccessId').then(()=>{
            prop.updateAuthenticated();
            prop.addUser({});
        }
        ).catch(e=>{
            console.log(e);
        }
        );
    }
    return(
        <NavigationContainer>
            <Stack.Navigator
            initialRouteName="main"
            screenOptions={{
                title: 'Pay Track',
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerLeft:()=> <Image style={styles.headerImage} source={require('../../Resources/logoIcon-removebg-preview.png')} />,
                headerRight:()=> {return(<Button title="Log out" onPress={logoutHandler}></Button>)}
            }}
            >
                <Stack.Screen name="main" component={Drawers} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
const styles = StyleSheet.create({
    headerImage: {
      width:50,
      height:50,
      marginRight:15
    }
  });
export default Start;