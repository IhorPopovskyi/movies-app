<template>
  <header class="header">
    <BNavbar type="dark" class="navbar" variant="dark">
      <BContainer>
        <BNavbarBrand href="#">MovieDB</BNavbarBrand>
        <BNavForm>
          <BFormInput
            class="mr-sm-2 search-input"
            placeholder="Search"
            v-model="searchValue"
            debounce="500">
          </BFormInput>
        </BNavForm>
      </BContainer>
    </BNavbar>
  </header>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Header",
  data: () => ({
    searchValue: ""
  }),
  watch: {
    searchValue: "onSearchValueChanged"
  },
  methods: {
    ...mapActions("movies", ["searchMovies", "fetchMovies", "toggleSearchState"]),
    onSearchValueChanged(val) {
      if (val) {
        this.searchMovies(val);
        this.toggleSearchState(true);
      } else {
        this.fetchMovies();
        this.toggleSearchState(false);
      }
    }
  }
};
</script>

<style scoped>
.header {
  margin-bottom: 30px;
}

.navbar {
  background-color: rgba(0, 0, 0, 0.7) !important;
}

.search-input {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 0, 0, 0.3);
}

.search-input:focus {
  color: #fff;
  box-shadow: none;
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(0, 0, 0, 0.3);
}
</style>
