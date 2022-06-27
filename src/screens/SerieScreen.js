import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ScrollView,Image,Dimensions,TouchableOpacity,Linking,FlatList,Share } from 'react-native';
import React,{useState,useEffect} from "react";
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import { getPoster,getVideo,getLanguage,getSerieById } from '../services/MovieService';
import ItemSeparator from '../components/ItemSeparator';
import CastCard from '../components/CastCard';
import MovieCard from '../components/MovieCard';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather,Ionicons } from "@expo/vector-icons";
import { APPEND_TO_RESPNOSE as AR } from '../constants/Urls';

const {height,width}=Dimensions.get("screen");
const setHeight = (h) => (height/100) * h;
const setwidth = (w) => (width/100) * w;

const  SerieScreen = ({route,navigation}) => {

  const {serieId}= route.params;
  const [tv,setTv]=useState({});
  const [isCastSelected,setIsCastSelected]=useState(true);
  
  useEffect(() =>{
    getSerieById(
      serieId,
      `${AR.VIDEOS},${AR.CREDITS},${AR.RECOMMENDATIONS},${AR.SIMILAR}`
      ).then((response )=> setTv(response?.data));
  },[])
  return (
    <ScrollView>
      <StatusBar style='light'/>
      <LinearGradient
        colors={["rgba(0,0,0,0.5)","rgba(217,217,217,0)"]}
        start={[0,0.3]}
        style={styles.LinearGradient}
      />
      <View style={styles.tvPosterImageContainer}>
        <Image 
          style={styles.tvPosterImage} 
          resizeMode='cover' 
          source={{uri:getPoster(tv?.backdrop_path)}}/>
      </View>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          activeOpacity={0.5} 
          onPress={() =>navigation.goBack() }>
          <Feather name="chevron-left" size={35} color={colors.WHITE}/>
        </TouchableOpacity>
        <TouchableOpacity 
          activeOpacity={0.5} 
          onPress={() => Share.share({message:`${tv?.title}\n\n${tv?.homepage}`})}
          >
        <Text style={styles.headerText}>Partager</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={styles.playButton} 
        onPress={() => Linking.openURL(getVideo(tv.videos.results[0].key))}>
        <Ionicons name="play-circle-outline" size={70} color={colors.WHITE}/>
      </TouchableOpacity>
      <ItemSeparator height={setHeight(37)}/>
      <View style={styles.tvTitleContainer}>
        <Text style={styles.tvTitle}>{tv?.original_title}</Text>
        <View style={styles.row}>
          <Ionicons name='heart' size={22} color={colors.HEART}/>
          <Text style={styles.ratingText}>{tv?.vote_average}</Text>
        </View>
      </View>
      <Text style={styles.genreText}>
        {tv?.genres?.map(genre => genre?.name)?.join(", ")} | {" "}
        {tv?.runtime} Min
      </Text>
      <Text style={styles.genreText}>
        {getLanguage(tv?.original_language)?.english_name}
      </Text>
      <View style={styles.overViewContainer}>
        <Text style={styles.overViewTitle}>Aperçu</Text>
        <Text style={styles.overViewText}>{tv?.overview}</Text>
      </View>
      <View>
        <Text style={styles.castTitle}>Cast</Text>
        <View style={styles.castSubMenuContainer}>
          <TouchableOpacity 
            activeOpacity={0.5} 
            onPress={() => setIsCastSelected(true)}
          >
            <Text 
              style={{...styles.castSubMenuText, color:isCastSelected ? colors.BLACK : colors.LIGHT_GRAY}}
            >Acteurs</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            activeOpacity={0.5} 
            onPress={() => setIsCastSelected(false)}
          >
            <Text 
              style={{...styles.castSubMenuText, color:isCastSelected ? colors.LIGHT_GRAY : colors.BLACK}}
            >Equipe</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={{marginVertical:5}}
          data={isCastSelected ?  tv?.credits?.cast :  tv?.credits?.crew}
          keyExtractor={(item) => item?.credit_id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={() => <ItemSeparator width={20}/>}
          ItemSeparatorComponent={() => <ItemSeparator width={20}/>}
          ListFooterComponent={() => <ItemSeparator width={20}/>}
          renderItem={({item}) => 
          <CastCard
            originalName={item?.name}
            characterName={isCastSelected ? item?.character : item?.job}
            image={item?.profile_path}
          />}
        />
      </View>
      <Text style={styles.extraListTitle}>Films Recommandés</Text>
      <FlatList
        data={tv?.recommendations?.results}
        keyExtractor={(item) => item?.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <ItemSeparator width={20} />}
        ItemSeparatorComponent={() => <ItemSeparator width={20} />}
        ListFooterComponent={() => <ItemSeparator width={20} />}
        renderItem={({ item }) => (
          <MovieCard
            title={item.title}
            language={item.original_language}
            voteAverage={item.vote_average}
            voteCount={item.vote_count}
            poster={item.poster_path}
            size={0.6}
            onPress={() => navigation.push("serie", { serieId: item.id })}
          />
        )}
      />
      <Text style={styles.extraListTitle}>Films Similaires</Text>
      <FlatList
        data={tv?.similar?.results}
        keyExtractor={(item) => item?.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <ItemSeparator width={20} />}
        ItemSeparatorComponent={() => <ItemSeparator width={20} />}
        ListFooterComponent={() => <ItemSeparator width={20} />}
        renderItem={({ item }) => (
          <MovieCard
            title={item.title}
            language={item.original_language}
            voteAverage={item.vote_average}
            voteCount={item.vote_count}
            poster={item.poster_path}
            size={0.6}
            onPress={() => navigation.push("serie", { serieId: item.id })}
          />
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.BASIC_BACKROUND,

  },
  tvPosterImageContainer:{
    height:setHeight(35),
    width:setwidth(145),
    alignItems:'center',
    position:'absolute',
    left:setwidth((100-145)/2),
    top:0,
    borderBottomRightRadius:300,
    borderBottomLeftRadius:300,
    elevation:8

  },
  tvPosterImage:{
    borderBottomRightRadius:300,
    borderBottomLeftRadius:300,
    width:setwidth(145),
    height:setHeight(35)
  },
  LinearGradient:{
    width:setwidth(100),
    height:setHeight(6),
    position:'absolute',
    top:0,
    elevation:9
  },
  headerContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:20,
    position:'absolute',
    right:0,
    left:0,
    top:50,
    elevation:20
  },
  headerText:{
    color:colors.WHITE,
    fontFamily:fonts.BOLD,
  },
  playButton:{
    position:'absolute',
    top:110,
    left:setwidth(50) -70/2,
    elevation:10
  },
  tvTitleContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:20,

  },
  tvTitle:{
    color:colors.BLACK,
    fontFamily:fonts.EXTRA_BOLD,
    fontSize:18,
    width:setwidth(60)
  },
  ratingText:{
    marginLeft:5,
    color:colors.BLACK,
    fontFamily:fonts.EXTRA_BOLD,
    fontSize:15
  },
  row:{
    flexDirection:'row',
    alignItems:'center'
  },
  genreText:{
    color:colors.LIGHT_GRAY,
    paddingHorizontal:20,
    paddingTop:5,
    fontFamily:fonts.BOLD,
    fontSize:13,

  },
  overViewContainer:{
    backgroundColor:colors.EXTRA_LIGHT_GRAY,
    paddingHorizontal:20,
    paddingVertical:10,
    marginVertical:10,
  },
  overViewTitle:{
    color:colors.BLACK,
    fontFamily:fonts.BOLD,
    fontSize:18,
  },
  overViewText:{
    color:colors.LIGHT_GRAY,
    paddingVertical:5,
    fontFamily:fonts.BOLD,
    fontSize:13,
    textAlign:'justify'

  },
  castTitle:{
    marginLeft:20,
    color:colors.BLACK,
    fontFamily:fonts.BOLD,
    fontSize:18
  },
  castSubMenuContainer:{
    marginLeft:20,
    flexDirection:'row',
    marginVertical:5
  },
  castSubMenuText:{
    marginRight:10,
    color:colors.BLACK,
    fontFamily:fonts.BOLD,
    fontSize:13

  },
  extraListTitle:{
    marginLeft:20,
    color:colors.BLACK,
    fontFamily:fonts.BOLD,
    fontSize:18,
    marginVertical:8

  },
  
});
export default SerieScreen;
