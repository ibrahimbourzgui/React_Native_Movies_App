import react,{useEffect, useState} from 'react';
import { StyleSheet,View,Text,TextInput,TouchableOpacity,StatusBar,Dimensions, FlatList} from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import ItemSeparator from '../components/ItemSeparator';
import { Ionicons,Feather } from "@expo/vector-icons";
import { auth } from '../constants/firebase_config';
import { useNavigation } from '@react-navigation/core';
import { db,db2 } from '../constants/firebase_config';
import { collection, getDocs, query, Query, where } from 'firebase/firestore';
import MovieCard from '../components/MovieCard';

const {height,width}=Dimensions.get("screen");
const setHeight = (h) => (height/100) * h;
const setwidth = (w) => (width/100) * w;



const HomeProfile = () => {
    const navigation=useNavigation();
    let [listdata,setList]=useState([]);
    const handlSingout = () =>{
        auth.signOut()
        .then(() =>{
            navigation.replace('Singin')
        }).catch(error => alert(error.message))
    }

    useEffect(() =>{
        db.collection('Favorite').get().then((querySnapshot) => {
            
            let temp = [];
            console.log('Total users: ', querySnapshot.size);
            querySnapshot.forEach((documentSnapshot) => {
              console.log('user Id: ', documentSnapshot.id);
             
              let userDetails = {};
              
              userDetails = documentSnapshot.data();
              // All the document related data
              userDetails['id'] = documentSnapshot.id;
              temp.push(userDetails);
              setList(temp);
            });
          });

        
    },[])

  

    return(
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={colors.WHITE} translucent/>
            <ItemSeparator height={StatusBar.currentHeight}/>
            <View style={styles.headercontainer}>
                <TouchableOpacity onPress={handlSingout}>
                        <Ionicons name='log-out-outline' size={30} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Voici votre liste </Text>
            </View>
            <FlatList
        data={listdata} 
        //horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <ItemSeparator width={20} />}
        ListHeaderComponent={() => <ItemSeparator width={20}/>}
        ListFooterComponent={() => <ItemSeparator width={20}/>}
        renderItem={({item}) => ( 
        <MovieCard 
            title={item.MovieName}
            poster={item.MoviePoster}
            voteAverage={item.MovieRating}

        />)}
      />
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.WHITE,
    },
    headercontainer:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:10,
        paddingHorizontal:20,
    },
    headerTitle:{
        fontSize:20,
        fontFamily:fonts.EXTRA_BOLD,
        lineHeight: 20 * 1.4,
        width:setwidth(80),
        textAlign:'center',
    },
   
    
})

export default HomeProfile;