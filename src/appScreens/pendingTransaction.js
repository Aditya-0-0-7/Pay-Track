import { StyleSheet, Text, View } from 'react-native';

export default function PendingTransaction()
{
    return(
        <View style={styles.container}>
            <Text>Pending transaction</Text>
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