import { View } from "react-native";
import React, { useState } from "react";
import CustomNavBar from "./customNavBar";
import { useIsFocused } from '@react-navigation/native';
import InitiateTransaction from "../initiateTransaction";
import PendingTransaction from '../pendingTransaction';
import {connect} from 'react-redux';
import showToast from "./toast";
import { addData } from "../../Redux/actions/transactionDataAction";
import ConfirmedTransaction from '../confirmedTransaction';
import Loading from './loading';
import { customFetch } from "../../helperFunction/customFetch";
function RenderCustomNavBar({addData,User,navigation})
{
    const[optionSelected,setSelected]=React.useState('i');
    const[isLoading,setLoading]=React.useState(false);
    const[refresh,setRefresh]=useState(false);
    const isFocused = useIsFocused();
    const selectedSetHelper=(val)=>{
        setSelected(val);
    }
    const toggleRefresh=()=>{
        setRefresh(val =>!val);
    }
    React.useEffect(()=>{
        if(isFocused)
        {
            setLoading(true);
            customFetch("https://8204-117-245-205-123.ngrok-free.app/temp/getList",{},User.verificationId).then((res)=>{
            if(res.status===200)
                {
                    res.json().then(jres=>{
                        addData(jres.transactions);
                        setLoading(false);
                    })
                }
                else
                {
                    showToast("Error loading transactions");
                    setLoading(false);
                }
            }).catch(e=>{
                showToast("Error loading transactions");
                setLoading(false);
            })
        }
    },[optionSelected,refresh,isFocused]);
    if(optionSelected==='i')
    return(
        <View style={isLoading?{flex:1,justifyContent:'center'}:{flex:1}}>
            {isLoading?<Loading />:<InitiateTransaction navigation={navigation} toggleRefresh={toggleRefresh}/>}
            <CustomNavBar optionSelected={optionSelected} selectedSetHelper={selectedSetHelper}/>
        </View>
    );
    else if(optionSelected==='p')
    return(
        <View style={isLoading?{flex:1,justifyContent:'center'}:{flex:1}}>
            {isLoading?<Loading />:<PendingTransaction navigation={navigation} toggleRefresh={toggleRefresh} />}
            <CustomNavBar optionSelected={optionSelected} selectedSetHelper={selectedSetHelper}/>
        </View>
    );
    else if(optionSelected==='c')
    return(
        <View style={isLoading?{flex:1,justifyContent:'center'}:{flex:1}}>
            {isLoading?<Loading />:<ConfirmedTransaction navigation={navigation} toggleRefresh={toggleRefresh} />}
            <CustomNavBar optionSelected={optionSelected} selectedSetHelper={selectedSetHelper}/>
        </View>
    );
}
const mapStateToProps=(state,prop)=>{
    return{
        User:state.User
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
      addData: (val) => dispatch(addData(val)),
    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(RenderCustomNavBar);