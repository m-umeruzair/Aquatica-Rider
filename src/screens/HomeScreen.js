import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import HomeHeadNav from '../components/HomeHeadNav'

import { AntDesign } from '@expo/vector-icons';
import { colors } from '../globals/style'
import axios from 'axios';
import OrderCard from '../components/orderCard';
import ip from '../globals/ip';
import * as Location from 'expo-location';


const HomeScreen = ({ navigation, route }) => {
  const params = route.params
  const user = params.user

  const [user1, setuser1] = useState(null)
  const [data, setData] = useState(null)
  const [earning, setEarning] = useState(null)
  const [totalorders, setTotalorders]= useState(null)
  
  useEffect(() => {
    const fetchData = async () => {
     
         await axios.get(`http://${ip.ip.main}:5005/readOrder`, {
          params: {
            _cacheBuster: Date.now() // Add a unique cache-busting query parameter
          }
        }).then(res=>setData(res.data)+console.log(res.data[0].orderAmount)).catch(err=>console.log(err)+setData(null));
        

        await axios.get(`http://${ip.ip.main}:5005/findRider`,{
          params:{
             id:user._id
          }
        }).then(res=>{
          
          setEarning(res.data[0].riderEarning)
          setTotalorders(res.data[0].riderTotalOrders)
        })
        
    };
  
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });
  
    return unsubscribe;
  }, [navigation]);
  
  const [Availability, setAvailability] = useState(false)
  
  const fetchData2 = async () => {
     
    await axios.get(`http://${ip.ip.main}:5005/readOrder`, {
     params: {
       _cacheBuster: Date.now() // Add a unique cache-busting query parameter
     }
   }).then(res=>setData(res.data)).catch(err=>console.log(err)+setData(null));
   
};

  function changeAvailability() {
    setAvailability(!Availability)
    fetchData2()
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      <HomeHeadNav user={user} navigation={navigation} />
      <View style={styles.box}>
        <Text style={styles.boxText}>Total Orders Completed: {totalorders}</Text>
        <Text style={styles.boxText}>Total Earning: {earning}</Text>
      </View>
      <View style={styles.box2}>
        <Text style={styles.boxText}>Availability:{Availability == false ? 'No' : 'Yes'}</Text>
        <TouchableOpacity onPress={changeAvailability} style={styles.btn}><Text style={styles.btnText}>Change Availability</Text></TouchableOpacity>
        <TouchableOpacity onPress={fetchData2} style={styles.btn2}><Text style={styles.btnText}>Refresh Orders</Text></TouchableOpacity>
      </View>
      <ScrollView style={styles.sbox}>
        {Availability == false ? <Text style={styles.boxText}>Turn on Availability to see upcoming Orders!</Text> :
          data == null ? <Text style={styles.boxText}>No Orders to show</Text> :
            (
              <View>
                {data.map((order) => (
                  <OrderCard
                    key={order._id}
                    id={order._id}
                    name={order.customerName}
                    amount={order.orderAmount}
                    number={order.customerNumber}
                    items={order.orderItems.map((item) => item.productName).join(', ')}
                    latitude={order.latitude}
                    longitude={order.longitude}
                    navigation={navigation}
                    user={user}
                    companyName={order.orderItems.map((item)=>item.productCompany).join(', ')}
                    companySales={order.orderItems.map((item)=>item.productPrice).join(', ')}
                    productID={order.orderItems.map((item)=>item.productID).join(', ')}
                  />
                ))}
              </View>
            )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        width:'100%'
      },
      searchbox:{
        flexDirection:'row',
        width:'90%',
        backgroundColor:colors.secondary,
        borderRadius:30,
        alignItems:'center',
        padding:10,
        margin:20,
        elevation:10
      },
      searchInput:{
        marginLeft:10,
        width:'90%',
        fontSize:18,
        color:colors.white
      },
      box:{
        width:'90%',
        color:colors.white,
        marginTop:20,
        elevation:10,
        borderRadius:10,
        backgroundColor:colors.secondary,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        gap:10
      },
      sbox:{
        width:'90%',
        color:colors.white,
        marginTop:20,
        elevation:10,
        borderRadius:10,
        backgroundColor:colors.secondary,
        marginBottom:20,
        padding:10,
        gap:10
      },
      boxText:{
        color:colors.white,
        fontSize:23
      },
      sboxText:{
        color:colors.white,
        fontSize:20
      },
      box2:{
        width:'90%',
        color:colors.white,
        marginTop:20,
        elevation:10,
        borderRadius:10,
        backgroundColor:colors.primary,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        gap:10
      },
      btn:{
        marginVertical:30,
        marginHorizontal:10,
        backgroundColor:colors.secondary,
        borderRadius:10,
        elevation:20,
        width:'80%',
        height:45,
        justifyContent:'center',
        alignItems:'center'
       },
       btn2:{
        backgroundColor:colors.secondary,
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
       card:{
        width:'95%',
        height:120,
        
        margin:10,
        padding:5,
        borderRadius:10,
         
        flexDirection:'row'
    },
})

export default HomeScreen