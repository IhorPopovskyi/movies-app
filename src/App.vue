<template>
  <div id="app">
    <PosterBg />
    <MoviesList :list="moviesList" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MoviesList from "@/components/MoviesList";
import PosterBg from "@/components/PosterBg";

export default {
  name: "App",
  components: { MoviesList, PosterBg },
  computed: {
    ...mapGetters("movies", ["moviesList"])
  },
  methods: {
    ...mapActions("movies", ["fetchMovies"])
  }
};
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}
</style>
