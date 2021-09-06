import { inject, observer } from 'mobx-react'
import React,{useState,useEffect} from 'react'
import {View,Text,Animated,FlatList,StyleSheet,
  Image,TouchableOpacity,Dimensions} from 'react-native'
import AxiosBase from '../config/config'
import jwt_decode from 'jwt-decode'
import { LinearGradient } from 'expo-linear-gradient';
import NavigationService from '../config/NavigationService'
import {BarIndicator} from 'react-native-indicators'
import Loading from '../components/Loading'
import { MaterialIcons,Ionicons  } from '@expo/vector-icons'; 


const {width,height}=Dimensions.get('window');
const SPACING=10;
const ITEM_SIZE=width * 0.72;
const SPACER_ITEM_SIZE=(width-ITEM_SIZE) / 2;
const BACKDROP_HEIGHT=height*0.6;



const BackDrop = ({meal, scrollX}) => {
    return <View style={{ height: BACKDROP_HEIGHT, width, position: 'absolute',flex:1 }}>
          <FlatList
            data={meal.reverse()}
            removeClippedSubviews={false}
            contentContainerStyle={{width, height: BACKDROP_HEIGHT}}
            renderItem={({ item, index }) => {
               
              if (!item.image) {
                return null;
              }
              const translateX = scrollX.interpolate({
                inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
                outputRange: [0, width],
              });
              return (
                <Animated.View
                  removeClippedSubviews={false}
                  style={{position: 'absolute', width: translateX, height, overflow: 'hidden'}}
                >
                <Image
                  source={{ uri: item.image }}
                  style={{width,height: BACKDROP_HEIGHT,position: 'absolute'}}
                />
                </Animated.View>
              );
            }}
          />
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'white']}
            style={{height: BACKDROP_HEIGHT,width,position: 'absolute',bottom: 0,}}
          />
        </View>
  }
  //buradaki item.backdrop apiden geldi


const Slider = inject("AuthenticateStore")(observer((props)=>{

    const [meal,setMeal]=useState([]);
    const [mealandfavs,setMealandfavs]=useState([]);
    const [favs,setFavs] = useState([]);
    const [token,setToken]=useState('');
    const [userId,setUserId]=useState('');
    const scrollX=React.useRef(new Animated.Value(0)).current;
 
    useEffect(()=>{
        const token=props.AuthenticateStore.token;
        setToken(token);
        const userId=jwt_decode(token).userId;
        setUserId(userId);
        const array=[];

        AxiosBase.get(`/api/favs/getfavsforuser/${userId}`,{
          headers:{
            "x-access-token":token
          }
        }).then((res)=>{
          setMealandfavs([...res.data])
          res.data.map((e)=>{
            array.push(e._id.mealId)
          })
          setFavs([...array]);
          
        }).catch((err)=>{
          console.log(err);
        })
        setMeal([{key:'left-spacer'},...props.navigation.state.params.data,{key:'right-spacer'}])
        
      },[])
     
      const FavAdd = (mealId) =>{
        AxiosBase.post("/api/favs",{
          userId:userId,
          mealId:mealId
        },{ headers:{
          "x-access-token":token
        } }).catch((err)=>{
          console.log(err);
        })
       
      }

      const FavDelete = (item) => {
        mealandfavs.map((e)=>{
          if(e._id.mealId==item._id)
          {
            AxiosBase.delete(`/api/favs/${e._id._id}`,{headers:{"x-access-token":token}}).then((res)=>{console.log("silme işlemi başarılı")})
          }
        })
       
      }


      if(meal.length===0){
          return <Loading/>
      }

    return (
        <View style={style.container}>
            <BackDrop meal={meal} scrollX={scrollX} />
            <Animated.FlatList
              showsHorizontalScrollIndicator={false}
              data={meal}
              horizontal
              contentContainerStyle={{alignItems:'center'}}
              snapToInterval={ITEM_SIZE}
              decelerationRate={0}
              bounces={false}
              onScroll={Animated.event(
                [{nativeEvent:{contentOffset:{x:scrollX}}}],
                {useNativeDriver:false}
              )}
              scrollEventThrottle={16}
              renderItem={({item,index})=>{
                  console.log(item);
                if(!item.image){
                    return <View style={{width:SPACER_ITEM_SIZE}}></View>
                }
                  const inputRange=[(index-2)*ITEM_SIZE,(index-1)*ITEM_SIZE,index * ITEM_SIZE,];
                  const translateY=scrollX.interpolate({
                    inputRange,
                    outputRange:[100,50,100]
                  })
        
                  //ortada bulunan itemin yukarı doğru çıkmasını sağladık
                  return(
                      <TouchableOpacity onPress={()=>{
                        NavigationService.navigate('MealDetail',{item:item})
                      }}>
                           <View style={{width:ITEM_SIZE}}>
                                <Animated.View
                                    style={{
                                    marginHorizontal:SPACING,
                                    padding:SPACING*2,
                                    alignItems:'center',
                                    backgroundColor:'white',
                                    borderRadius:34,
                                    transform:[{translateY}]
                                    }}>
                                    <Image 
                                    source={{uri:item.image}}
                                    style={style.poster_image}/>
                                    <TouchableOpacity onPress={()=>favs.includes(item._id)?FavDelete(item):FavAdd(item._id)} style={style.favicon}>
                                        <MaterialIcons name={favs.includes(item._id)?'favorite':'favorite-border'} size={30} color="white" />
                                    </TouchableOpacity>
                                    
                                    <Text style={{fontSize:20}} numberOfLines={1}>
                                    {item.name}
                                    </Text>
                                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                      <Ionicons name="ios-timer" size={24} color="black" />
                                      <Text>{item.time}dk</Text>
                                    </View>
                                </Animated.View>
                                </View>
                      </TouchableOpacity>
                  )}}>
            </Animated.FlatList>
        </View>
    )
})) 


const style = StyleSheet.create({
    loading_container:{
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    container:{
      flex:1
    },
    paragraph:{
      margin:24,
      fontSize:18,
      fontWeight:'bold',
      textAlign:'center'
    },
    poster_image:{
      width:'100%',
      height:ITEM_SIZE*1.2,
      resizeMode:'cover',
      borderRadius:24,
      margin:0,
      marginBottom:10
    },
    favicon:{
      position:'absolute',
      top:height*0.04,
      right:width*0.1
    }
  });

export default Slider