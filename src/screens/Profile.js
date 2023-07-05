import { StyleSheet, Text, View, Image,TextInput,TouchableOpacity, Modal,TouchableHighlight, Alert} from 'react-native'
import React, { useState, useEffect} from 'react'
import { colors } from '../globals/style'
import { AntDesign,SimpleLineIcons,Ionicons, FontAwesome, Octicons } from '@expo/vector-icons';
import axios from 'axios';
import * as Location from 'expo-location';
import ip from '../globals/ip';

const Profile = ({route}) => {
    const params = route.params
    var user= params.user
    //console.log(user._id)
   
    const [editable,setEditable] = useState(false)

    const [showModal, setShowModal]= useState(false)
    const [transparency, setTrasparency] = useState(false)
    

    const[riderName,setriderName] = useState(null)
    const[riderPassword,setriderPassword]= useState(null)
    const[riderEmail,setriderEmail]= useState(null)
    const[riderNumber,setriderNumber]= useState(null)
    const[riderVehicleName, setRiderVehicleName]= useState(null)
    const[riderVehicleNo, setriderVehicleNo]= useState(null)
    const [riderNIC, setRiderNIC] = useState(null)
    
    const[otp,setOtp] = useState(null)
    const[otp2,setOtp2] = useState(null)


    const[riderName2,setriderName2] = useState(null)
    const[riderVehicleName2, setRiderVehicleName2]= useState(null)
    const[riderVehicleNo2, setriderVehicleNo2]= useState(null)
    const [riderNIC2, setRiderNIC2] = useState(null)
    const[riderPassword2,setriderPassword2]= useState(null)
    const[riderEmail2,setEmai2]= useState(null)
    const[riderNumber2,setriderNumber2]= useState(null)
    
    
    const [shouldUpdate, setShouldUpdate]= useState(false)

 
    


  

    const x= user._id
    const showAlert = () =>{
      Alert.alert(
         'Updated Successfully!'
      )}

      const showAlert1 = () =>{
        Alert.alert(
           'Update failed!'
        )}

    const showAlert2 = () =>{
      Alert.alert(
         'No fields to update!'
      )}

      const showAlert3 = () =>{
        Alert.alert(
           'Wrong OTP'
        )}
  function update2(e){
         e.preventDefault()
          if(otp!=otp2){
        setEditable(false)
          showAlert3()
       }else{
        axios({
          method:"POST",
          url:`http://${ip.ip.main}:5005/updateRider`,
          data:{
            riderEmail:riderEmail,
            riderName:riderName,
            riderNumber:riderNumber,
            riderNIC:riderNIC,
            riderPassword:riderPassword,
            riderVehicleName:riderVehicleName,
            riderVehicleNo:riderVehicleNo,
            Id:x
          }
         }).then((response)=>{
          if(response.status==200){
            user=response.data.rider
              
            setriderName2(user.riderName)
            setRiderNIC2(user.riderNIC)
            setriderNumber2(user.riderNumber)
            setEmai2(user.riderEmail)
            setRiderVehicleName2(user.riderVehicleName)
            setriderVehicleNo2(user.riderVehicleNo)
            
            setriderEmail(null)
            setriderName(null)
            setRiderNIC(null)
            setRiderVehicleName(null)
            setriderVehicleNo(null)
            setriderPassword(null)
            setriderNumber(null)
            
            
            showAlert();
            setEditable(false)
            setShouldUpdate(true)
          }else{
            showAlert1();
            setEditable(false)
            setriderEmail(null)
            setriderName(null)
            
            setriderPassword(null)
            setriderNumber(null)
            setRiderNIC(null)
            setRiderVehicleName(null)
            setriderVehicleNo(null)
            
          }
         }).catch(error=>{
          showAlert1();
          setEditable(false)
          console.log(error)
         })
  }
}
    function update(e){
      if(riderEmail==null && riderName==null && riderPassword==null 
        && riderNumber==null && riderNIC==null && riderVehicleName==null&&riderVehicleNo==null){
        showAlert2()
        setEditable(false)
      }
      else if(riderEmail!=null){
          e.preventDefault()
       axios({
        method:"POST",
        url:`http://${ip.ip.main}:5005/verification`,
        data:{
          riderEmail:riderEmail
        }
       }).then((response)=>{
             setOtp2(response.data)
             setShowModal(true)
             setTrasparency(true)
             
             user=response.data.rider
             
       }).catch(error => 
        console.log(error)+
        setEditable(false)) 
        }
        else{
        
          axios({
            method:"POST",
            url:`http://${ip.ip.main}:5005/updateRider`,
            data:{
              riderEmail:riderEmail,
              riderName:riderName,
              riderNumber:riderNumber,
              riderNIC:riderNIC,
              riderPassword:riderPassword,
              riderVehicleName:riderVehicleName,
              riderVehicleNo:riderVehicleNo,
              Id:x
            }
           }).then((response)=>{
            

            if(response.status==200){
             
              user=response.data.rider
              setriderEmail(null)
              setriderName(null)
              setRiderNIC(null)
              setRiderVehicleName(null)
              setriderVehicleNo(null)
              setriderPassword(null)
              setriderNumber(null)
              
              setriderName2(user.riderName)
              setRiderNIC2(user.riderNIC)
              setriderNumber2(user.riderNumber)
              setEmai2(user.riderEmail)
              setRiderVehicleName2(user.riderVehicleName)
              setriderVehicleNo2(user.riderVehicleNo)
              showAlert();
              setEditable(false)
              setShouldUpdate(true)
               
            }else{
              setriderEmail(null)
              setriderName(null)
              setRiderNIC(null)
              setRiderVehicleName(null)
              setriderVehicleNo(null)
              setriderPassword(null)
              setriderNumber(null)
              showAlert1();
              setEditable(false)
            }
           }).catch(error=>{
            setriderEmail(null)
              setriderName(null)
              setRiderNIC(null)
              setRiderVehicleName(null)
              setriderVehicleNo(null)
              setriderPassword(null)
              setriderNumber(null)
            
           
            showAlert1();
            setEditable(false)
            console.log(error)
           })
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
         <TouchableHighlight onPress = {update2}>  
          <Text style = {styles.modalVerify}>Verify OTP</Text>
          </TouchableHighlight>
         <TouchableHighlight onPress = {() => {setShowModal(false)+setTrasparency(false)}}>  
          <Text style = {styles.modalClose}>Close Modal</Text>
          </TouchableHighlight></View>
          </View>
      </Modal>

      <View style={styles.view1}>
        
        <Image style={styles.image} source={require('../../assets/profile.png')}></Image>
        <Text style={styles.name}>{shouldUpdate==false ? user.riderName: riderName2}</Text>
      </View>
      {editable==false ?<View style={styles.inputout}>
            <AntDesign name="user" size={24} color={editable===true ? colors.white : colors.dark } />
            <Text style={styles.input}>{shouldUpdate==false ? user.riderName: riderName2}</Text>
        </View>:<View style={styles.inputout}>
            <AntDesign name="user" size={24} color={editable===true ? colors.white : colors.dark } />
            <TextInput style={styles.input} placeholderTextColor={editable===true ? colors.white : colors.dark } placeholder={shouldUpdate==false ? user.riderName: riderName2}
            value={riderName} onChangeText={e=>{setriderName(e)}}></TextInput>
        </View>
        }

         <View style={styles.inputout}>
            <AntDesign name="idcard" size={24} color={editable===true ? colors.white : colors.dark } />
            {editable==false?      <Text style={styles.input}>{shouldUpdate==false? user.riderNIC:riderNIC2}</Text>:  
         <TextInput style={styles.input}  placeholder={shouldUpdate==false? user.riderNIC:riderNIC2} placeholderTextColor={editable===true ? colors.white : colors.dark }
         onChangeText={e=>setRiderNIC(e)}
         value={riderNIC}></TextInput>}
         </View>

      <View style={styles.inputout}>
            <AntDesign name="mail" size={24} color={editable===true ? colors.white : colors.dark } />
            {editable==false?      <Text style={styles.input}>{shouldUpdate==false? user.riderEmail:riderEmail2}</Text>:  
         <TextInput style={styles.input}  placeholder={shouldUpdate==false? user.riderEmail:riderEmail2} placeholderTextColor={editable===true ? colors.white : colors.dark }
         onChangeText={e=>setriderEmail(e)}
         value={riderEmail}></TextInput>}
        </View>
    
        <View style={styles.inputout}>
            <AntDesign name="lock" size={24} color={editable===true ? colors.white : colors.dark } />
         {editable==false?  <Text style={styles.input}>*********</Text>:
             <TextInput style={styles.input}  placeholder='Type new Password' placeholderTextColor={editable===true ? colors.white : colors.dark } 
           onChangeText={e=>setriderPassword(e)}
           value={riderPassword}></TextInput>}
        </View>
        <View style={styles.inputout}>
            <AntDesign name="phone" size={24} color={editable===true ? colors.white : colors.dark } />
          {editable==false?   <Text style={styles.input}>{shouldUpdate==false? user.riderNumber:riderNumber2}</Text>:
          <TextInput style={styles.input} placeholder={shouldUpdate==false?user.riderNumber:riderNumber2} placeholderTextColor={editable===true ? colors.white : colors.dark } 
          value={riderNumber} onChangeText={e=>setriderNumber(e)}></TextInput>}
        </View>

        <View style={styles.inputout}>
            <FontAwesome name="car" size={24} color={editable===true ? colors.white : colors.dark } />
          {editable==false?   <Text style={styles.input}>{shouldUpdate==false? user.riderVehicleName:riderVehicleName2}</Text>:
          <TextInput style={styles.input} placeholder={shouldUpdate==false?user.riderVehicleName:riderVehicleName2} placeholderTextColor={editable===true ? colors.white : colors.dark } 
          value={riderVehicleName} onChangeText={e=>setRiderVehicleName(e)}></TextInput>}
        </View>

        <View style={styles.inputout}>
            <Octicons name="number" size={24} color={editable===true ? colors.white : colors.dark } />
          {editable==false?   <Text style={styles.input}>{shouldUpdate==false? user.riderVehicleNo:riderVehicleNo2}</Text>:
          <TextInput style={styles.input} placeholder={shouldUpdate==false?user.riderVehicleNo:riderVehicleNo2} placeholderTextColor={editable===true ? colors.white : colors.dark } 
          value={riderVehicleNo} onChangeText={e=>setriderVehicleNo(e)}></TextInput>}
        </View>
   
        {editable==false?
        <TouchableOpacity onPress={()=>{setEditable(!editable)}}  style={styles.btn}><Text style={styles.btnText}>Edit Profile</Text></TouchableOpacity>
         :<TouchableOpacity onPress={update}  style={styles.btn}><Text style={styles.btnText}>Update</Text></TouchableOpacity> }
    </View>
  )

}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        width:'100%'
      },
      view1:{
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:colors.primary,
        width:'100%',
        height:180
      },
      image:{
        resizeMode:'contain',
        width:'20%',
        height:'50%',
        
      },
      name:{
        fontSize:24,
        marginTop:10,
        fontWeight:600,
        color:colors.white
      },    
        inputout:{
        flexDirection:'row',
        width:'90%',
        marginVertical:10,
        borderRadius:10,
        paddingVertical:10,
        paddingHorizontal:10,
        elevation:20,
        backgroundColor:colors.secondary,
       },
       input:{
        fontSize:22,
        marginLeft:10,
        width:'80%',
        color:'black',
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
