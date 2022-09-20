import React from 'react';
import LoginPage from './src/Google Login/loginPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, Image, View } from 'react-native';
import Start from './src/appScreens/startPage';
export default function App() {
  const [isAuthenticated,setAuthenticated]=React.useState(false);
  console.log(isAuthenticated)
  const updateAuthenticated=React.useCallback(()=>{
    setAuthenticated(val => !val);
  },[setAuthenticated]);
  
  React.useEffect(()=>{
    if(isAuthenticated===false)
    {
      async function getData()
      {
        try {
          const jsonValue = await AsyncStorage.getItem('@AccessId')
          console.log(jsonValue)
          jsonValue=jsonValue !== null ? JSON.parse(jsonValue) : null;
          if(jsonValue!==null)
          {
            updateAuthenticated();
          }
        } catch(e) {
          console.log(e);
        }
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
        <LoginPage updateAuthenticated={updateAuthenticated}/>
      </View>
    );
  else
    return(
      <View>
        <Start />
      </View>
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
