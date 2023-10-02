import React, { useState } from 'react';
import LoginPage from './src/Google Login/loginPage';
import Identification from './src/appScreens/identification';
import Temp from './src/appScreens/customComponent/temp';
import configStore from './src/Redux/store/configStore';
import {addUser, addId} from './src/Redux/actions/userAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, Image, View, StatusBar } from 'react-native';
import Start from './src/appScreens/startPage';
import {connect} from 'react-redux';
const store=configStore();

function Apps(prop) {
  const [isAuthenticated,setAuthenticated]=React.useState(false);
  const [isVerified,setIsVerified]=useState(false);
  const updateAuthenticated=React.useCallback(()=>{
    setAuthenticated(val => !val);
  },[setAuthenticated]);

  
  React.useEffect(()=>{
    if(isAuthenticated===false)
    {
      function getData()
      {
          AsyncStorage.getItem('@AccessId').
          then(jsonValue => { 
          jsonValue = jsonValue !== null ? JSON.parse(jsonValue) : null;
          if(jsonValue!==null)
          {
            prop.add(jsonValue);
            updateAuthenticated();
            setIsVerified(true)
          }
        })
        .catch(e => {
          console.log(e);
        })
      }
      getData();
    }
    if(isVerified===false)
    {
      const checkId=()=>{
        AsyncStorage.getItem('@VerificationId').
              then(Value => { 
              if(Value!==null)
              {
                Value=JSON.parse(Value);
                prop.addId({verificationId:Value});
                setIsVerified(true);
              }
            })
            .catch(e => {
              console.log(e);
            })
      }
      
      checkId();
    }
  },[]);

  if(!isAuthenticated)
    return (
      <View style={styles.frontContainer}>
        <View style={styles.imageContainer}>
          <Image
          source={require('./Resources/logo.png')}
          style={{width:400, height:300}}
          />
        </View>
        <LoginPage updateAuthenticated={updateAuthenticated} addId={prop.addId} addUser={prop.add} setIsVerified={setIsVerified}/>
      </View>
    );
  else if(!isVerified)
      return(<Identification setIsVerified={setIsVerified} />)
  else
    return(
        <SafeAreaProvider>
          <StatusBar />
            <Start updateAuthenticated={updateAuthenticated} addUser={prop.add} setIsVerified={setIsVerified}/>
        </SafeAreaProvider>
    );
}//<Start updateAuthenticated={updateAuthenticated} addUser={prop.add} setIsVerified={setIsVerified}/>
const styles = StyleSheet.create({
  frontContainer: {
    flex: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    flex:3,
    marginTop:80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const mapStateToProps=(state,prop)=>{
  return{
      User:state.User
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    add: (val) => dispatch(addUser(val)),
    addId: (val) =>dispatch(addId(val))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Apps);