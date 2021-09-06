import React, { Component } from 'react'
import { Alert,View,Text,Image,TouchableOpacity,StyleSheet,Dimensions, TextInput, TouchableOpacityComponent } from 'react-native'
import { Fontisto,Entypo ,MaterialCommunityIcons ,AntDesign,MaterialIcons,Ionicons,Octicons } from '@expo/vector-icons'; 
const {width,height}=Dimensions.get('window')
import NavigationService from '../config/NavigationService.js'
import { inject } from 'mobx-react';
import * as Yup from 'yup'
import {Formik} from 'formik'
import {Picker} from '@react-native-picker/picker';
import AxiosBase from '../config/config'
import {Root,Popup} from 'popup-ui'
import Select2 from 'react-native-select-two'
import Modal from 'react-native-modal'


@inject('AuthenticateStore')
class Menu extends Component {
    constructor(props){
        super(props);
        this.state={
            isModalVisible:false,
            isModalVisibletwo:false,
            token:'',
            showSelect:false,
            showMenu:'flex',
            ingredientlist:[],
            searchingredientlist:[]
            
        }
    }

    componentDidMount(){
        const token=this.props.AuthenticateStore.token;
        this.setState({token:token})
        AxiosBase.get('/api/ingredients/getlist',{headers:{"z-access-token":this.state.token}}).then((res)=>{
            const ingredientlist=[];
            res.data.map((i)=>{
                ingredientlist.push({id:i.name,name:i.name})
            })
            this.setState({ingredientlist:ingredientlist})

        }).catch((err)=>{
            console.log(err);
        })

    }
  

