import * as React from 'react';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native';
export default function LoginPage({updateAuthenticated, addUser})
{
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
      expoClientId: `818169246657-adsf4hcu3k9st0o42e0b7dueqbr75666.apps.googleusercontent.com`
    });

    React.useEffect(() => {

      const storeData = async (value) => {
        try {
          addUser(value);
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@AccessId', jsonValue)
          updateAuthenticated();
        } catch (e) {
          console.log(e);
        }
      }
      

        if (response?.type === 'success') {
          fetch("https://4043-2401-4900-5df1-74f9-a943-41e3-f476-65f6.in.ngrok.io/authenticate", 
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
                    storeData(jres);
                  })
                }
            }
          )
      }}, [response]);
    
      return (
        <View style={styles.container}>
        <Button
          disabled={!request}
          title="Login"
          onPress={() => {
            promptAsync();
            }}
        />
    </View>);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });