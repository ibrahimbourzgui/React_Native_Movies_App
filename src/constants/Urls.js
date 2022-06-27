
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const YOUTUBE_BASE_URL="https://www.youtube.com/watch"
const TMDB_API_KEY ="951e3639ab5ba5d05cbda770ec2aacbe";
const LANGAGE="fr";
const ENDPOINTS = {
    NOW_PLAYING_MOVIES: "/movie/now_playing",
    UPCOMING_MOVIES: "/movie/upcoming",
    GENRES: "/genre/movie/list",
    MOVIE: "/movie",
    AllSeries:"/tv/popular",
    SERIES:"/tv",
    UPCOMING_SERIES:"/tv/on_the_air"

};
const APPEND_TO_RESPNOSE={
    VIDEOS: "videos",
    CREDITS:"credits",
    RECOMMENDATIONS: "recommendations",
    SIMILAR: "similar",

}


export {
    TMDB_BASE_URL,
    TMDB_API_KEY,
    TMDB_IMAGE_BASE_URL,
    ENDPOINTS,
    LANGAGE,
    APPEND_TO_RESPNOSE,
    YOUTUBE_BASE_URL,
   
};