    _handleSubmit=(values)=>{
        AxiosBase.get(`/api/meal/cuisine/${values.cuisine}`,{
            headers:{
                "x-access-token":this.state.token
            }
        }).then((res)=>{
            if(res.data.length===0){
                Popup.show({
                    type:'Danger',
                    title:'Warning',
                    button:true,
                    textBody:'Seçmiş olduğunuz mutfağa ait yemek bulunamadı',
                    buttonText:'Kapat',
                    callback:()=>{Popup.hide()}
                })
                this.setState({isModalVisible:false})

            }
            else{
                this.setState({isModalVisible:false})
                NavigationService.navigate('Slider',{data:res.data,token:this.state.token})
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
   

    _getIngredientsMeal=(data)=>{
       


        AxiosBase.post('/api/meal/ingredient',{
           ingredientlist:data
        },{
            headers:{
                "x-access-token":this.state.token
            }
        }).then((res)=>{
            if(res.data.message)
            {   
                this.setState({showSelect:false})
                setTimeout(() => {
                    Popup.show({
                        type:'Danger',
                        title:'Warning',
                        button:true,
                        textBody:'Malzeme seçmelisiniz',
                        buttonText:'Kapat',
                        callback:()=>{Popup.hide()}
                    })
                }, 500);
               
            }
            else{
                NavigationService.navigate('Slider',{data:res.data})
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    render() {
      
        if(this.state.showSelect){ 
             return(    
            <Root>   
            <View style={{flex:1,marginTop:height*0.1,alignItems:'center'}}>
            <Select2 
            colorTheme={'#2C5530'}
            style={{width:width*0.8,borderRadius:20}}
            //tema rengini burdan ayarlayabiliriz.
            popupTitle={'Malzemeleri Seçiniz'}
            title={'Malzemeleri Seçiniz'}
            onSelect={data=>this.setState({searchingredientlist:data})}
            //seçilen itemi yazar ,çoklu seçim açıksa array döner
            data={this.state.ingredientlist}
            //isSelectSingle
            //isSelectSingle sadece tek seçim yapabilmeyi sağlar
             onRemoveItem={data=>this.setState({searchingredientlist:data})}
             //silinen itemleri yakalayabiliriz
             showSearchBox={true}
             //showSearchBox ile arama yapma kısmının açıkmı mı kapalımı olmasını
             //istediğimizi belirtiyoruz.
             cancelButtonText={'İptal'}
             selectButtonText={'Seç'}
             selectedTitleStyle={{color:'#2C5530'}}
             searchPlaceHolderText={'Arama'}
             listEmptyTitle={'Veri Yok'}
             //listEmptyTitle ile herhangi bir veri yoksa ne yazacağını belirledik
             
            />
                <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <TouchableOpacity style={styles.ingredientsbutton} onPress={()=>this.setState({showSelect:false})}>
                        <Ionicons name="ios-arrow-back-outline" size={28} color="#2C5530" />
                        <Text style={{color:'#2C5530',fontWeight:'600',fontSize:16}}>Geri</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ingredientsbutton} onPress={()=>this._getIngredientsMeal(this.state.searchingredientlist)}>
                        <Octicons name="search" size={24} color="#2C5530" />
                        <Text style={{color:'#2C5530',fontWeight:'600',fontSize:16}}>Yemek Bul</Text>
                    </TouchableOpacity>
                </View>  
            </View>
            </Root>     
              
             )
        }
        return (
            <Root>
            <View style={[styles.menu,{display:this.state.showMenu}]}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.isModalVisible}        
                >
                    <View style={styles.centeredView}>
          
                        <View style={styles.modalView}>
                            <Formik
                                initialValues={{
                                    cuisine:'Turkish'
                                }}
                                onSubmit={this._handleSubmit}
                                validationSchema={
                                    Yup.object().shape({
                                        cuisine:Yup.string().required('Cuisine is required')
                                    })
                                }
                            >
                            { ({values,handleSubmit,isValid,isSubmitting,errors,handleChange})=>( 
                                          <>
                                          <TouchableOpacity
                                          style={{justifyContent:'flex-end',alignItems:'flex-end'}}
                                          onPress={() => this.setState({isModalVisible:!this.state.isModalVisible})}
                                      >
                                      <Entypo name="cross" size={24} color="black" />
                                      </TouchableOpacity>  
                                <View style={{justifyContent:'center',marginTop:height*0.07,alignItems:'center'}} >
                                <View style={{borderWidth:2,borderRadius:10}}> 
                                <Picker
                                selectedValue={values.cuisine}
                                onValueChange={handleChange('cuisine')}
                                style={styles.picker}
                                prompt={'Başlık'}
                                
                                >
                                    
                                    <Picker.Item label="Turkish" value="Turkish"></Picker.Item>
                                    <Picker.Item label="French" value="French"></Picker.Item>
                                    <Picker.Item label="German" value="German"></Picker.Item>
                                    <Picker.Item label="Italian" value="Italian"></Picker.Item>
                                    <Picker.Item label="Mexican" value="Mexican"></Picker.Item>
                                    <Picker.Item label="Russian" value="Russian"></Picker.Item>
                                    <Picker.Item label="Japanese" value="Japanese"></Picker.Item>
                                    <Picker.Item label="Chinese" value="Chinese"></Picker.Item>
                                </Picker>
                                </View>    
                                
                               
                                <TouchableOpacity style={styles.button} disabled={!isValid} onPress={handleSubmit}>
                                    <Text>Tamam</Text>
                                </TouchableOpacity>
                                </View>
                            </>
                            )} 
                            
                            </Formik>
                        </View>
                    </View>
                </Modal>
               
                <View style={{justifyContent:'flex-start',flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>this.setState({isModalVisible:true})}>
                    <View style={styles.menu_item}>
                        <View style={styles.menu_content}>
                        <Fontisto name="world-o" size={40} color="#2C5530" />
                            <Text style={styles.menu_text}>
                                Hangi Mutfaktan Pişirsem?
                            </Text>
                        </View>     
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.setState({showSelect:true})}>
                    <View style={styles.menu_item}>
                       <View style={styles.menu_content}>
                       <MaterialCommunityIcons name="spoon-sugar" size={40} color="#2C5530" />
                            <Text style={styles.menu_text}>
                                Hangi Malzemelerle Pişirsem?
                            </Text>
                        </View>    
                    </View>
                </TouchableOpacity>
                </View>
                <View style={{justifyContent:'flex-start',flexDirection:'row'}}>
                <TouchableOpacity>
                    <View style={styles.menu_item}>
                       <View style={styles.menu_content}>
                       <MaterialCommunityIcons name="clover" size={40} color="#2C5530" />
                            <Text style={styles.menu_text}>
                                Ne Çıkarsa Bahtıma
                            </Text>
                       </View>
                        
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.menu_item}>
                        <View style={styles.menu_content}>
                            <AntDesign name="clockcircleo" size={40} color="#2C5530" />
                            <Text style={styles.menu_text}>
                                Pratik Pişirsem?
                            </Text>
                       </View>
                    </View>
                </TouchableOpacity>
                </View>
                <View style={{justifyContent:'flex-start',flexDirection:'row'}}>
                <TouchableOpacity>
                    <View style={styles.menu_item}>
                        <View style={styles.menu_content}>
                        <MaterialIcons name="favorite-outline" size={40} color="#2C5530" />
                            <Text style={styles.menu_text}>
                                En Beğenilenler
                            </Text>
                       </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.menu_item}>
                       
                    <View style={styles.menu_content}>
                    <Entypo name="new" size={40} color="#2C5530" />
                            <Text style={styles.menu_text}>
                                Yeni Eklenenler
                            </Text>
                       </View>
                    </View>
                </TouchableOpacity>
                </View>
            </View>
            </Root>
        )
    }
}

const styles=StyleSheet.create({
    menu:{
        justifyContent:'space-evenly',
        alignItems:'center',
        marginTop:height*0.12,
       
    },
    
    menu_item:{
        backgroundColor:'#D4F2DB',
        flexDirection:'column-reverse',
        width:width*0.38,
        height:height*0.19,
        margin:5,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        
    },
    menu_content:{
        justifyContent:'center',
        alignItems:'center'
    },
    menu_text:{
        textAlign:'center',
        marginTop:10,
        marginHorizontal:5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        width:width*0.55,
        height:height*0.4,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
     
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      picker:{
          width:width*0.40,
          color:'black',
          borderWidth:5,
          borderColor:'black',
      },
      button:{
          backgroundColor:'#D4F2DB',
          width:width*0.39,
          height:25,
          marginTop:height*0.1,
          borderRadius:20,
          justifyContent:'center',
          alignItems:'center'

      },
      ingredientsbutton:{
        backgroundColor:'#D4F2DB',
        width:width*0.40,
        marginLeft:10,
        height:height*0.1,
        marginTop:height*0.1,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20
      }
})

export default Menu
