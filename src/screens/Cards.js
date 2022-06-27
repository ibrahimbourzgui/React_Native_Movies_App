import { FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import ItemSeparator from '../components/ItemSeparator';
import GenreCard from "../components/GenreCard";
import axios from 'axios';

const Cards = ({navigation}) => {
    const [activeGenre,setActiveGenre]=useState("Action")
    const [getGenres, setGenres]= useState([{id:10110 ,name:"All"}]);

    useEffect(() =>{
        const api_key="951e3639ab5ba5d05cbda770ec2aacbe";
        const GENRES="genre/movie/list";

        axios.get(`https://api.themoviedb.org/3/${GENRES}?api_key=${api_key}&language=fr`)
      .then((movieGenre) =>setGenres(movieGenre.data.genres));
    })
    return(

        <FlatList data={getGenres}
        horizontal 
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <ItemSeparator width={20} />}
        ListHeaderComponent={() => <ItemSeparator width={20}/>}
        ListFooterComponent={() => <ItemSeparator width={20}/>}
        renderItem={({item}) => (
        <GenreCard genreName={item.name}
        active={item.name === activeGenre ? true : false}
              onPress={setActiveGenre}
              />
        )}
        />
    );
}

export default Cards;