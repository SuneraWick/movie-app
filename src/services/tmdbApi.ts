import axios from 'axios';

const apiKey = '827adab569ef65a32ed9fe4c3554ce7a'; // Replace with your actual API key
const baseURL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
    baseURL,
    params: {
        api_key: apiKey,
    },
});

export const getPopularMovies = () => tmdbApi.get('/movie/popular');
export const getMovieDetails = (id: number) => tmdbApi.get(`/movie/${id}`);
export const searchMovies = (query: string) => tmdbApi.get('/search/movie', { params: { query } });
export const getMoviesByGenre = (genreId: number) => tmdbApi.get('/discover/movie', { params: { with_genres: genreId } });
export const getTrendingMovies = () => tmdbApi.get('/trending/movie/week');
export const getGenres = () => tmdbApi.get('/genre/movie/list');

export default tmdbApi;