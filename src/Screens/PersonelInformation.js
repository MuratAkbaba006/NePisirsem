import React, { Component } from 'react'
import { View,Text,StyleSheet,TextInput,Dimensions } from 'react-native'
import Loading from '../components/Loading'

const {width,height} = Dimensions.get('window')


export class PersonelInformation extends Component {
    constructor(props){
        super(props);
        this.state={
            user_name:'',
            user_email:''
        }
    }
    componentDidMount(){
        this.setState({user_name:this.props.navigation.state.params.user.name})
        this.setState({user_email:this.props.navigation.state.params.user.email})
    }
    render() {
        

        return (
            <View style={styles.container}>
                <Text>
                    Sayın Kullanıcımız üyelik bilgileriniz aşağıdaki şekildedir
                </Text>
                <View style={styles.information_area}>
                 <Text>Adınız</Text>   
                <TextInput 
                        style={styles.input}  
                        editable={false}
                        
                        value={this.state.user_name}
                                             
                    />
                    <Text>Mail Adresiniz</Text>    
                    <TextInput 
                        style={styles.input}  
                        editable={false}
                        value={this.state.user_email}
                                             
                    /> 
                </View>
                 
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    input:{
        backgroundColor:'#D4F2DB',
        padding:15,
        width:width*0.8,
        height:height*0.1,
        borderRadius:10,
        paddingHorizontal:25,
        marginTop:10,
        color:'#2C5530'
    },
    information_area:{
        marginTop:height*0.1
    }
})

export default PersonelInformation
