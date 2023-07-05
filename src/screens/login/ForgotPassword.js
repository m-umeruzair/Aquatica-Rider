import React, { useState } from 'react'
import {StyleSheet, Text, View, TextInput, TouchableOpacity,Modal,TouchableHighlight,Alert} from 'react-native'
import {colors} from '../../globals/style'
import { AntDesign,Ionicons } from '@expo/vector-icons'; 
import axios from 'axios';

const ForgotPassword = ({navigation}) => {
   
    const [transparency, setTrasparency] = useState(false)
    const[email,setEmail]= useState(null)
    const [showModal, setShowModal]= useState(false)
    const[otp,setOtp] = useState(null)
    const[otp2,setOtp2] = useState(null)

    const showAlert1 = () =>{
        Alert.alert(
           'OTP Verified'
        )
        navigation.navigate('changepassword',{email:email})
        setShowModal(false)
     }

     const showAlert2 = () =>{
        Alert.alert(
           'Wrong OTP'
        )
        
     }
  
  

    function verify(e){
        e.preventDefault()
        axios({
         method:"POST",
         url:'http://192.168.18.133:5000/verification',
         data:{
           email:email
         }
        }).then((response)=>{
         
              setOtp2(response.data)
             
              setShowModal(true)
              setTrasparency(true)
        }).catch(error => console.log(error))
    }

    function verify2(){
        if(otp==otp2){
            showAlert1()
            setTrasparency(false)
        }
        else{
            showAlert2()
            setTrasparency(false)
        }
    }

  return (
    <View style={[styles.container,transparency===true? {opacity:0.1}:{opacity:1}]}>
        <Modal  transparent={true} animationType = {"slide"}   visible = {showModal}>
        <View style={styles.modal}>
          <Text style={styles.modalHeading}>Email Verification</Text>
          <View style={styles.modalInner}>
         <Text style={[styles.modalText,]}>Enter OTP:</Text>
         <TextInput keyboardType='numeric' style={[styles.modalText,{borderBottomColor:colors.dark,borderBottomWidth:1,height:55,width:'50%'}]}  placeholder="Enter OTP"
          onChangeText={e=>setOtp(e)}></TextInput>
         </View>
         <View style={{flexDirection:'row',gap:5}}>
         <TouchableHighlight onPress = {verify2}>  
          <Text style = {styles.modalVerify}>Verify OTP</Text>
          </TouchableHighlight>
         <TouchableHighlight onPress = {() => {setShowModal(false)+setTrasparency(false)}}>  
          <Text style = {styles.modalClose}>Close Modal</Text>
          </TouchableHighlight></View>
          </View>
         </Modal>
       
     
         <Text style={styles.title}>Forgot Password</Text>
         <View style={styles.inputout}>
            <AntDesign name="user" size={24}  />
            <TextInput style={styles.input}  placeholder='Enter your Email' 
            onChangeText={e=>setEmail(e)}
            value={email}
            ></TextInput>
        </View>
        <TouchableOpacity onPress={verify} style={styles.btn} ><Text style={styles.btnText}>Submit</Text></TouchableOpacity>
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
        
      },
      title:{
        fontSize: 50,
        color:colors.primary,
        textAlign:'center',
        marginVertical:10,
        fontWeight:'300',  
       },
       inputout:{
        flexDirection:'row',
        width:'80%',
        marginVertical:40,
        borderRadius:10,
        paddingVertical:10,
        paddingHorizontal:10,
        elevation:20,
        backgroundColor:colors.secondary,
       },
       input:{
        fontSize:18,
        marginLeft:10,
        width:'80%',
        color:'white',
       },
       btn:{
        marginVertical:30,
        marginHorizontal:10,
        backgroundColor:colors.primary,
        borderRadius:10,
        elevation:20,
        width:'80%',
        height:45,
        justifyContent:'center',
        alignItems:'center',
       },
       btnText:{
        fontSize:22,
        color:colors.white,
        fontWeight:'bold',
       },
       modal:{
        marginTop:'50%',
        backgroundColor:colors.white,
        opacity:1,
        justifyContent:'center',
        alignItems:'center',
        width:'70%',
        alignSelf:'center',
        margin:20,
        padding:20,
        elevation:1,
        borderRadius:10,
        borderColor:colors.primary,
        borderWidth:2
        
        // backgroundColor:colors.secondary
       },
       modalText:{
        fontSize:20,
        textAlign:'center'
       },
       modalHeading:{
        fontSize:25,
        color:colors.primary,
        borderBottomColor:colors.secondary,
        borderBottomWidth:2,
        textAlign:'center'
       },
       modalInner:{
        width:"100%",
        height:70,
        borderWidth:1,
        padding:10,
        borderColor:colors.secondary,
        flexDirection:'row',
        margin:20,
        textAlign:'center',
        alignContent:'center',
        alignItems:'center'
       },
       modalClose:{
           fontSize:20,
           fontWeight:600,
           padding:5,
           backgroundColor:colors.primary,
           color:colors.white
       },
       modalVerify:{
        fontSize:20,
        fontWeight:600,
        padding:5,
        backgroundColor:colors.secondary,
        color:colors.white
    }
})