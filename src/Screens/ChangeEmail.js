import React, { Component } from 'react'
import {View,Text,TextInput,StyleSheet,Dimensions,TouchableOpacity,Image} from 'react-native'
import * as Yup from 'yup'
import {Formik} from 'formik'
import AxiosBase from '../config/config'

const {width,height}=Dimensions.get('window');

export class ChangeEmail extends Component {
    constructor(props){
        super(props)
    }


    _handleSubmit = (values,{resetForm})=>{
        AxiosBase.put(`/api/users/mail_update/${this.props.navigation.state.params.userId}`,{
            email:values.email.toLowerCase().trim('')
        },
        {
            headers:{
                "x-access-token":this.props.navigation.state.params.token
        }}).then((res)=>{
            if(res.data.message==='Email Adresi Başarıyla Güncellendi')
            {
                 resetForm();
                 alert(`Email Adresiniz başarıyla değiştirildi yeni mailiniz:${values.email.toLowerCase().trim('')}`)

            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Email Adresini Değiştir</Text>
                <Image source={require('../../assets/Nepisirsem.jpg')} style={styles.image}></Image>
                <Formik
                    initialValues={{
                        email:''
                    }}
                    onSubmit={this._handleSubmit}
                    validationSchema={
                        Yup.object().shape({
                            email:Yup.string().required('Email bilgisi gerekli')
                        })
                    }
                >

                {
                    ({values,handleSubmit,isValid,isSubmitting,errors,handleChange})=>(

                <View>
                    <TextInput 
                        style={styles.input}  
                        placeholder={"New Email"} 
                        placeholderTextColor={'#302D4C'}
                        value={values.email}
                        onChangeText={handleChange('email')}                      
                    />                        
                    {(errors.oldpassword) && <Text style={styles.error}>{errors.oldpassword}</Text>}
                    <TouchableOpacity 
                    
                        style={styles.button}
                        disabled={!isValid || isSubmitting}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.button_text}>Email Değiştir</Text>
                    </TouchableOpacity>
                    </View>
                    )
                    }    
                    </Formik>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        flex:1
    },
    title:{
        fontSize:26,
        fontWeight:'700',
        marginBottom:height*0.05
    },
    image:{
        width:120,
        height:120,
        marginBottom:height*0.05

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
    }

})

export default ChangeEmail
