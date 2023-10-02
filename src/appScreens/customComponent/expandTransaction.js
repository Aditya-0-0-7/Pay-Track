import { View, Text, StyleSheet, useWindowDimensions,Button,TouchableOpacity, Image} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from "./customButtonGeneral";
import { useState, useRef, useEffect } from "react";
import showToast from '../customComponent/toast';
import Loading from './loading';
import { customFetch } from "../../helperFunction/customFetch";
import {connect} from 'react-redux';

import {Camera,getCameraPermissionsAsync,requestCameraPermissionsAsync} from 'expo-camera'
function ExpandTransaction({route,navigation,User})
{
    const {item,button,setStatus}=route.params;
    const [isLoading,setLoading]=useState(false);
    const [camera,showCamera] =useState(false);
    const [image, setImage] = useState(null);
    const [showImage,setShowImage]=useState(false);
    const [isProofSubmitted,updateSubmitStatus]=useState(false);
    const cameraRef = useRef(null);
    const imageUrl="https://8204-117-245-205-123.ngrok-free.app/proof/images/";

    useEffect(()=>{
      console.log(item);
      if(item.proof!==null)
      {
        updateSubmitStatus(true);
      }
    },[]);

    const openCamera = async () => {
        const permission=await getCameraPermissionsAsync();
        console.log(permission);
        if(!permission.granted)
        {
            const updatedPermission=await requestCameraPermissionsAsync();
            if(!updatedPermission.granted)
            {
                showToast('Failed to get camera permission');
                return;
            }
        }
        showCamera(true);
      }

      const takePicture = async () => {
        try
        {
            if (cameraRef.current) {
              const photo = await cameraRef.current.takePictureAsync();
              console.log('Captured photo:', photo);
              showToast('photo has been taken successfully');
              //uploadPicture(photo);
              setImage(photo);
            }
        }
        catch(error)
        {
            showToast('');
        }
      };
    
      const uploadPicture = async () => {
        setLoading(true);
      
        let formData = new FormData();
        formData.append('photo', {
          uri: image.uri,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });
      
        formData.append('Verification_ID', User.verificationId);
        formData.append('transaction_ID',item.transaction_ID);
        try {
          const response = await fetch('https://8204-117-245-205-123.ngrok-free.app/proof/addProof', {
            method: 'POST',
            mode:'cors',
            body: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
              Accept: 'application/json'
            },
          });
      
          if (response.status === 200) {
            updateSubmitStatus(true);
            showToast('Photo has been uploaded successfully');
          } else {
            console.log(JSON.parse(response).error)
            showToast('Error uploading photo');
          }
          setLoading(false);
        } catch (error) {
          showToast('Error uploading photo');
          setLoading(false);
        }
      };
      
    function acceptRequest()
    {
        setLoading(true);
        customFetch("https://8204-117-245-205-123.ngrok-free.app/temp/changeStatus",{status:setStatus,transaction_ID:item.transaction_ID},User.verificationId).then((res)=>{
          if(res.status===200)
          {
              showToast("Request Accepted Successfully");
          }
          else
          {
            showToast("Error! occured can not accept Request");
          }
          setLoading(false);
      }).catch(e=>{
        console.log(e);
        showToast("Error! occured can not accept Request");
        setLoading(false);
      })
    }
    const{width,height}=useWindowDimensions();
    return(isLoading?<View style={{flex:1,justifyContent:'center'}}><Loading /></View>:
    (camera?
        <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} ref={cameraRef}>
          <View style={styles.topButtonBar}>
            <TouchableOpacity style={styles.closeButton} onPress={() => {showCamera(false)}}>
              <AntDesign name='close' size={25} color="red"/>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomButtonBar}>
            <TouchableOpacity style={styles.photoButton} onPress={() => {takePicture()}}>
              <Feather name='camera' size={30} color="black"/>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    :
    showImage?
    <ScrollView>
      <View style={{height:height,width:width,...styles.showContainer}}>
          <TouchableOpacity style={styles.closePhoto} onPress={() => {setShowImage(false)}}>
                <AntDesign name='close' size={25} color="red"/>
          </TouchableOpacity>
          {!isProofSubmitted&&image===null?<Text style={{fontSize:20, textAlign:'center'}}>No proof has been found for this Transaction</Text>
          :
          (!isProofSubmitted&&image!==null||isProofSubmitted&&image!==null?<Image source={{ uri: image.uri }} style={{ width: '85%' ,height: '83%',marginTop:40 }} />
          :<Image source={{ uri: imageUrl+item.proof}} style={{ width: '85%' ,height: '83%',marginTop:40 }} />)
          }
          {!isProofSubmitted&&image!==null&&User.verificationId===item.Verification_ID&&<View style={styles.submitProof}><Button onPress={uploadPicture} title="Submit Proof"/></View>}
      </View>
    </ScrollView>
    :
    <ScrollView>
      <View style={{...styles.expandContainer,width:width*0.8,left:width*0.1}}>
          <View style={{...styles.expandTextContainer,flexDirection:'row'}}><FontAwesome name='rupee' style={{marginTop:4,paddingRight:3}} size={22} color="black" /><Text style={styles.expandText}>{item.amount}</Text></View>
          <View style={styles.expandTextContainer}><Text style={styles.expandText}>Name: {item.name}</Text></View>
          <View style={styles.expandTextContainer}><Text style={styles.expandText}>Description: {item.Description}</Text></View>
          <View style={styles.expandTextContainer}><Text style={styles.expandText}>Lander Identity: {item.Verification_ID}</Text></View>
          <View style={styles.expandTextContainer}><Text style={styles.expandText}>Borrower Identity: {item.Borrower_ID}</Text></View>
          <View style={styles.expandTextContainer}><Text style={styles.expandText}>Transaction ID: {item.transaction_ID}</Text></View>
          {button&&<View style={{marginVertical:15}}><CustomButton buttonText="Accept" color='white' bgcolor='blue' height={50} press={acceptRequest}></CustomButton></View>}
          {item.status===1&&!isProofSubmitted&&User.verificationId===item.Verification_ID&&<View style={styles.proofbtn}><Button onPress={openCamera} title="Take Picture" /></View>}
          {item.status===1&&<View><Button onPress={()=>{setShowImage(true)}} title="Check Proof" /></View>}
      </View>
    </ScrollView>))
}
const styles=StyleSheet.create({
    proofbtn:{
      marginVertical:20
    },
    submitProof:{
      margin:20
    },
    showContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.2)',
    },
    closePhoto:{
        width:40,
        height:40,
        backgroundColor:'transparent',
        position:'absolute',
        top:15,
        left:15
    },
    closeButton:{
        width:40,
        height:40,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'flex-start',
        padding:4,
        backgroundColor:'#F1EFEF',
        marginBottom:20
    },
    photoButton:{
        width:45,
        height:45,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'flex-end',
        padding:4,
        backgroundColor:'#F1EFEF',
        marginBottom:20
    },
    bottomButtonBar:{
        flex: 0.5,
        backgroundColor: 'transparent',
        flexDirection:'row',
        justifyContent:'center',
    },
    topButtonBar:{
        flex: 0.5,
        backgroundColor: 'transparent',
        flexDirection:'row',
        justifyContent:'flex-start',
        padding:15
    },
    expandContainer:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        borderRadius:20,
        padding:20,
        marginVertical:70,
    },
    expandTextContainer:{
        textAlign:'center',
        marginVertical:5
    },
    expandText:{
        fontSize:20,
        textAlign:'center'
    }
});
const mapStateToProps=(state,prop)=>{
  console.log(state.User )
  return{
      User:state.User
  }
}
export default connect(mapStateToProps)(ExpandTransaction);