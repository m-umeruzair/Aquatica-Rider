import React from 'react'
import {StyleSheet, Text, View,Image, TouchableOpacity} from 'react-native'
import logo from '../../../assets/logo.png'

import {colors,hr80} from '../../globals/style'

export const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        
        <Text style={styles.title}>Welcome to Aquatica</Text>
        <View style={styles.logoout}>
        <Image style={styles.logo} source={logo}></Image>
        </View>
        <View style={hr80}></View>
        <Text style={styles.text}>Rider Application</Text>
        <View style={hr80}></View>

        <View style={styles.btnout}>
        <TouchableOpacity onPress={()=>navigation.navigate('signup')}>
            <Text style={styles.btn} >Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('signin')}>
            <Text style={styles.btn}>Log in</Text>
        </TouchableOpacity>
    </View>
    {/* </ImageBackground> */}
    </View>
  )
}

const styles = StyleSheet.create({
   container:{
    flex:1,
    backgroundColor:colors.white,
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center'
   },
   bg:{
    height:'100%',
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
   },

   title:{
    fontSize: 50,
    color:'#22e4ac',
    textAlign:'center',
    marginVertical:10,
    fontWeight:'300',  
   },
   logoout:{
    width:'80%',
    height:'30%',
    alignItems:'center'
   },
   logo:{
    width:'70%',
    height:'100%'
   },
   text:{
    width:'80%',
    color:colors.primary,
    fontSize:30,
    fontWeight:'800',
    textAlign:'center'
   },
   btnout:{
    flexDirection:'row'
   },
   btn:{
    color:colors.white,
    fontSize:20,
    textAlign:'center',
    marginVertical:30,
    marginHorizontal:10,
    fontWeight:'700',
    backgroundColor:colors.primary,
    borderRadius:10,
    padding:10,
    paddingHorizontal:20
   }
})
 export default WelcomeScreen