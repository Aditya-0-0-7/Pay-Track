import { View, Text, StyleSheet, useWindowDimensions} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from "./customButtonGeneral";
import { useState } from "react";
import showToast from '../customComponent/toast';
import Loading from './loading';
export default function ExpandTransaction({route,navigation})
{
    const {item,button,setStatus}=route.params;
    const [isLoading,setLoading]=useState(false);
    function acceptRequest()
    {
        setLoading(true);
        fetch("https://pay-track-backend-4w1wgb3q3-aditya-0-0-7.vercel.app/temp/changeStatus", 
        {
          method: "POST",
          mode:'cors',
          body: JSON.stringify({id:item.transaction_ID,status:setStatus}),
          headers: {
          "Content-Type": "application/json"
          }
      }).then((res)=>{
          if(res.status===200)
          {
              showToast("Request Accepted Successfully");
          }
          else
          {
            showToast("Error! occured can not accept Request");
          }
          setLoading(false);
      }).catch(e=>{
        showToast("Error! occured can not accept Request");
        setLoading(false);
      })
    }
    const{width,height}=useWindowDimensions();
    return(isLoading?<View style={{flex:1,justifyContent:'center'}}><Loading /></View>:<View style={{...styles.expandContainer,width:width*0.8,height:height*0.6,left:width*0.1}}>
        <View style={{...styles.expandTextContainer,flexDirection:'row'}}><FontAwesome name='rupee' style={{marginTop:4,paddingRight:3}} size={22} color="black" /><Text style={styles.expandText}>{item.amount}</Text></View>
        <View style={styles.expandTextContainer}><Text style={styles.expandText}>Name: {item.name}</Text></View>
        <View style={styles.expandTextContainer}><Text style={styles.expandText}>Description: {item.Description}</Text></View>
        <View style={styles.expandTextContainer}><Text style={styles.expandText}>Lander Identity: {item.Verification_ID}</Text></View>
        <View style={styles.expandTextContainer}><Text style={styles.expandText}>Borrower Identity: {item.Borrower_ID}</Text></View>
        <View style={styles.expandTextContainer}><Text style={styles.expandText}>Transaction ID: {item.transaction_ID}</Text></View>
        {button&&<View style={{marginVertical:15}}><CustomButton buttonText="Accept" color='white' bgcolor='blue' height={50} press={acceptRequest}></CustomButton></View>}
    </View>)
}
const styles=StyleSheet.create({
    expandContainer:{
        position:'relative',
        top:60,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        borderRadius:20,
    },
    expandTextContainer:{
        textAlign:'center',
        marginVertical:5
    },
    expandText:{
        fontSize:20,
        textAlign:'center'
    }
});