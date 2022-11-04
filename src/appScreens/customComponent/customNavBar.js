import { View, StyleSheet, Text } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { screensEnabled } from "react-native-screens";
export default function customNavBar(prop)
{
    return(
        <View style={styles.navbarContainer}>
            <View onStartShouldSetResponder={()=>{prop.selectedSetHelper('i')}} style={{...styles.navbarItem,backgroundColor:prop.optionSelected==='i'?'grey':'black', transform:prop.optionSelected==='i'?[{scale:1.1}]:[{scale:0.9}]}}>
                <Fontisto name='prescription' size={22} color={prop.optionSelected==='i'?"black":"#fff"}/>
                <Text style={{color:prop.optionSelected==='i'?"black":"#fff"}}>Initiated</Text>
                <Text style={{color:prop.optionSelected==='i'?"black":"#fff"}}>Transaction</Text>
            </View>
            <View onStartShouldSetResponder={()=>{prop.selectedSetHelper('p')}} style={{...styles.navbarItem,backgroundColor:prop.optionSelected==='p'?'grey':'black', transform:prop.optionSelected==='p'?[{scale:1.1}]:[{scale:0.9}]}}>
                <MaterialIcons name='pending-actions' size={22} color={prop.optionSelected==='p'?"black":"#fff"} />
                <Text style={{color:prop.optionSelected==='p'?"black":"#fff"}}>Pending</Text>
                <Text style={{color:prop.optionSelected==='p'?"black":"#fff"}}>Transaction</Text>
            </View>
            <View onStartShouldSetResponder={()=>{prop.selectedSetHelper('c')}} style={{...styles.navbarItem,backgroundColor:prop.optionSelected==='c'?'grey':'black', transform:prop.optionSelected==='c'?[{scale:1.1}]:[{scale:0.9}]}}>
                <Fontisto name='checkbox-active' size={22} color={prop.optionSelected==='c'?"black":"#fff"} />
                <Text style={{color:prop.optionSelected==='c'?"black":"#fff"}}>Confirmed</Text>
                <Text style={{color:prop.optionSelected==='c'?"black":"#fff"}}>Transaction</Text>
            </View>
        </View>
    );
}
const styles=StyleSheet.create({
    navbarContainer:{
        position:'absolute',
        bottom:20,
        flexDirection:'row',
        borderRadius:20,
        backgroundColor:'#fff',
        justifyContent:'space-around',
        alignSelf:'center',
    },
    navbarItem:{
        margin:10,
        borderRadius:20,
        alignItems:'center',
        padding:10,
    }
});