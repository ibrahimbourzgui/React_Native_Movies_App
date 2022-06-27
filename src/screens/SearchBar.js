import react,{useState,useEffect} from 'react';
import axios from 'axios';
import { StyleSheet,View,Text,TextInput,TouchableOpacity,StatusBar,Dimensions,FlatList,Button} from 'react-native';
import {Feather } from "@expo/vector-icons";
import COLORS from '../constants/colors';
import fonts from '../constants/fonts';
import { getSearchMovie,getPopularMovies } from '../services/MovieService';
import MovieCard from '../components/MovieCard';
import ItemSeparator from '../components/ItemSeparator';


const SearchBar = ({navigation}) => {

    const [GetSearchMovie,SetSearchMovie]=useState([]);
    const [search,setSearch]=useState();

    function GetMovies(s){
        axios.get(`
        https://api.themoviedb.org/3/search/multi?api_key=951e3639ab5ba5d05cbda770ec2aacbe&language=fr&query=${s}&page=1&include_adult=false`).
        then((data)=>SetSearchMovie(data.data.results)).catch((err)=>console.log(err))
    }
    
    return(
        <View style={styles.Container}>
        <View style={styles.headerContainer}>
            <TouchableOpacity 
            activeOpacity={0.5} 
            onPress={() =>navigation.goBack('home') }>
            <Feather name="chevron-left" size={35} color={COLORS.BLACK}/>
            </TouchableOpacity>
        </View>
        <View style={styles.buttonText}>
        <TextInput 
        style={styles.inputText}
        placeholder='quel est le film,genre,personne,serie que vous voulez chercher?  '
        value={search}
        onChangeText={(text)=>{
            setSearch(text)
        }}
        />
        <Button title='rechercher' onPress={()=>GetMovies(search)}></Button>
        </View>
        
        <FlatList
        data={GetSearchMovie} 
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <ItemSeparator width={20} />}
        ListHeaderComponent={() => <ItemSeparator width={20}/>}
        ListFooterComponent={() => <ItemSeparator width={20}/>}
        renderItem={({item}) => ( 
        <MovieCard 
            title={item.title}
            
            voteAverage={item.vote_average}
            voteCount={item.vote_count}
            poster={item.poster_path}
            heartLess={false}
            onPress={() => navigation.navigate("movie",{movieId:item.id})}

        />)}
      />
        
        
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.WHITE,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        
      },
      inputText:{
        fontSize:16,
        textAlignVertical:'center',
        borderWidth:1,
        paddingLeft:10,
        paddingStart:20,
        margin:5,
        borderColor:COLORS.EXTRA_LIGHT_GRAY,
        height:50,
        backgroundColor:COLORS.WHITE,
        color:COLORS.BLACK,
        fontFamily:fonts.REGULAR
    },
    buttonText:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly'
    }
})

export default SearchBar;