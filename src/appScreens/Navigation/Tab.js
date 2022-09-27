import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, Text, Image, View, StatusBar } from 'react-native';
import InitiateTransaction from "../initiateTransaction";
import PendingTransaction from "../pendingTransaction";
import ConfirmedTransaction from "../confirmedTransaction";

const Tab = createMaterialTopTabNavigator();

export default function Tabs()
{
    return(
            <Tab.Navigator
            initialRouteName="Initiated Transaction"
            screenOptions={{
                tabBarActiveTintColor : 'black',
                tabBarInactiveTintColor: 'black',
                tabBarStyle:{
                    backgroundColor: '#fdeedc',
                },
                tabBarUpperCaseLabel:false,
            }}>
                <Tab.Screen name="Initiated Transaction" component={InitiateTransaction} />
                <Tab.Screen name="Pending Transaction" component={PendingTransaction}  />
                <Tab.Screen name="Confirmed Transaction" component={ConfirmedTransaction}  />
            </Tab.Navigator>
    );
}