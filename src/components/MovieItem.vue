<template>
  <div class="movie-item mb-3">
    <div class="movie-item-poster" :style="posterBg"></div>
    <div class="movie-info-wrap d-flex flex-column justify-content-between">
      <div class="movie-item-info">
        <h3 class="movie-title">{{ movie.Title }}</h3>
        <span class="movie-year">{{ movie.Year }}</span>
      </div>
      <div class="movie-item-controls row no-gutters">
        <div class="col pr-2">
          <BButton size="md" block variant="outline-light" @click="showInfoModalEvent">Info</BButton>
        </div>
        <div class="col pl-2">
          <BButton size="md" block variant="outline-light" @click="emitRemoveEvent">Remove</BButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieItem",
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  computed: {
    posterBg() {
      return {
        "background-image": `url(${this.movie.Poster})`
      };
    }
  },
  methods: {
    emitRemoveEvent() {
      this.$emit("removeItem", { id: this.movie.imdbID, title: this.movie.Title });
    },
    showInfoModalEvent() {
      this.$emit("showModal", this.movie.imdbID);
    }
  }
};
</script>

<style scoped>
.movie-item {
  position: relative;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.2s ease;
  height: 400px;
}

.movie-item:hover {
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.7);
  transform: scale(1.02);
}

.movie-item-poster {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.movie-info-wrap {
  padding: 20px 10px;
  height: 100%;
  opacity: 0;
  transition: all 0.2s ease;
}

.movie-title {
  font-size: 20px;
  color: #fff;
}

.movie-year {
  font-size: 14px;
  color: #fff;
}

.movie-item:hover .movie-info-wrap {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
