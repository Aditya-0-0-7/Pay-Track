import { View, Text, TextInput, StyleSheet, ImageBackground, KeyboardAvoidingView, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "./customComponent/customButton";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButtonGeneral from "./customComponent/customButtonLogin";
import showToast from "./customComponent/toast";
import {connect} from 'react-redux';
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Loading from "./customComponent/loading";
function CreateTransaction({User})
{
    const [amount,setAmount]=useState('0');
    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    const [payTo,setPayTo]=useState("");
    const{width,height}=useWindowDimensions();
    const [isLoading,setLoading]=useState(false);

    const createTransactions=()=>{
        setLoading(true);
        fetch("https://5402-223-189-4-54.in.ngrok.io/temp/addTransaction", 
          {
            method: "POST",
            mode:'cors',
            body: JSON.stringify({name:name,amount:amount,Description:description,payTo:payTo,Verification_ID:User.verificationId,status:0}),
            headers: {
            "Content-Type": "application/json"
            }
        }).then((res)=>{
            console.log(res.status)
            if(res.status===200)
            {
                showToast("Transaction Created");
            }
            else if(res.status===500)
            {
                showToast("Borrower mail is not registered in our app");
            }
            else
            {
                showToast("Error! Transaction can not be created");
            }
            setLoading(false);
        })
    }

    const setAmounts=(val)=>{
        setAmount(val);
    }
    const setNames=(val)=>{
        setName(val);
    }
    const setDescriptions=(val)=>{
        setDescription(val);
    }
    const setPayTos=(val)=>{
        setPayTo(val);
    }
    return(
        isLoading?<View style={{flex:1,justifyContent:'center'}}><Loading /></View>:<ScrollView>
        <KeyboardAvoidingView behaviour="position">
        <LinearGradient colors={['#eeeeee','#eeeeee']} style={{height:height*0.9}}>
        <ImageBackground source={require('../../Resources/logo_background.png')} style={{height:height*0.9}} resizeMode='contain' imageStyle={styles.background}>
            <CustomButton />
            <View style={styles.transactionContainer}>
                <View style={{...styles.transactionContainerInner,height:(height*0.6)}}>
                    <View style={styles.individualContainer}>
                        <View style={styles.innerIndividual}>
                            <FontAwesome style={styles.rupee} name='rupee' size={22} color="black" />
                            <TextInput keyboardType="numeric" value={amount} style={styles.transactionInput} onChangeText={setAmounts}></TextInput>
                        </View>
                    </View>
                    <View style={styles.innerIndividual2}>
                        <TextInput placeholderTextColor={"grey"} placeholder="Transaction Name" value={name} style={styles.transactionInput} onChangeText={setNames} />
                    </View>
                    <View style={styles.innerIndividual2}>
                        <TextInput placeholderTextColor={"grey"} placeholder="Description(optional)" value={description} style={styles.transactionInput} onChangeText={setDescriptions}/>
                    </View>
                    <View style={styles.innerIndividual2}>
                        <TextInput placeholderTextColor={"grey"} placeholder="Pay to E-mail" value={payTo} style={styles.transactionInput} onChangeText={setPayTos}/>
                    </View>
                    <View style={styles.buttonContainer}>
                    <CustomButtonGeneral press={createTransactions} buttonText="Create"  bgcolor='blue' color='white'/>
                    </View>
                </View>
            </View>
        </ImageBackground>
        </LinearGradient>
        </KeyboardAvoidingView>
        </ScrollView>
    );
}
const styles=StyleSheet.create(
    {
        transactionContainer:{
            flex:1,
            justifyContent:'center',
            alignItems:'center'
        },
        transactionContainerInner:{
            width:'80%',
            backgroundColor:'black',
            padding:20,
            borderRadius:20
        },
        individualContainer:{
            width:'100%',
            alignItems:'center',
            marginVertical:30,
        },
        innerIndividual:{
            flexDirection:'row',
            minWidth:100,
            justifyContent:"center",
            backgroundColor:'#D8D8D8',
            padding:10,
            borderRadius:10,
        },
        innerIndividual2:{
            flexDirection:'row',
            minWidth:100,
            justifyContent:"center",
            backgroundColor:'#D8D8D8',
            padding:10,
            borderRadius:10,
            marginVertical:10,
        },
        buttonContainer:{
            marginTop:10,
            alignItems:'center',
        },
        transactionInput:{
            fontSize:22,
            marginLeft:5
        },
        rupee:{
            marginTop:5,
        },
        transactionText:{
            fontSize:22
        },
        background:{
            opacity:0.3,
        },
    }
);
const mapStateToProps=(state,prop)=>{
    console.log(state.User )
    return{
        User:state.User
    }
}

export default connect(mapStateToProps)(CreateTransaction);