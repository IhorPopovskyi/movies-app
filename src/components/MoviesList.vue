<template>
  <BContainer>
    <h3 class="list-title">{{ listTitle }}</h3>
    <BRow>
      <template v-if="isExist">
        <BCol cols="3" v-for="(movie, key) in list" :key="key">
          <MovieItem
            :movie="movie"
            @mouseover.native="onMouseOver(movie.Poster)"
            @removeItem="onRemoveItem"
            @showModal="onShowMovieInfo"
          />
        </BCol>
      </template>
      <template v-else>
        <div>Empty list</div>
      </template>
    </BRow>
    <BModal body-class="movie-modal-body" :id="movieInfoModalID" size="xl" hide-header hide-footer>
      <MovieInfoModalContent :movie="selectedMovie" @closeModal="onCloseModal"/>
    </BModal>
  </BContainer>
</template>

<script>
import MovieItem from "./MovieItem";
import { mapActions, mapGetters } from "vuex";
import MovieInfoModalContent from "@/components/MovieInfoModalContent";

export default {
  name: "MoviesList",
  props: {
    list: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    movieInfoModalID: "movie-info",
    selectedMovieId: ""
  }),
  components: {
    MovieInfoModalContent,
    MovieItem
  },
  computed: {
    ...mapGetters("movies", ["isSearch"]),
    isExist() {
      return Boolean(Object.keys(this.list).length);
    },
    listTitle() {
      return this.isSearch ? "Search result:" : "IMDB Top 250";
    },
    selectedMovie() {
      return this.selectedMovieId ? this.list[this.selectedMovieId] : null;
    }
  },
  methods: {
    ...mapActions("movies", ["removeMovie"]),
    ...mapActions(["showNotify"]),
    onMouseOver(poster) {
      this.$emit("changePoster", poster);
    },
    async onRemoveItem({ id, title }) {
      const isConfirmed = await this.$bvModal.msgBoxConfirm(`Are you sure delete ${title}?`);
      if (isConfirmed) {
        this.removeMovie(id);
        this.showNotify({
          msg: "Movie deleted successfully",
          variant: "success",
          title: "Success"
        });
      }
    },
    onShowMovieInfo(id) {
      this.selectedMovieId = id;
      this.$bvModal.show(this.movieInfoModalID);
    },
    onCloseModal() {
      this.selectedMovieId = null;
      this.$bvModal.hide(this.movieInfoModalID);
    }
  }
};
</script>

<style scoped>
.list-title {
  font-size: 50px;
  margin-bottom: 30px;
  color: #fff;
}
</style>

<style>
.movie-modal-body {
  padding: 0 !important;
}
</style>
