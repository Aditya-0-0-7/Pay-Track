import React from "react";
import {View, Text, StyleSheet, Image} from 'react-native';
import { bindActionCreators } from 'redux';
import addUser from '../../Redux/actions/userAction';
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import {connect} from 'react-redux';
function CustomDrawer({User, ...props})
{
    return(
        <View style={styles.drawerContainer}>
            <DrawerContentScrollView {...props}>
            <View style={styles.imageContainer}>
                    <Image style={styles.userImage} source={{uri:User.profile}} />
            </View>
            <Text style={styles.userText}>Hello {`${User.name}`}</Text>
            <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>
    )
}
const styles=StyleSheet.create(
    {
        drawerContainer:{
            flex:1,
            backgroundColor:'#fff',
        },
        imageContainer:{
            flex:1,
            margin:10,
            height:150,
            alignItems:'center',
            justifyContent:'center',
            
        },
        userImage:{
            borderRadius:100,
            width:'60%',
            height:'100%',
            margin:10
        },
        userText:{
            marginTop:10,
            fontSize:20,
            textAlign:'center',
            marginBottom:40
        }
    }
);
const mapStateToProps=(state,prop)=>{
    console.log(state.User )
    return{
        User:state.User
    }
}

const mapDispatchToProps=(dispatch)=>{
    return(bindActionCreators({addUser},dispatch));
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomDrawer);