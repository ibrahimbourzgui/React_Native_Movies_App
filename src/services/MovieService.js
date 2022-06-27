const axios = require("axios").default;

import { TMDB_BASE_URL, TMDB_API_KEY, TMDB_IMAGE_BASE_URL, ENDPOINTS,LANGAGE,YOUTUBE_BASE_URL} from "../constants/Urls";
import LANGUAGES from '../constants/Languages'

const TMDB_HTTP_REQUEST = axios.create({
    baseURL: TMDB_BASE_URL,
    params: {
        api_key: TMDB_API_KEY,
        language:LANGAGE,
    },
});

const getNowPlayingMovies = () => 
TMDB_HTTP_REQUEST.get(ENDPOINTS.NOW_PLAYING_MOVIES);



const getPopularSeries = () => 
TMDB_HTTP_REQUEST.get(ENDPOINTS.AllSeries);

const getUpcomingSeries = () => 
TMDB_HTTP_REQUEST.get(ENDPOINTS.UPCOMING_SERIES);

const getMovieById = (movieId,append_to_response="") => 
TMDB_HTTP_REQUEST.get(`${ENDPOINTS.MOVIE}/${movieId}`,
append_to_response ? {params:{append_to_response}} : null
);

const getSerieById = (serieId,append_to_response="") => 
TMDB_HTTP_REQUEST.get(`${ENDPOINTS.SERIES}/${serieId}`,
append_to_response ? {params:{append_to_response}} : null
);

const getUpcomingMovies = () => 
TMDB_HTTP_REQUEST.get(ENDPOINTS.UPCOMING_MOVIES);

const getAllGenres= () => 
TMDB_HTTP_REQUEST.get(ENDPOINTS.GENRES);

const getPoster = (path) => `${TMDB_IMAGE_BASE_URL}/original${path}?language=${LANGAGE}`;

const getVideo = (key) => `${YOUTUBE_BASE_URL}/v=${key}`;

const getLanguage = (language_iso) => LANGUAGES.find((language) =>language.iso_639_1 === language_iso)

export { getNowPlayingMovies, getPoster,getLanguage,getUpcomingMovies,getAllGenres,getMovieById,getVideo,getPopularSeries,getSerieById,getUpcomingSeries};