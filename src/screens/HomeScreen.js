import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList,TextInput } from 'react-native';
import COLORS from '../constants/colors';
import FONTS from '../constants/fonts';
import GenreCard from "../components/GenreCard";
import Cards from './Cards';
import MovieCard from '../components/MovieCard';
import ItemSeparator from '../components/ItemSeparator';
import { getNowPlayingMovies, getUpcomingMovies,getPopularSeries,getUpcomingSeries} from '../services/MovieService';
import { Feather,Ionicons } from '@expo/vector-icons';
const  HomeScreen = ({navigation}) => {
  
  //const [activeGenre, setActiveGenre] = useState("All");
  const [nowPlayingMovies, setNowPlayingMovies]= useState({});
  const [upcomingMovies, setUpcomingMovies]= useState({});
  const [PopularSeries, setPopularSeries]= useState({});
  const [upcomingSeries, setUpcomingSeries]= useState({});
  // const [getGenres, setGenres]= useState([{id:10110 ,name:"All"}]);

  useEffect(() => {
    getNowPlayingMovies().then((movieResponse => 
      setNowPlayingMovies(movieResponse.data)));

     getUpcomingMovies().then((movieResponse => 
      setUpcomingMovies(movieResponse.data)));

      getPopularSeries().then((tvResponse => 
        setPopularSeries(tvResponse.data)));

        getUpcomingSeries().then((tvResponse => 
          setUpcomingSeries(tvResponse.data)));
      
    // getAllGenres().then((genreResponse => 
    //   setGenres([...getGenres, ...genreResponse.data.genres])));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        style="auto"
        translucent={false}
        backgroundColor={COLORS.BASIC_BACKROUND} />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Découvrir</Text>
        <Feather
          name="search"
          size={34}
          color={COLORS.ACTIVE}
          onPress={() => navigation.navigate('Search')}
        />
      </View>
      <View style={styles.genreListContainer}>
      </View>
      <FlatList
      data={nowPlayingMovies.results} 
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <ItemSeparator width={20} />}
      ListHeaderComponent={() => <ItemSeparator width={20}/>}
      ListFooterComponent={() => <ItemSeparator width={20}/>}
      renderItem={({item}) => ( 
      <MovieCard 
        title={item.title}
        language={item.original_language}
        voteAverage={item.vote_average}
        voteCount={item.vote_count}
        poster={item.poster_path}
        heartLess={false}
        onPress={() => navigation.navigate("movie",{movieId:item.id})}

      />)}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Bientôt disponible</Text>
      </View>
      <FlatList
      data={upcomingMovies.results} 
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <ItemSeparator width={20} />}
      ListHeaderComponent={() => <ItemSeparator width={20}/>}
      ListFooterComponent={() => <ItemSeparator width={20}/>}
      renderItem={({item}) => ( 
      <MovieCard 
        title={item.title}
        language={item.original_language}
        voteAverage={item.vote_average}
        voteCount={item.vote_count}
        poster={item.poster_path}
        size={0.7}
        onPress={() => navigation.navigate("movie",{movieId:item.id})}
      />)}
      />  

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Séries populaires</Text>
      </View>
      <FlatList
      data={PopularSeries.results} 
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <ItemSeparator width={20} />}
      ListHeaderComponent={() => <ItemSeparator width={20}/>}
      ListFooterComponent={() => <ItemSeparator width={20}/>}
      renderItem={({item}) => ( 
      <MovieCard 
        title={item.title}
        language={item.original_language}
        voteAverage={item.vote_average}
        voteCount={item.vote_count}
        poster={item.poster_path}
        heartLess={false}
        onPress={() => navigation.navigate("serie",{serieId:item.id})}

      />)}
      />  

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Nouvelles Séries</Text>
      </View>
      <FlatList
      data={upcomingSeries.results} 
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <ItemSeparator width={20} />}
      ListHeaderComponent={() => <ItemSeparator width={20}/>}
      ListFooterComponent={() => <ItemSeparator width={20}/>}
      renderItem={({item}) => ( 
      <MovieCard 
        title={item.title}
        language={item.original_language}
        voteAverage={item.vote_average}
        voteCount={item.vote_count}
        poster={item.poster_path}
        size={0.7}
        onPress={() => navigation.navigate("serie",{serieId:item.id})}
      />)}
      />     
    </ScrollView>

    
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BASIC_BACKROUND,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: FONTS.REGULAR,
    
  },
  headerSubTitle: {
    fontSize: 17,
    color: COLORS.ACTIVE,
    fontFamily:FONTS.BOLD,
    
  },
  genreListContainer:
  {
    paddingVertical: 10
  }
});
export default HomeScreen;
