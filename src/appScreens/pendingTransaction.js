import { StyleSheet, View, ImageBackground, useWindowDimensions, FlatList } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import CustomButton from './customComponent/customButton';
import {connect} from 'react-redux';
import { LinearGradient } from "expo-linear-gradient";
import Transaction from './customComponent/transaction';
import RefreshButton from './customComponent/refreshButton';
function PendingTransaction({transactionList,User,toggleRefresh,navigation})
{
    const{width,height}=useWindowDimensions();

    return(
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#eeeeee','#eeeeee']} style={{height:height, width:width}}>
                <ImageBackground source={require('../../Resources/logo_background.png')} style={{height:height*0.9,width:width}} resizeMode='contain' imageStyle={styles.background}>
                <CustomButton />
                <RefreshButton press={toggleRefresh} />
                <View style={{position:'relative',top:110, left:width*0.1,height:0.63*height}}>
                    <FlatList 
                    data={transactionList}
                    renderItem={({item}) => {
                        if((item.status===2 && item.Verification_ID==User.verificationId)||(item.status===0 && item.Borrower_ID==User.verificationId))
                        return(<Transaction navigation={navigation} item={item} code={2} verificationId={User.verificationId} />)
                        }}/>
                </View>
                </ImageBackground>
            </LinearGradient> 
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    background:{
        opacity:0.3,
    },
  });

  const mapStateToProps=(state,prop)=>{
    console.log(state.User )
    return{
        transactionList:state.TransactionData,
        User:state.User
    }
}

export default connect(mapStateToProps)(PendingTransaction);