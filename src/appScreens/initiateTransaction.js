import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from "expo-status-bar";
import SafeAreaView from 'react-native-safe-area-view';

export default function InitiateTransaction()
{
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text>Initiate transaction</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });