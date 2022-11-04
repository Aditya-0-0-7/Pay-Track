import Feather from 'react-native-vector-icons/Feather';
import {View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function CustomButton()
{
    const navigation=useNavigation();
    return(
        <View onStartShouldSetResponder={()=>{navigation.toggleDrawer()}} style={{position:'absolute',top:40,left:20,padding:10,backgroundColor:'white',borderRadius:5}}>
            <Feather name='menu' size={22} color="black" />
        </View>
    );
}