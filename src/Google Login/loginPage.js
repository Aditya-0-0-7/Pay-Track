import * as React from 'react';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showToast from '../appScreens/customComponent/toast';
import { StyleSheet, View } from 'react-native';
import CustomLoginButton from '../appScreens/customComponent/customButtonLogin';
import Loading from '../appScreens/customComponent/loading';

export default function LoginPage({updateAuthenticated, addUser, addId, setIsVerified})
{
    const[isLoading,setLoading]=React.useState(false);
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
      expoClientId: `818169246657-adsf4hcu3k9st0o42e0b7dueqbr75666.apps.googleusercontent.com`
    });

    React.useEffect(() => {

      const storeData = async (value) => {
        try {
          addUser(value);
          if('verificationId' in value)
          {
            delete value.verificationId;
          }
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@AccessId', jsonValue)
          updateAuthenticated();
          setLoading(false);
        } catch (e) {
          console.log(e);
        }
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
      
        if (response?.type === 'success') {
          setLoading(true);
          fetch("https://c24e-59-96-68-131.in.ngrok.io/authenticate", 
          {
            method: "POST",
            mode:'cors',
            body: JSON.stringify({token: response.params['id_token']}),
            headers: {
            "Content-Type": "application/json"
            }
        }).then((res)=>{
                if(res.status==200)
                {
                  res.json().then(jres=>{
                    if('phone' in jres)
                    {
                      storeId(jres.phone);
                    }
                    storeData(jres);
                  })
                }
                else
                {
                  setLoading(false);
                  showToast("Login Failed");
                }
            }
          ).catch(e=>{
            setLoading(false);
            showToast("Login Failed");
          })
      }}, [response]);
    
      return (
        <View style={styles.container}>
        {!isLoading?<CustomLoginButton
          disabled={!request}
          bgcolor='black'
          color='white'
          img='google'
          buttonText="Login"
          press={() => {
            promptAsync();
            }}
        />:<Loading />}
    </View>);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });