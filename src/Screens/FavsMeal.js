import React, { Component } from 'react'
import {View,Text,FlatList,StyleSheet,Dimensions} from 'react-native'
import FavsMealComponent from '../components/FavsMealComponent'
import AxiosBase from '../config/config';
import {BarIndicator} from 'react-native-indicators'
import Loading from '../components/Loading'

const {width,height}=Dimensions.get('window');

export default class FavsMeal extends Component {
    constructor(props){
        super(props);
        this.state={
            token:'',
            userId:'',
            favs:[],
            meal:{},
            
        }
    }

    componentDidMount(){
        const token=this.props.navigation.state.params.token;
        const userId=this.props.navigation.state.params.userId;
        this.setState({token:token});
        this.setState({userId:userId});

        AxiosBase.get(`/api/favs/getfavsforuser/${userId}`,{headers:{
            "x-access-token":token
        }}).then((res)=>{

            this.setState({favs:res.data})
           
        })


    }

    renderItem =  ({item,index}) => {
       console.log(item.favs[0])
        return <FavsMealComponent item={item.favs[0]} token={this.state.token}/>
      
        
        
    }

    render() {

        if(this.state.favs.length===0)
        {   
            return <Loading/>
        }
        else{
        return (
            <View style={{flex:1,justifyContent:'center',backgroundColor:'white'}}>
                
                <Text style={styles.title}>Beğendiğim Yemekler</Text>
                <FlatList
                    
                    data={this.state.favs}
                    renderItem={this.renderItem}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                </FlatList>
            </View>
        )
        }
    }
}


const styles=StyleSheet.create({
    title:{
        justifyContent:'center',
        textAlign:'center',
        fontSize:26,
        fontWeight:'700',
        marginTop:height*0.1
    }
})