import React from 'react'
import { View, Text, StyleSheet,StatusBar,TextInput } from 'react-native'
import { Fontisto,MaterialCommunityIcons,FontAwesome,AntDesign,Entypo } from '@expo/vector-icons';
import { colors } from '../globals/style';




const HomeHeadNav=({navigation,user}) =>{
  
  return (
    <View style={styles.container}>
      <Entypo name="log-out" size={28} color={colors.primary} onPress={()=>{navigation.navigate('signin',{user:user})}}/>
      <View style={styles.containerin}>
        <Text style={{fontSize:28,color:colors.secondary}}>Aquatica</Text>
        
        {/* <MaterialCommunityIcons name="cup-water" size={24} color={colors.primary}  /> */}
      </View>
      <View style={{flexDirection:'row',gap:5}}>
      
      <FontAwesome onPress={()=>navigation.navigate('profile',{user:user})} name="user-circle-o" size={24} color={colors.primary}  /> 
      </View>
    </View>  
  )
}

const styles= StyleSheet.create({
    container:{
      flexDirection:'row',
      width:'100%',
      justifyContent:'space-between',
      padding:10,
      alignItems:'center',
      backgroundColor:colors.white,
      elevation:20,
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20
    },
    containerin:{
        flexDirection:'row',
        alignItems:'center'
    },

   
})

export default HomeHeadNav