import {View, Text} from 'react-native';
export default function CustomLoginButton(prop){
    return(<View onStartShouldSetResponder={()=>{prop.press()}} style={prop.height?{borderRadius:10,padding:10,backgroundColor:prop.bgcolor,alignItems:'center'}:{borderRadius:10,padding:10,backgroundColor:prop.bgcolor,alignItems:'center',width:20}}>
        <Text style={{textAlign:'center', color:prop.color, fontSize:18}}>{prop.buttonText}</Text>
    </View>);
}