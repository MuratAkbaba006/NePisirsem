import React, { Component } from 'react'
import {View,Text,TextInput,StyleSheet,Dimensions,Image, TouchableOpacity, ScrollView} from 'react-native'
import { Entypo } from '@expo/vector-icons';
import * as Yup from 'yup'
import {Formik} from 'formik'
import AxiosBase from '../config/config'
const {width,height}=Dimensions.get('window');

export class ChangePassword extends Component {

    constructor(props){
        super(props);
        this.state={
            
            hidePassword:false,
        }

    }

    

    _handleSubmit=(values,{resetForm})=>{
        AxiosBase.put(`/api/users/password_update/${this.props.navigation.state.params.userId}`,{
            oldpassword:values.oldpassword,
            password:values.password,
            repassword:values.repassword
        },
        {   headers:{
            "x-access-token":this.props.navigation.state.params.token,
            
            }
        }).then((res)=>{
            resetForm();
            if(res.data.message==='Parola güncelleme işlemi başarılı');
            //buraya status eklenmeli
            {   
                
                alert('Şifre Güncelleme işlemi başarılı');

            }
        }).catch((err)=>{
            res.json(err);
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                   <View style={{justifyContent:'center',alignItems:'center',marginTop:height*0.1}}>
                <Text style={styles.title}>Parola Değiştir</Text>
                <Image source={require('../../assets/Nepisirsem.jpg')} style={styles.image} ></Image>
                <View style={styles.input_area}>
                <Formik
                    initialValues={{
                        oldpassword:'',
                        password:'',
                        repassword:''
                    }}
                    onSubmit={this._handleSubmit}
                    
                    validationSchema={
                        Yup.object().shape({
                            oldpassword:Yup.string().required('Password is required'),
                            password:Yup.string().required('Password is required'),
                            repassword:Yup.string().required('Password is required'),

                        })

                        
                    }>
                        {
                            ({values,handleSubmit,isValid,isSubmitting,errors,handleChange})=>(
                        
                   <View style={styles.form}>
                    <TextInput 
                        style={styles.input}  
                        placeholder={"Old Password"} 
                        placeholderTextColor={'#302D4C'}
                        value={values.oldpassword}    
                        onChangeText={handleChange('oldpassword')} 
                    />
                     <TouchableOpacity  onPress={()=>this.setState({hidePassword:!this.state.hidePassword})} 
                                            style={{position:'absolute',right:20,top:height*0.04}}>
                            <Entypo name={this.state.hidePassword?'eye':'eye-with-line'} size={24} color="black" />
                        </TouchableOpacity>    
                    
                    {(errors.oldpassword) && <Text style={styles.error}>{errors.oldpassword}</Text>}        
                    <TextInput 
                        style={styles.input}  
                        placeholder={"New Password"} 
                        placeholderTextColor={'#302D4C'} 
                        value={values.password}    
                        onChangeText={handleChange('password')}         
                    />
                    <TouchableOpacity  onPress={()=>this.setState({hidePassword:!this.state.hidePassword})} 
                                            style={{position:'absolute',right:20,top:height*0.16}}>
                            <Entypo name={this.state.hidePassword?'eye':'eye-with-line'} size={24} color="black" />
                        </TouchableOpacity> 
                                
                    {(errors.password) && <Text style={styles.error}>{errors.password}</Text>}    
                    <TextInput 
                        style={styles.input}  
                        placeholder={"New Password Again"} 
                        placeholderTextColor={'#302D4C'}
                        value={values.repassword}    
                        onChangeText={handleChange('repassword')} 
                    />
                    
                        <TouchableOpacity  onPress={()=>this.setState({hidePassword:!this.state.hidePassword})} 
                                            style={{position:'absolute',right:20,top:height*0.28}}>
                            <Entypo name={this.state.hidePassword?'eye':'eye-with-line'} size={24} color="black" />
                        </TouchableOpacity>  
                        
                    {(errors.repassword) && <Text style={styles.error}>{errors.repassword}</Text>}    
                    
                <TouchableOpacity 
                    style={styles.button}
                    disabled={!isValid || isSubmitting}
                    onPress={handleSubmit}            
                >
                    
                    <Text style={styles.button_text}>Parola Değiştir</Text>

                    </TouchableOpacity>
                    </View>
                            )}
                </Formik>
                </View>
                </View> 
                </ScrollView>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontWeight:'700',
        fontSize:30,
        
        
    },
    image:{
        width:120,
        height:120,
       
    },
    form:{
        
    },
    input:{
        backgroundColor:'#D4F2DB',
            padding:15,
            width:width*0.8,
            height:height*0.1,
            borderRadius:10,
            paddingHorizontal:25,
            marginTop:10,


    },
    input_area:{
        
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        backgroundColor:'#002A32',
            padding:15,
            marginTop:15,
            borderRadius:10,
            width:width*0.8,
            justifyContent:'center',
            alignItems:'center'
    },
    button_text:{
        color:'white',
        fontSize:20,
        fontWeight:'600'
    },
    error:{

    }
})

export default ChangePassword
