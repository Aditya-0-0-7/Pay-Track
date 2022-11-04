import { createDrawerNavigator } from '@react-navigation/drawer';
import {View, Image} from 'react-native';
import CreateTransaction from '../createTransaction';
import CustomDrawer from './customDrawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Stack from './stack';
const Drawer = createDrawerNavigator();

export default function Drawers()
{
    return(
        <Drawer.Navigator
        drawerContent={(prop)=> <CustomDrawer {...prop}/>}
        screenOptions={{
            headerShown:false,
            headerStyle: {
              backgroundColor: '#f1a661',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
        }}
        >
            
            <Drawer.Screen 
            name='View Transaction'
            component={Stack} 
            options={{title:'View Transactions', 
            drawerIcon:({color})=><FontAwesome5 name='coins' size={22} color={color} />,
            drawerActiveTintColor:'#fff',
            drawerActiveBackgroundColor:'black',
            drawerInactiveTintColor:'black'
          }}
            />

            <Drawer.Screen 
            name='Create Transaction'
            component={CreateTransaction} 
            options={{title:'Create Transaction', 
            drawerIcon:({color})=>{return(color==='black'?<Image style={{width:30,height:30}} source={require('../../../Resources/createTransaction.png')}></Image>:<Image style={{width:30,height:30}} source={require('../../../Resources/createTransaction2.png')}></Image>)},
            drawerActiveTintColor:'#fff',
            drawerActiveBackgroundColor:'black',
            drawerInactiveTintColor:'black'
          }}
            />
        </Drawer.Navigator>
    );
}