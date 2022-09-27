import { createDrawerNavigator } from '@react-navigation/drawer';
import Tabs from './Tab';
import CustomDrawer from './customDrawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Drawer = createDrawerNavigator();

const drawerList=['View Transactions', 'Create Transaction', 'Confirm Transaction'];

export default function Drawers()
{
    return(
        <Drawer.Navigator
        drawerContent={(prop)=> <CustomDrawer {...prop}/>}
        screenOptions={{
            headerStyle: {
              backgroundColor: '#f1a661',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown:'false'
        }}
        >
            <Drawer.Screen 
            name='View Transaction'
            component={Tabs} 
            options={{title:'View Transactions', 
            drawerIcon:({color})=><FontAwesome5 name='coins' size={22} color={color} />,
            drawerActiveTintColor:'#f1a661'
          }}
            />
        </Drawer.Navigator>
    );
}