import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RenderCustomNavBar from '../customComponent/renderCustomNavBar';
import ExpandTransaction from '../customComponent/expandTransaction';

const Stack = createNativeStackNavigator();

export default function Stacks()
{
    return(
            <Stack.Navigator
            initialRouteName="transaction"
            screenOptions={{
                headerShown: false,
            }}
            >
                <Stack.Screen name="transaction" component={RenderCustomNavBar} />
                <Stack.Screen name="transactionView" component={ExpandTransaction} />
            </Stack.Navigator>
    );
}