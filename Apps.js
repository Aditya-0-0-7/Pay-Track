import React from 'react';
import LoginPage from './src/Google Login/loginPage';
import { bindActionCreators } from 'redux';
import configStore from './src/Redux/store/configStore';
import {addUser} from './src/Redux/actions/userAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, Image, View, StatusBar } from 'react-native';
import Start from './src/appScreens/startPage';
import {connect} from 'react-redux';
const store=configStore();
function Apps(prop) {
  const [isAuthenticated,setAuthenticated]=React.useState(false);
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
          }
        })
        .catch(e => {
          console.log(e);
        })
      }
      getData();
    }
  },[])
  if(!isAuthenticated)
    return (
      <View style={styles.frontContainer}>
        <View style={styles.imageContainer}>
          <Image
          source={require('./Resources/logo.png')}
          />
        </View>
        <LoginPage updateAuthenticated={updateAuthenticated} addUser={prop.add}/>
      </View>
    );
  else
    return(
        <SafeAreaProvider>
          <StatusBar />
          <Start updateAuthenticated={updateAuthenticated} addUser={prop.add}/>
        </SafeAreaProvider>
    );
}
const styles = StyleSheet.create({
  frontContainer: {
    flex: 4,
    backgroundColor: '#232323',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageContainer: {
    flex:3,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
const mapStateToProps=(state,prop)=>{
  console.log(state);
  return{
      User:state.User
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    add: (val) => dispatch(addUser(val)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Apps);