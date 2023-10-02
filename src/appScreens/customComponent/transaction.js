import { View, Text, TouchableOpacity, StyleSheet, Image, useWindowDimensions } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default function Transaction(prop)
{
    const expandTransaction=()=>{
        if(prop.code===3)
        {
            prop.navigation.navigate("transactionView",{item:prop.item,button:false});
        }
        else if(prop.code===2)
        {
            prop.navigation.navigate("transactionView",{item:prop.item,button:true,setStatus:1});
        }
        else if(prop.code===1)
        {
            prop.navigation.navigate("transactionView",{item:prop.item,button:false});
        }
    }
    const{width,height}=useWindowDimensions();
    return(<TouchableOpacity onPress={()=>{expandTransaction()}} style={{...styles.transactionContainer,width:width*0.8}}>
            {prop.code===3&&<View style={styles.tranStatus}><Text style={{backgroundColor:prop.item.proof===null?'#CAEDFF':'#DFFFD8', padding:5,borderRadius:2.5,color:prop.item.proof===null?'#3085C3':'#609966'}}>{prop.item.proof===null?"partially committed":"committed"}</Text></View>}
            <View style={styles.inTransContainer}>
                <View style={styles.transactionImageContainer}><Image style={{...styles.trasactionImage,width:width*0.4,height:height*0.15}} source={require('../../../Resources/money.png')}/></View>
                <View style={{...styles.transactionDataContainer,width:width*0.3,height:height*0.15}}>
                    <Text style={{...styles.trasactionText,marginVertical:5}}>{prop.item.name}</Text>
                    <View style={{flexDirection:'row',marginVertical:5}}><FontAwesome name='rupee' style={{marginTop:3}} size={22} color="black" /><Text style={styles.trasactionText}>{" "+prop.item.amount}</Text></View>
                </View>
            </View>
    </TouchableOpacity>);
} 
const styles=StyleSheet.create(
    {
        tranStatus:{
            flexDirection:'row',
            justifyContent:'flex-end',
            width:'100%'
        },
        inTransContainer:{
            flexDirection:'row',
            width:'100%'
        },
        transactionContainer:{
            flexDirection:'column',
            padding:10,
            justifyContent:'flex-start',
            alignItems:'center',
            borderRadius:20,
            backgroundColor:'white',
            marginVertical:7
        },
        transactionImageContainer:{
            borderRadius:10,
            width:'50%'
        },
        transactionDataContainer:{
            width:'50%',
            alignItems:'center',
            justifyContent:'center',
            
        },
        trasactionText:{
            fontSize:18,
        },
    }
);