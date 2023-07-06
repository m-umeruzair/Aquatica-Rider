import { StyleSheet, Text, View,TouchableOpacity,Alert,Linking } from 'react-native'
import React, { useState } from 'react'
import HomeHeadNav from '../components/HomeHeadNav'
import { colors } from '../globals/style'
import axios from 'axios'
import ip from '../globals/ip'
import * as Location from 'expo-location';

const Order = ({route,navigation}) => {
  const [latitude, setlatitude]= useState(null)
  const [longitude, setlongitude]= useState(null)
    const params=route.params
  const user=params.user
   console.log(params.user._id)
   
   async function getLocation(){
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
    
    try {
      // Get the user's current location
      const location = await Location.getCurrentPositionAsync({});
   //   setCurrentLocation(location.coords)
    //  console.log(currentLocation)
     
      const { latitude, longitude } = location.coords;
    setlatitude(latitude)
    setlongitude(longitude)
    
    }
      catch(error){
        console.log(error)
      }}

      getLocation();
      


  async function completed(){
  await  axios({
        method:"POST",
        url:`http://${ip.ip.main}:5005/completeOrder`,
        data:{
          id:params.id,
          x:1
        }
       
       }).catch(error=>{console.log(error)})

     await  axios({
        method:"PUT",
        url:`http://${ip.ip.main}:5005/updateCompany`,
        data:{
          companyTotalSales:params.companySales,
          companyName:params.companyName,
          x:1
        }
       })
   
       axios({method:"POST",
      url:`http://${ip.ip.main}:5005/updateRider`,
      data:{
        Id:params.user._id,
        riderEarning:50,
        riderTotalOrders:1
      }
    }).then(res=>{
      if(res.status==200){
        showAlert1()
            navigation.navigate('home',{user:user})
      }
    }).catch(error=>{console.log(error)})
       
  }

  const showAlert1 = () =>{
    Alert.alert(
       'Order Completed'
    )
 }
   
  return (
    <View style={styles.container}> 
        <HomeHeadNav user={user} navigation={navigation}/>
        <View style={styles.view}>
      <Text style={styles.text}>Order Amount: {params.amount}</Text>
      <Text style={styles.text}>Customer Name: {params.name}</Text>
      <Text style={styles.text}>Customer Number: {params.number}</Text>
      <Text style={styles.text}>Order Items: {params.items}</Text>
      <Text 
      onPress={()=>{ Linking.openURL(
        `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${params.latitude}%2C${params.longitude}&origin=${latitude}%2C${longitude}`,
      );}} 
      style={styles.text}>Order Location: Click to get Order Location</Text>
      <TouchableOpacity onPress={completed} style={styles.btn}>
       <Text style={styles.btnText}>Complete Order</Text>
      </TouchableOpacity>
      
      
    </View>
    </View>
  )
}

export default Order

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        width:'100%',
      },
      text:{
        marginTop:20,
        fontSize:20,
        color:'white'
    },
    view:{
    backgroundColor:colors.secondary,
    alignItems:'center',
    marginTop:20,
    justifyContent:'center',
    borderRadius:10,
    padding:5
    },
    btn:{
        marginVertical:10,
        backgroundColor:colors.primary,
        borderRadius:10,
        padding:5,
        width:'100%',
        height:45,
        justifyContent:'center',
        alignItems:'center'
       },
    btnText:{
        fontSize:22,
        color:colors.white,
        fontWeight:'bold',
       },
       divider:{
        backgroundColor:colors.white,
        width:'100%',
        height:1
       }
})