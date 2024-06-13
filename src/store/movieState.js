import { createSlice } from '@reduxjs/toolkit';

export const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: [],
        isLoading: false,
        domain: 'movie',
        filter: 'popular',
        genres: [],
        minYear: 1990,
        maxYear: 2023,
        vote_rate: 1,
        total_pages: 1,
        page: 1
    },
    reducers: {
        getMoviesFetch: (state, action) => {
            state.isLoading = true;
            state.domain = action.payload
        },
        getMoviesSuccess: (state, action) => {

            state.movies = action.payload;
            state.isLoading = false;
        },
        getMoviesFailure: (state) => {
            state.isLoading = false;
        },
        searchMoviesFetch: (state, action) => {
            state.isLoading = true;

        },
        searchMoviesSuccess: (state, action) => {
            state.isLoading = false;
            state.movies = action.payload
        },
        searchMoviesFailure: (state) => {
            state.isLoading = false;
            state.error = true;
        },
        filterMoviesFetch: (state, action) => {
            state.isLoading = true;
            state.filter = action.payload
        },
        filterMoviesSuccess: (state, action) => {

            state.movies = action.payload;
            state.isLoading = false;
        },
        filterMoviesFailure: (state) => {
            state.isLoading = false;
        },
        genreFilter: (state, action) => {
            state.isLoading = true;
            state.genres = action.payload.genres
            state.maxYear = action.payload.maxYear
            state.minYear = action.payload.minYear
            state.vote_rate = action.payload.vote_rate
            state.page = action.payload.page
        },
        genreFilterSuccess: (state, action) => {
            state.isLoading = false;
            state.movies = action.payload
        },
        genreFilterFailure: (state) => {
            state.isLoading = true;
            state.error = true;
        },
        updateTotalPages: (state, action) => {
            state.total_pages = action.payload;
        },
        updateCurrentPage: (state, action) => {
            state.page = action.payload
        }
    },
});

export const { updateCurrentPage, updateTotalPages, genreFilter, genreFilterSuccess, genreFilterFailure, filterMoviesFetch, filterMoviesSuccess, filterMoviesFailure, getMoviesFetch, getMoviesSuccess, getMoviesFailure, searchMoviesFailure, searchMoviesSuccess, searchMoviesFetch } = movieSlice.actions;

export default movieSlice.reducer;
