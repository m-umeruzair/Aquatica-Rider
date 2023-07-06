import React, { useState } from 'react'
import {StyleSheet, Text, View,Image, TextInput, TouchableOpacity,Alert,} from 'react-native'
import {colors,hr80} from '../../globals/style'
import logo from '../../../assets/logo.png'
import { AntDesign,Ionicons } from '@expo/vector-icons'; 
import axios from 'axios';
import ip from '../../globals/ip';

export const LoginScreen = ({navigation}) => {
  const [emailFocus, setEmailFocus] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  var user


  const showAlert1 = () =>{
    Alert.alert(
       'Sign in Successfull'
    )
 }

 const showAlert2 = () =>{
    Alert.alert(
       'Wrong Password'
    )
 }

 const showAlert3 = () =>{
    Alert.alert(
       'Email not found'
    )
 }

  async function SignIn(e){
    e.preventDefault()
    
    await axios.get(`http://${ip.ip.main}:5005/log-in`,{
    params:{
        email:email,
        password:password
    }    
  }).then((response)=>{
    if(response.status == 200){
       showAlert1()
       user=response.data[0]
       navigation.navigate('home',{user:user})
    }
   
  }).catch(error=> {
    if (error.response.status==401){
        showAlert2()
    }
        else{
            showAlert3()
        }})}

  return (
    <View style={styles.container}>
      
       <View style={styles.logoout}>
        <Image style={styles.logo} source={logo}></Image>
        </View>
        <Text style={styles.title}>Sign In</Text>
        <View style={styles.inputout}>
            <AntDesign name="user" size={24} color={emailFocus===true ? colors.white : colors.dark } />
            <TextInput style={styles.input}  placeholder='Email' placeholderTextColor={emailFocus===true ? colors.white : colors.dark }
            onFocus={()=>{ setEmailFocus(true)+setPasswordFocus(false)}}
            onChangeText={e=>setEmail(e)}
            ></TextInput>
        </View>
        <View style={styles.inputout}>
        <AntDesign name="lock" size={24}  color={passwordFocus===true ? colors.white : colors.dark} />

            <TextInput style={styles.input} secureTextEntry={showPassword===true? false : true} placeholder='Password'
             placeholderTextColor={passwordFocus===true ? colors.white : colors.dark }
               onFocus={()=>{ setPasswordFocus(true)+setEmailFocus(false)}}
               onChangeText={e=>setPassword(e)}></TextInput>

             <Ionicons name={showPassword ==false? "eye-off" : 'eye'} size={24}  color={passwordFocus===true ? colors.white : colors.dark}
             onPress={()=>(setShowPassword(!showPassword))}/>
        </View>
        <TouchableOpacity onPress={SignIn}  style={styles.btn}><Text style={styles.btnText}>Log In</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('forgotpassword')}><Text>Forgot Password?</Text></TouchableOpacity>
        <View style={hr80}></View>
        <Text>Dont have an account? 
            
            <Text onPress={()=>navigation.navigate('signup')} style={{fontSize:18, textDecorationLine:'underline',color:colors.primary}}>Sign Up</Text></Text>
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
    title:{
        fontSize: 45,
        color:colors.primary,
        textAlign:'center',
        marginVertical:10,
        fontWeight:'300',  
       },
    logoout:{
        width:'85%',
        height:'25%',
        alignItems:'center'
       },
    logo:{
        width:'50%',
        height:'100%'
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
    social:{
        flexDirection:"row",
       },
    socialicons:{
        backgroundColor:'white',
        width:50,
        margin:10,
        borderRadius:10,
        padding:10,
        alignitems:'center',
        elevation:10
       }

  });

export default LoginScreen