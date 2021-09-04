import { inject } from 'mobx-react'
import React, { Component } from 'react'
import { View,Text,StyleSheet,Image,Dimensions,Platform, TouchableOpacity } from 'react-native'
import AxiosBase from '../config/config'
import jwt_decode from 'jwt-decode'
import { Entypo,Ionicons,AntDesign,Feather  } from '@expo/vector-icons'; 
const {width,height}=Dimensions.get('window');
import * as ImagePicker from 'expo-image-picker';
import Contants from 'expo-constants';
import NavigationService from '../config/NavigationService'
import * as FileSystem from 'expo-file-system';
import FormData from 'form-data'
import Loading from '../components/Loading'


@inject('AuthenticateStore')
export class Profile extends Component {
    
    constructor(props){
        super(props);
        this.state={
            user:{},
            token:'',
            userId:'',
            Image:null,
            file:null
        }
        
    }


    static navigationOptions = ({navigation})=>{
        return {
            headerTitle:()=><Text style={styles.title_text}>Profil</Text>
        }
    }

    componentDidMount = async()=>{
        const token=this.props.AuthenticateStore.token;
        this.setState({token:token});
        const userId=jwt_decode(token).userId;
        this.setState({userId:userId});
        AxiosBase.get(`/api/users/${userId}`,{headers:{
            "x-access-token":token
        }}).then((res)=>{
            console.log(this.state.user.name==undefined)

            this.setState({user:res.data[0]._id})
            console.log(this.state.user===null)
        }).catch((err)=>{
            console.log(err);
        })

        if(Platform.OS !== 'web')
        {
            const {status}=await ImagePicker.requestMediaLibraryPermissionsAsync();
            if(status !=='granted'){
                alert('Permission denied')
            }

            
        }
        
    }
    
    PickImage= async () =>{
        var result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        })
        console.log(result.uri)
        
        if(!result.cancelled)
        {
            const formData=new FormData();
            formData.append("profile_image",{
                uri:result.uri,
                type:result.type+`/jpg`,
                name:'image.jpg'
            });

            console.log(this.state.userId);
            AxiosBase.put(`/api/users/pp_update/${this.state.userId}`,{
                profile_image:formData
            },
            {
                headers:{
                    "x-access-token":this.state.token,
                    "Content-Type":"multipart/form-data"
                    
                }
            }
            ).then((res)=>{
                console.log(res);
            }).catch((err)=>{
                console.log(err);
            })
           

         
        }
    }

    render() {
        
      
        if(this.state.user.name === undefined)
        {   
            return <Loading/>
        }
        return (
           
           
            <View style={styles.container}>
                <View style={styles.image_area}>
                    <Image style={styles.image} source={{uri:this.state.user.profile_image,width:'100%',height:'100%'}}></Image>
                </View>
                <TouchableOpacity onPress={this.PickImage}><AntDesign name="plus" size={24} color="black" /></TouchableOpacity>
                <Text>{this.state.user.name}</Text>
                <View style={styles.personel_area}>
                    <TouchableOpacity  onPress={()=>NavigationService.navigate('PersonelInformation',{userId:this.state.userId,token:this.state.token,user:this.state.user})}>
                        <View style={styles.personel_box}>
                            <View style={styles.content}>
                            <AntDesign name="profile" size={40} color="black" />
                            <Text style={styles.personel_area_text}>Kişisel Bilgiler</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>NavigationService.navigate('FavsMeal',{userId:this.state.userId,token:this.state.token})}>
                        <View style={styles.personel_box}>
                            <View style={styles.content}>
                            <Ionicons name="bookmarks" size={40} color="black" />
                            <Text style={styles.personel_area_text}>Beğenilerim</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.personel_area}>    
                    <TouchableOpacity onPress={()=>NavigationService.navigate('ChangePassword',{userId:this.state.userId,token:this.state.token})}>
                        <View style={styles.personel_box}>
                            <View style={styles.content}>
                                <Feather name="key" size={40} color="black" />
                                <Text style={styles.personel_area_text}>Şifre Değiştir</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>NavigationService.navigate('ChangeEmail',{userId:this.state.userId,token:this.state.token})}>
                        <View style={styles.personel_box}>
                            <View style={styles.content}>
                                <AntDesign name="mail" size={40} color="black" />
                                <Text style={styles.personel_area_text}>Mail Değiştir</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            
            
        )
    }
}



const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-evenly',
        marginTop:height*0.1,
        alignItems:'center'
    },
    title_text:{
        fontSize:22,
        fontWeight:'500',
        textAlign:'justify',
        
    },
    image_area:{
        width:width*0.3,
        height:height*0.2,
        borderRadius:1000,
        backgroundColor:'red',
        
    },
    image:{

    },
    personel_area:{
        
        flexDirection:'row',
        justifyContent:'center'
    },
    personel_box:{
        backgroundColor:'#D4F2DB',
        flexDirection:'column-reverse',
        width:width*0.38,
        height:height*0.19,
        margin:5,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    personel_area_text:{
        textAlign:'center',
        marginTop:10,
        marginHorizontal:5
    },
    content:{
        justifyContent:'center',
        alignItems:'center'
    },
   
    
})

export default Profile
