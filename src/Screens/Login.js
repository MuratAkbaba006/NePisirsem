import React, { Component } from 'react'
import {View,StyleSheet,Text,Image,TextInput,ScrollView,TouchableOpacity, SafeAreaView} from 'react-native'
import {Formik} from 'formik'
import * as Yup from 'yup'
import { Entypo } from '@expo/vector-icons';
import AxiosBase from '../config/config'
import { inject } from 'mobx-react';

@inject('AuthenticateStore')
class Login extends Component {
    constructor(){
        super();
        this.state={
            hidePassword:false
        }
    }

    _handleSubmit=(values)=>{
        AxiosBase.post('/login',{
            email:values.email.trim(''),
            password:values.password
        }).then((res)=>{
            console.log(res);
            if(res.data.status)
            {
                this.props.AuthenticateStore.saveToken(res.data.token)
            }
            else{
                alert(res.data.status);
            }
        }).catch((err)=>{
            alert(err);
        })
    }
    
    render() {
        return (
            <SafeAreaView style={{flex:1,backgroundColor:'white',paddingVertical:30,alignItems:'center'}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{alignItems:'center'}} >
                        <Text style={style.hero}>NePişirsem App</Text>
                            <View style={{marginTop:8}}>
                                <Image style={{width:120,height:120}} source={require("../../assets/Nepisirsem.jpg")}/>
                            </View>
                        <Text style={style.hero_description}>Sign in to continue</Text>
                    </View>
                    <Formik 
                        initialValues={{
                            email:'',
                            password:''
                        }} 
                        onSubmit={this._handleSubmit}
                        validationSchema={
                            Yup.object().shape({
                                email:Yup.string().required('Email is required'),
                                password:Yup.string().required('Password is required')
                            })
                        }>

                        {
                            ({values,handleSubmit,isValid,isSubmitting,errors,handleChange})=>(
                    <View style={style.form}>
                        <TextInput 
                            style={style.input} 
                            placeholder={"Email"}
                            placeholderTextColor={'#302D4C'}
                            value={values.username}
                            onChangeText={handleChange('email')}     
                        />

                        {(errors.email) && <Text style={style.error}>{errors.email}</Text>}                 
                        <View>
                        <TextInput 
                            style={style.input} 
                            placeholder={"Password"} 
                            placeholderTextColor={'#302D4C'}
                            value={values.password}
                            secureTextEntry={this.state.hidePassword}
                            onChangeText={handleChange('password')}    
                        />
                        <TouchableOpacity  onPress={()=>this.setState({hidePassword:!this.state.hidePassword})} style={{position:'absolute',right:10,top:20}}>
                                    <Entypo name={this.state.hidePassword?'eye':'eye-with-line'} size={24} color="black" />
                                </TouchableOpacity>
                        {(errors.password && <Text style={style.error}>{errors.password}</Text>)}
                        </View>       
                        <TouchableOpacity style={style.forgot}>
                            <Text>Forgot Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={style.button}
                            disabled={!isValid || isSubmitting}
                            onPress={handleSubmit}    
                        >
                             <Text style={style.button_text}>Sign in My Account</Text>
                        </TouchableOpacity>
                        <View style={style.bottom}>
                            <Text style={{fontSize:17,color:'#302D4C'}}>
                                Don't have an account? </Text>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}>
                                <Text style={{fontSize:18,fontWeight:'bold',color:'#302D4C'}}>
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                            )}
                    </Formik>
                    </ScrollView>        
            </SafeAreaView>
        )
    }
}

const style=StyleSheet.create({
    hero:{color:'#1C1939',fontWeight:'600',fontSize:40},
    hero_description:{color:'rgba(26,25,57,0.8)',fontSize:17,marginTop:8,fontWeight:'500'},
    form:{flex:1,marginTop:10},
    input:{backgroundColor:'#F7F7F7',
            padding:13,
            width:300,
            height:50,
            borderRadius:10,
            paddingHorizontal:25,
            marginBottom:10
            },
    forgot:{flexDirection:'row',justifyContent:'flex-end',marginTop:10,color:'#706E83'},
    button:{backgroundColor:'#010101',
            padding:15,
            marginTop:15,
            borderRadius:10,
            justifyContent:'center',
            alignItems:'center'},
    button_text:{color:'white',fontWeight:'600',fontSize:18,textAlign:'center'},
    bottom:{flexDirection:'row',
alignItems:'center',justifyContent:'center',marginTop:20}, 
error:{color:'red'},

})

export default Login
