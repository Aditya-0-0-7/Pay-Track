import { View, StyleSheet, useWindowDimensions, KeyboardAvoidingView, TouchableOpacity, Text } from "react-native";
import CountryPicker from "react-native-country-codes-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import showToast from './customComponent/toast';
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import CustomButton from "./customComponent/customButtonGeneral";
import { ScrollView } from "react-native-gesture-handler";
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { addId } from "../Redux/actions/userAction";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { checkVerification, sendSmsVerification } from "../Verification/api";
import Loading from '../appScreens/customComponent/loading';
import OTPInputView from "@twotalltotems/react-native-otp-input";
function Identification({addId,User,setIsVerified})
{
    const[isLoading,setLoading]=useState(false);
    const{width,height}=useWindowDimensions();
    const[receivedId,setReceivedStatus]=useState(false);
    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('+91');
    const[Id,setId]=useState("");
    function toggleRecievedId()
    {
        setReceivedStatus(val=>!val);
    }

    async function storeId(value)
    {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@VerificationId', jsonValue)
            setIsVerified(true);
          } catch (e) {
            console.log(e);
          }
    }

    function handlePhone()
    {
        if(!isNaN(Id)&&Id.length===10)
        {
            setLoading(true);
            sendSmsVerification(countryCode+Id).then((sent) => {
                sent?showToast("OTP Sent"):showToast("Error occur try again");
                if(sent)
                    toggleRecievedId();
                setLoading(false);
              });
        }
        else
        {
            showToast("Invalid Phone Number");
        }
    }
    return(
        <ScrollView>
        <KeyboardAvoidingView behaviour="position">
        <View style={{...styles.idContainer,height:height}}>

            <View style={styles.idLogo} >
                <AntDesign name='idcard' size={200} color="black" />
            </View>

            {receivedId&&(!isLoading?<View style={{...styles.idText}}>
            <OTPInputView
                style={{ width: "80%", height: 200 }}
                pinCount={6}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={(code) => {
                    setLoading(true);
                  checkVerification(countryCode+Id, code, User.privateId).then((success) => {
                    if(success===0)
                    {
                        addId({verificationId:countryCode+Id});
                        storeId(countryCode+Id);
                    }
                    else if(success===1)
                    {
                        showToast("OTP invalid");
                    }
                    else if(success===2)
                    {
                        showToast("Error occurs try again");
                    }
                    setLoading(false);
                  });
                }}
              />
              <CustomButton height={50} buttonText={"Edit Phone Number"} color="white" bgcolor='blue' press={toggleRecievedId}/>
            </View>:<Loading />)}

            {!receivedId&&(!isLoading?<View style={{...styles.idText,width:width*0.8}}>
            <View style={{flexDirection:'row',marginTop:10,marginBottom:30,width:width*0.8,justifyContent:'center'}}>
            <View style={styles.countryCodeContainer}>
                <TouchableOpacity
                    onPress={() => setShow(true)}
                    style={{
                        backgroundColor: '#D8D8D8',
                        padding: 10,
                    }}
                >
                    <Text style={{
                        color: 'black',
                        fontSize: 20,
                        maxWidth:width*0.2,
                    }}>
                        {countryCode}
                    </Text>
                </TouchableOpacity>

                <CountryPicker
                    show={show}
                    pickerButtonOnPress={(item) => {
                    setCountryCode(item.dial_code);
                    setShow(false);
                    }}
                />
                </View>
                <View style={styles.innerIndividual2}>
                    <TextInput placeholderTextColor={"grey"} placeholder="Phone Number" value={Id} style={{...styles.transactionInput,maxWidth:width*0.6}} onChangeText={(val)=>{setId(val)}}/>
                </View>
                </View>
                <CustomButton height={50} buttonText={"Confirm"} color="white" bgcolor='blue' press={handlePhone}/>
            </View>:<Loading />)}

        </View>
        </KeyboardAvoidingView>
        </ScrollView>
    );
}
styles=StyleSheet.create(
    {
        idContainer:{
            flex:5,
            alignItems:'center',
        },
        idLogo:{
            flex:2.5,
            justifyContent:'center',      
        },
        countryCodeContainer:{
            flexDirection:'row',
            minWidth:20,
            justifyContent:"center",
            backgroundColor:'#D8D8D8',
            padding:5,
            borderRadius:10,
            marginHorizontal:5
        },
        innerIndividual2:{
            flexDirection:'row',
            minWidth:100,
            justifyContent:"center",
            backgroundColor:'#D8D8D8',
            padding:5,
            borderRadius:10,
        },
        idText:{
            flex:2,
            alignItems:'center',
        },
        transactionInput:{
            fontSize:20,
            marginLeft:5,
        },
    }
);
const mapStateToProps=(state,prop)=>{
    return{
        User:state.User
    }
}

const mapDispatchToProps=(dispatch)=>{
    return(bindActionCreators({addId},dispatch));
}

export default connect(mapStateToProps,mapDispatchToProps)(Identification);