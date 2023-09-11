import { View } from "react-native";
import React, { useState } from "react";
import CustomNavBar from "./customNavBar";
import InitiateTransaction from "../initiateTransaction";
import PendingTransaction from '../pendingTransaction';
import {connect} from 'react-redux';
import showToast from "./toast";
import { addData } from "../../Redux/actions/transactionDataAction";
import ConfirmedTransaction from '../confirmedTransaction';
import Loading from './loading';
function RenderCustomNavBar({addData,User,navigation})
{
    const[optionSelected,setSelected]=React.useState('i');
    const[isLoading,setLoading]=React.useState(false);
    const[refresh,setRefresh]=useState(false);
    const selectedSetHelper=(val)=>{
        setSelected(val);
    }
    const toggleRefresh=()=>{
        setRefresh(val =>!val);
    }
    React.useEffect(()=>{
        setLoading(true);
        fetch("https://pay-track-backend-4w1wgb3q3-aditya-0-0-7.vercel.app/temp/getList", 
          {
            method: "POST",
            mode:'cors',
            body: JSON.stringify({id:User.verificationId}),
            headers: {
            "Content-Type": "application/json"
            }
        }).then((res)=>{
            if(res.status=200)
            {
                res.json().then(jres=>{
                    console.log(jres);
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
    },[optionSelected,refresh]);
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
    console.log(state.User )
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