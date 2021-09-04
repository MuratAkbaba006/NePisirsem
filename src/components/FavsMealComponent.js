import React, { Component,useState,useEffect } from 'react'
import { View,Text,StyleSheet,Image,Dimensions } from 'react-native'
import { FontAwesome5,Entypo,MaterialIcons  } from '@expo/vector-icons'; 
import AxiosBase from '../config/config'
const {width,height}=Dimensions.get('window');

const FavsMealComponent = ({item,token}) => {
        const [fav_count,setFav_Count]=useState(0);
        useEffect(() => {
            AxiosBase.get(`/api/favs/getfavs/${item._id}`,{
                headers:{
                    "x-access-token":token
                }
            }).then((res)=>{
                setFav_Count(res.data.length)
            })
           
        }, [])


        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.image_container}>
                        <Image source={{uri:item.image}} style={styles.image}/>
                        <MaterialIcons name="favorite" size={24} color="black" style={styles.fav_icon}/>
                        <Text style={{position:'absolute',marginTop:10,marginLeft:110}}>{fav_count}</Text>
                    </View>
                    <View style={styles.name_area}>
                        <FontAwesome5 name="cookie" size={24} color="black" />
                        <Text style={styles.text}>{item.name}</Text>
                    </View>
                    <View style={styles.cuisine_area}>
                        <Entypo name="flag" size={24} color="black" />
                        <Text style={styles.text}>{item.cuisine}</Text>
                    </View>
                </View>
            </View>
        )
    
}

const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        backgroundColor:'white'

    },
    card:{
        width:width*0.5,
        height:height*0.4,
        borderRadius:20,
        marginLeft:width*0.07,
        justifyContent:'flex-start',
        alignItems:'center',
        borderColor:'#21D19F',
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        
        elevation: 3,
    },
    image_container:{
        flexDirection:'row'
    },
    image:{
        marginTop:10,
        width:100,
        height:100,
        borderRadius:10,
        borderColor:'#CCE2A3',
        borderWidth:1,
        
      
    },
    text:{
        marginLeft:5,
        fontSize:16,
        fontWeight:'500'
    },
    name_area:{
        flexDirection:'row',
        marginVertical:15,
        justifyContent:'center',
        alignItems:'center',
        width:width*0.43,
        borderColor:'black',
        padding:5,
        shadowColor: "#000",
        shadowOffset: {
	    width: 0,
	    height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,

    },
    cuisine_area:{
        flexDirection:'row',
        margin:5,
        justifyContent:'center',
        alignItems:'center',
        width:width*0.43,
        borderColor:'black',
        padding:5,
        shadowColor: "#000",
        shadowOffset: {
	    width: 0,
	    height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,

    },
    fav_icon:{
        position:'absolute',
        marginLeft:110,
        marginTop:25
    }
 
})

export default FavsMealComponent
