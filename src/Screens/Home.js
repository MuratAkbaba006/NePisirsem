import { inject } from 'mobx-react'
import React, { Component } from 'react'
import {View,TouchableOpacity,Image,Text,StyleSheet} from 'react-native'
import { MaterialIcons,FontAwesome5 ,AntDesign } from '@expo/vector-icons';
import Menu from '../components/Menu'
import NavigationService from '../config/NavigationService';

@inject('AuthenticateStore')
class Home extends Component {
    constructor(props){
        super(props);
       
    }

    componentDidMount=()=>{
        this.props.navigation.setParams({logout:()=>this.props.AuthenticateStore.removeToken()})
    }

 
    static navigationOptions = ({navigation})=>{
        return {
               
                headerTitle:()=>
                <View style={{flexDirection:'row'}}>
                    <Image style={{width:40,height:40,flexDirection:'row'}} source={require('../../assets/Nepisirsem.jpg')}/>
                    <Text style={styles.title}>NePisirsem</Text>
                </View>
                ,
                headerTitleAlign:'center',
                headerStyle:{
                    backgroundColor:'white',
                    
                },
                
                headerTintColor: '#fff',
                headerRight:()=> 
                <TouchableOpacity onPress={navigation.getParam("logout")}
                   style={{marginRight:15,padding:5}}>
                  <MaterialIcons name="logout" size={24} color="black" />
                </TouchableOpacity>,
                 headerLeft:()=><TouchableOpacity onPress={()=>NavigationService.navigate('Profile')}
                 style={{marginLeft:15,padding:5}}>
                    <FontAwesome5 name="user" size={20} color="black" />
                </TouchableOpacity>,
    
            
        }
    }

    render() {
        return (
            <View style={{flex:1,justifyContent:'center'}}>
               <Menu style={{flex:1}}></Menu>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    title:{
        color:'#739E82', 
        justifyContent:'center', 
        alignItems:'center',  
        fontSize:30,
        fontWeight:'700',
        flexDirection:'row',
        
    }
})

export default Home
