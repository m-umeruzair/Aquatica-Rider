import { StyleSheet, Text, Touchable, TouchableOpacity, View,Linking } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../globals/style'
import * as Location from 'expo-location';
import ip from '../globals/ip';
import axios from 'axios';

const OrderCard = (props) => {
    const [latitude, setlatitude]= useState(null)
    const [longitude, setlongitude]= useState(null)
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
      
     async function updateOrder(){
      await  axios({
        method:"POST",
        url:`http://${ip.ip.main}:5005/completeOrder`,
        data:{
          id:props.id,
          x:2
        }
       }).then(props.navigation.navigate('order',{...props}))
     }

  return (
    <View >
      <Text style={styles.text}>Order Amount: {props.amount}</Text>
      <Text style={styles.text}>Customer Name: {props.name}</Text>
      <Text style={styles.text}>Customer Number: {props.number}</Text>
      <Text style={styles.text}>Order Items: {props.items}</Text>
      <Text 
      onPress={()=>{ Linking.openURL(
        `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${props.latitude}%2C${props.longitude}&origin=${latitude}%2C${longitude}`,
      );}} 
      style={styles.text}>Order Location: Click to get Order Location</Text>
      <TouchableOpacity onPress={updateOrder} style={styles.btn}>
       <Text style={styles.btnText}>Accept Order</Text>
      </TouchableOpacity>
      <View style={styles.divider}/>
      
    </View>
  )
}

export default OrderCard

const styles = StyleSheet.create({
    text:{
        marginTop:20,
        fontSize:20,
        color:'white'
    },
    btn:{
        marginVertical:10,
       
        backgroundColor:colors.primary,
        borderRadius:10,
        
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