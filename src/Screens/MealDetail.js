import React, { Component,useState,useEffect } from 'react'
import {View,Text,StyleSheet,Dimensions,TouchableOpacity,ImageBackground} from 'react-native'
import { Video, AVPlaybackStatus } from 'expo-av';
import { AntDesign,Ionicons,Feather,FontAwesome} from '@expo/vector-icons'; 
import { FlatList } from 'react-native-gesture-handler';

const {width,height} = Dimensions.get('window')

export default function MealDetail(props){
    const video = React.useRef(null);
    const [item,setItem]=useState({});
    const [status, setStatus] = useState({});
    const [showPlaybutton,setShowPlaybutton]=useState(true)


    useEffect(() => {
        
    setItem(props.navigation.state.params.item)




    }, [])

    
    
    return (
        <View style={styles.container}>
            <View style={styles.video_screen}>
            <Video
                ref={video}
                style={{width:'100%',height:'100%',backgroundColor:'red'}}
                source={{
                    uri:item.video,
                }}
                useNativeControls
                resizeMode="cover"
                isLooping
                
                onPlaybackStatusUpdate={status => setStatus(() => status)}
                isMuted={false}
                //videonun sesi açıkmı kapalımı
                volume={0.9}
                //0.0 ile 1 arasında ses seviyesi
  
            />
            <TouchableOpacity onPress={() =>{
                status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                setTimeout(() => {
                    setShowPlaybutton(false)
                }, 1000);
            }} 
                style={{position:'absolute',top:height*0.10,right:width*0.46}}
            >
                <View style={{display:showPlaybutton?'flex':'none'}}>
                <AntDesign name={status.isPlaying ? 'playcircleo' : 'pausecircleo'} size={40} color="black"   />
                </View>
            </TouchableOpacity>
            </View>
            <View style={{backgroundColor:'#CEE5D0',flex:1,width:width,justifyContent:'center',borderRadius:20,alignItems:'center'}}>
                <View style={{backgroundColor:'#F3F0D7',width:width*0.88,height:height*0.6,borderRadius:20}}>
                    <ImageBackground resizeMode={'contain'} style={{flex:1}} source={{uri:'https://cdn.pixabay.com/photo/2013/07/13/11/55/notes-158958_1280.png'}} >    
                    <Text style={{marginTop:height*0.15,marginLeft:width*0.3,fontSize:16,fontWeight:'700'}}>{item.name}</Text>
                    <View style={{marginTop:height*0.01,marginLeft:width*0.1,flexDirection:'row',alignItems:'center'}}>
                        <Ionicons  name="md-time-outline" size={20} color="black" />
                        <Text style={{marginLeft:5}}>{item.time} Dk</Text>
                    </View>
                    <View style={{marginTop:height*0.01,marginLeft:width*0.1,flexDirection:'row',alignItems:'center'}}>
                        <Feather name="flag" size={20} color="black" />
                        <Text style={{marginLeft:5}}>{item.cuisine}</Text>
                    </View>
                    <View >
                        <FontAwesome name="sticky-note-o" size={50} color="black" />
                    </View>

                    </ImageBackground>
                </View>
            </View>            
        </View>  
       
    )
    
}


const styles=StyleSheet.create({
    container:{
        justifyContent:'flex-start',
        alignItems:'flex-start',
        paddingTop:0,
        flex:1      
    },
    video_screen:{
        backgroundColor:'blue',
        height:height*0.28,
        width:'100%',
    },
    title:{
        fontSize:20,
        fontWeight:'700'
    }
})