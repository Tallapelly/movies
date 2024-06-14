import { call, put, takeEvery } from 'redux-saga/effects';
import { updateTotalPages, getMoviesFailure, getMoviesFetch, getMoviesSuccess, genreFilter, genreFilterFailure, genreFilterSuccess, filterMoviesFailure, filterMoviesSuccess, filterMoviesFetch, searchMoviesSuccess, searchMoviesFailure } from './movieState';
import axios from 'axios';


function* workGetMovieFetch(action) {
    try {

        const params = new URLSearchParams();
        params.append('api_key', '31202009cb3f3631cb8be1a4aa7a4454');

        const response = yield call(axios.get, `https://api.themoviedb.org/3/discover/${action.payload}?${params.toString()}`);
        if (!response.status == 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const movies = yield response.data;

        yield put(updateTotalPages(movies.total_pages))
        yield put(getMoviesSuccess(movies.results));
    } catch (error) {
        console.error('Error fetching movies:', error);
        yield put(getMoviesFailure());
    }
}

function* fetchSearchMovies(action) {
    const { domain, query } = action.payload;

    try {
        const params = new URLSearchParams();
        params.append('api_key', '31202009cb3f3631cb8be1a4aa7a4454');
        params.append('query', query);
        const response = yield call(axios.get, `https://api.themoviedb.org/3/search/${domain}?${params.toString()}`);
        if (!response.status == 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const movies = yield response.data;

        yield put(updateTotalPages(movies.total_pages))
        yield put(searchMoviesSuccess(movies.results));
    } catch (error) {
        console.error('Error searching movies:', error);
        yield put(searchMoviesFailure());
    }
}

function* filteredMovies(action) {
    const { domain, filter } = action.payload;
    
    let response = {};
    try {
        if (filter == 'trending') {
            console.log(filter)
            response = yield call(axios.get, `https://api.themoviedb.org/3/trending/${domain}/day?api_key=31202009cb3f3631cb8be1a4aa7a4454`);
        } else {

            response = yield call(axios.get, `https://api.themoviedb.org/3/${domain}/${filter}?api_key=31202009cb3f3631cb8be1a4aa7a4454`);
        }

        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const movies = yield response.data;
        yield put(updateTotalPages(movies.total_pages))
        yield put(filterMoviesSuccess(movies.results));
    } catch (error) {
        console.error('Error searching movies:', error);
        yield put(filterMoviesFailure());
    }
}
function* genreFilterfun(action) {

    const { domain, genres, minYear, maxYear, vote_rate, page } = action.payload;
    try {
        const params = new URLSearchParams();
        params.append('api_key', '31202009cb3f3631cb8be1a4aa7a4454');
        params.append('sort_by', 'release_date.desc');
        params.append('with_genres', genres.join(','));
        params.append('release_date.gte', `${minYear}-01-01`);
        params.append('release_date.lte', `${maxYear}-12-30`);
        params.append('vote_average.gte', vote_rate);
        params.append('vote_average.lte', '5');
        params.append('page', `${page}`);

        const response = yield call(axios.get, `https://api.themoviedb.org/3/discover/${domain}?${params.toString()}`);
        //   const response = yield call(
        //     axios.get,
        //     `https://api.themoviedb.org/3/discover/${domain}?api_key=31202009cb3f3631cb8be1a4aa7a4454&sort_by=release_date.desc&with_genres=${genres.join(
        //       ','
        //     )}&release_date.gte=${minYear}-01-01&release_date.lte=${maxYear}-12-30&vote_average.gte=${vote_rate}&vote_average.lte=5`
        //   );
        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const movies = yield response.data;
        // console.log(movies.total_pages,movies.results);
        yield put(updateTotalPages(movies.total_pages))
        yield put(genreFilterSuccess(movies.results));
    } catch (error) {
        console.error('Error filtering movies by genre:', error);
        yield put(genreFilterFailure());
    }
}

function* watchGetMoviesFetch() {
    yield takeEvery('movies/getMoviesFetch', workGetMovieFetch);
    yield takeEvery('movies/searchMoviesFetch', fetchSearchMovies);
    yield takeEvery('movies/filterMoviesFetch', filteredMovies)
    yield takeEvery('movies/genreFilter', genreFilterfun)
}

export default function* movieSaga() {
    yield watchGetMoviesFetch();
}

