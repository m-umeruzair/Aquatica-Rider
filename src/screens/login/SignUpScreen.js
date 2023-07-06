import React, { useState } from 'react'
import {StyleSheet, Text, View, TextInput, TouchableOpacity,Modal,TouchableHighlight,Alert,ScrollView} from 'react-native'
import {colors,hr80} from '../../globals/style'
import logo from '../../../assets/logo.png'
import { AntDesign,Ionicons,SimpleLineIcons,MaterialCommunityIcons, FontAwesome, Octicons } from '@expo/vector-icons'; 
import axios from 'axios';
import * as Location from 'expo-location';
import ip from '../../globals/ip';



const  SignUpScreen = ({navigation}) => {
    
    const [emailFocus, setEmailFocus] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)
    const [confirmPasswordFocus, setConfirmPasswordFocus]= useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
    const [mobileFocus, setMobileFocus]= useState(false)
    const [nameFocus, setNameFocus] =  useState(false)
    const [idFocus, setidFocus]= useState(false)
    const [vehicleNameFocus, setvehicleNameFocus]= useState(false)
    const [vehicleNumberFocus, setVehicleNumberFocus]= useState(false)
   
    const [showModal, setShowModal]= useState(false)
    const [transparency, setTransparency] = useState(false)
    

    const[fullName,setFullName] = useState(null)
    const [id,setid]= useState(null)
    const[password,setPassword]= useState(null)
    const[password2,setPassword2]= useState(null)
    const[email,setEmail]= useState(null)
    const[phoneNumber,setPhoneNumber]= useState(null)
    const[otp,setOtp] = useState(null)
    const[otp2,setOtp2] = useState(null)
    const[address,setAddress] = useState(null)
    const[vehicleName, setVehicleName]= useState(null)
    const[vehicleNumber, setVehicleNumber] = useState(null)
    
    
   
 
    const showAlert1 = () =>{
      Alert.alert(
         'OTP Verified and Sign Up is successfull'
      )
      setShowModal(false)
   }

   const showAlert2 = () =>{
    Alert.alert(
       'Wrong OTP'
    )}

    const showAlert4 = () =>{
      Alert.alert(
         'Invalid Email Address'
      )
    }

    const showAlert5 = () =>{
      Alert.alert(
         'Invalid or Missing Fields'
      )
    }

    const showAlert6 = () =>{
      Alert.alert(
         'Password and confirm password do not match'
      )
    }

    const showAlert7 = () =>{
      Alert.alert(
         'Password length should be greater than 5'
      )
    }
    const showAlert8 = () =>{
      Alert.alert(
         'Invalid phone Number'
      )
    }
    const showAlert9 = () =>{
      Alert.alert(
         'Invalid Car Number Plate'
      )
    }
    
    const showAlert10 = () =>{
      Alert.alert(
         'Name must be greater than 2 characters'
      )
    }
 
    
 
   function signup2(){
    console.log("1:"+otp)
    console.log("2:"+otp2)
    
    if(otp==otp2){
      showAlert1()
      setTransparency(false)
      axios({
        method:"POST",
        url:`http://${ip.ip.main}:5005/createRider`,
        data:{
         riderPassword:password,
          riderEmail:email,
          riderNumber:phoneNumber,
          riderName:fullName,
          riderNIC:id,
          riderVehicleName:vehicleName,
          riderVehicleNo:vehicleNumber
        }
       }).then(navigation.navigate('signin')).catch(error=> console.log(error))
    }
    else{
        showAlert2()
        
    }
   }
    
   function signUp(e){
       e.preventDefault()
       let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
       let reg2= /^[A-Za-z]{3}-\d{3}$/
       if(reg.test(email)==false){
        showAlert4()
       }
       else if(password.length <5){
          showAlert7()
       }
       else if(fullName.length<2){
        showAlert10()
       }
       else if(phoneNumber.length < 10){
        showAlert8()
       }
       else if(reg2.test(vehicleNumber)==false){
         showAlert9()
       }
       else if(password==null || email==null || password2==null || fullName==null || vehicleName==null||vehicleNumber==null||id==null || phoneNumber==null){
       showAlert5()
       }
       else if(password!=password2){
        showAlert6()
       }
       else{
       axios({
        method:"POST",
        url:`http://${ip.ip.main}:5005/verification`,
        data:{
          email:email
        }
       }).then((response)=>{
             setOtp2(response.data)
             setShowModal(true)
             setTransparency(true)
       }).catch(error => console.log(error)) }
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
         <TouchableHighlight onPress = {signup2}>  
          <Text style = {styles.modalVerify}>Verify OTP</Text>
          </TouchableHighlight>
         <TouchableHighlight onPress = {() => {setShowModal(false)+setTransparency(false)}}>  
          <Text style = {styles.modalClose}>Close Modal</Text>
          </TouchableHighlight></View>
          </View>
      </Modal>
     <Text style={styles.title}>Sign Up</Text>
   

     <View style={styles.inputout}>
            <AntDesign name="user" size={24} color={nameFocus===true ? colors.white : colors.dark } />
            <TextInput  style={styles.input}  placeholder='Full Name' placeholderTextColor={nameFocus===true ? colors.white : colors.dark }
            onFocus={()=>{ setNameFocus(true)+setidFocus(false)+setEmailFocus(false)+setPasswordFocus(false)+setConfirmPasswordFocus(false)+setvehicleNameFocus(false)+setVehicleNumberFocus(false)+setMobileFocus(false)}}
            onChangeText={e=>setFullName(e)}
            value={fullName}
            ></TextInput>
        </View>

        <View style={styles.inputout}>
            <AntDesign name="idcard" size={24} color={idFocus===true ? colors.white : colors.dark } />
            <TextInput style={styles.input}  placeholder='NIC Number' placeholderTextColor={idFocus===true ? colors.white : colors.dark }
            onFocus={()=>{ setidFocus(true)+setNameFocus(false)+setEmailFocus(false)+setPasswordFocus(false)+setConfirmPasswordFocus(false)+setvehicleNameFocus(false)+setVehicleNumberFocus(false)+setMobileFocus(false)}}
            onChangeText={e=>setid(e)}
            value={id}
            ></TextInput>
        </View>

        <View style={styles.inputout}>
            <MaterialCommunityIcons name="email" size={24} color={emailFocus===true ? colors.white : colors.dark } />
            <TextInput style={styles.input}  placeholder='Email' placeholderTextColor={emailFocus===true ? colors.white : colors.dark }
            onFocus={()=>{ setEmailFocus(true)+setPasswordFocus(false)+setidFocus(false)+setConfirmPasswordFocus(false)+setMobileFocus(false)+setvehicleNameFocus(false)+setVehicleNumberFocus(false)+setNameFocus(false)}}
            onChangeText={e=>setEmail(e)}
            value={email}
            ></TextInput>
        </View>
        <View style={styles.inputout}>
        <AntDesign name="lock" size={24}  color={passwordFocus===true ? colors.white : colors.dark} />
            <TextInput style={styles.input} secureTextEntry={showPassword===true? false : true} placeholder='Password'
             placeholderTextColor={passwordFocus===true ? colors.white : colors.dark }
               onFocus={()=>{ setPasswordFocus(true)+setEmailFocus(false)+setidFocus(false) + setConfirmPasswordFocus(false) + setMobileFocus(false)+setvehicleNameFocus(false)+setVehicleNumberFocus(false)+setNameFocus(false)}}
               onChangeText={e=>setPassword(e)}
               value={password}></TextInput>
             <Ionicons name={showPassword ==false? "eye-off" : 'eye'} size={24}  color={passwordFocus===true ? colors.white : colors.dark}
             onPress={()=>(setShowPassword(!showPassword))}/>
        </View>

        <View style={styles.inputout}>
        <AntDesign name="lock" size={24}  color={confirmPasswordFocus===true ? colors.white : colors.dark} />
            <TextInput style={styles.input} secureTextEntry={showPassword2===true? false : true} placeholder='Confirm Password'
             placeholderTextColor={confirmPasswordFocus===true ? colors.white : colors.dark }
               onFocus={()=>{ setConfirmPasswordFocus(true)+setPasswordFocus(false)+setidFocus(false)+setEmailFocus(false)+setMobileFocus(false)+setvehicleNameFocus(false)+setVehicleNumberFocus(false)+setNameFocus(false)}}
               onChangeText={e=>setPassword2(e)}value={password2} ></TextInput>
             <Ionicons name={showPassword2 ==false? "eye-off" : 'eye'} size={24}  color={confirmPasswordFocus===true ? colors.white : colors.dark}
             onPress={()=>(setShowPassword2(!showPassword2))}/>
        </View>

        <View style={styles.inputout}>
        <AntDesign name="phone" size={24}  color={mobileFocus===true ? colors.white : colors.dark} />
            <TextInput name='number' keyboardType={'phone-pad'} style={styles.input}  placeholder='Mobile Number'
             placeholderTextColor={mobileFocus===true ? colors.white : colors.dark }
               onFocus={()=>{setMobileFocus(true)+setvehicleNameFocus(false)+setVehicleNumberFocus(false)+ setConfirmPasswordFocus(false)+setidFocus(false)+setPasswordFocus(false)+setEmailFocus(false)}}
               onChangeText={e=>setPhoneNumber(e)}
                value={phoneNumber} ></TextInput>
            
        </View>
   
        <View style={styles.inputout}>
            <FontAwesome name="car" size={24} color={vehicleNameFocus===true ? colors.white : colors.dark } />
            <TextInput style={styles.input}  placeholder='Vehicle Name' placeholderTextColor={vehicleNameFocus===true ? colors.white : colors.dark }
            onFocus={()=>{setvehicleNameFocus(true)+setVehicleNumberFocus(false)+setidFocus(false)+setNameFocus(false)+setEmailFocus(false)+setPasswordFocus(false)+setConfirmPasswordFocus(false)+setMobileFocus(false)}}
            onChangeText={e=>setVehicleName(e)}
            value={vehicleName}
            ></TextInput>
        </View>
        <View style={styles.inputout}>
            <Octicons name="number" size={24} color={vehicleNumberFocus===true ? colors.white : colors.dark } />
            <TextInput style={styles.input}  placeholder='Vehicle Plate Number' placeholderTextColor={vehicleNumberFocus===true ? colors.white : colors.dark }
            onFocus={()=>{setvehicleNameFocus(false)+setVehicleNumberFocus(true)+setidFocus(false)+setNameFocus(false)+setEmailFocus(false)+setPasswordFocus(false)+setConfirmPasswordFocus(false)+setMobileFocus(false)}}
            onChangeText={e=>setVehicleNumber(e)}
            value={vehicleNumber}
            ></TextInput>
        </View>
       
     
       
        <TouchableOpacity style={styles.btn} onPress={signUp}><Text style={styles.btnText}>Sign Up</Text></TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
        
      },
      scrollview:{
        width:'95%',
        margin:10,
        backgroundColor:'white',
        flexGrow:0,
        
        
      },
      scrollv:{
       alignItems:'center',
       justifyContent:'center'
      },
    
      title:{
        fontSize: 50,
        color:colors.primary,
        textAlign:'center',
        marginVertical:10,
        fontWeight:'300',  
       },

       inputgroup:{
        flexDirection:'row',
        width:'80%',
       
       },
       inputout:{
        flexDirection:'row',
        width:'80%',
        marginVertical:10,
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
        alignItems:'center'
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

export default SignUpScreen