import {View, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function CustomLoginButton(prop){
    return(<View onStartShouldSetResponder={()=>{prop.press()}} style={{flexDirection:'row',borderRadius:10,padding:10,backgroundColor:prop.bgcolor}}>
        <AntDesign style={{marginTop:3}} name={prop.img} size={19} color={prop.color}/>
        <Text style={{marginLeft:10, color:prop.color, fontSize:18}}>{prop.buttonText}</Text>
    </View>);
}