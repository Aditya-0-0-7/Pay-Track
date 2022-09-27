import { StyleSheet, Text, View } from 'react-native';

export default function ConfirmedTransaction()
{
    return(
        <View style={styles.container}>
            <Text>Confirmed transaction</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });