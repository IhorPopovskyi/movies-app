import axios from "@/plugins/axios";
import IDs from "@/store/mock/imdb_top250";
import mutations from "@/store/mutations";

function serializeResponse(movies) {
  return movies.reduce((acc, movie) => {
    acc[movie.imdbID] = movie;
    return acc;
  }, {});
}

const { MOVIES } = mutations;

const moviesStore = {
  namespaced: true,
  state: {
    top250IDs: IDs,
    moviesPerPage: 12,
    currentPage: 1,
    movies: {}
  },
  getters: {
    moviesList: ({ movies }) => movies,
    slicedIds: ({ top250IDs }) => (from, to) => top250IDs.slice(from, to),
    moviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    currentPage: ({ currentPage }) => currentPage
  },
  mutations: {
    [MOVIES](state, value) {
      state.movies = value;
    }
  },
  actions: {
    initMoviesStore: {
      handler({ dispatch }) {
        dispatch("fetchMovies");
      },
      root: true
    },
    async fetchMovies({ getters, commit }) {
      try {
        const { moviesPerPage, currentPage, slicedIds } = getters;
        const from = moviesPerPage * currentPage - moviesPerPage;
        const to = moviesPerPage * currentPage;
        const moviesToFetch = slicedIds(from, to);
        const requests = moviesToFetch.map(id => axios.get(`/?i=${id}`));
        const response = await Promise.all(requests);
        const movies = serializeResponse(response);
        commit(MOVIES, movies);
      } catch (err) {
        console.log(err);
      }
    }
  }
};

export default moviesStore;
