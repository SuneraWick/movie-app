<template>
  <div class="home">
    <div class="filters">
      <SearchBar @search="handleSearch" />
      <GenreSelector @genreChange="handleGenreChange" />
    </div>
    <TrendingMovies />
    <MovieList :title="movieListTitle" :movies="displayedMovies" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import MovieList from '@/components/MovieList.vue';
import SearchBar from '@/components/SearchBar.vue';
import GenreSelector from '@/components/GenreSelector.vue';
import TrendingMovies from '@/components/TrendingMovies.vue';
import { getPopularMovies, searchMovies, getMoviesByGenre } from '@/services/tmdbApi';

export default defineComponent({
  name: 'HomeView',
  components: {
    MovieList,
    SearchBar,
    GenreSelector,
    TrendingMovies,
  },
  setup() {
    const popularMovies = ref([]);
    const searchResults = ref([]);
    const genreResults = ref([]);
    const isSearching = ref(false);
    const selectedGenre = ref('');

    onMounted(async () => {
      try {
        const response = await getPopularMovies();
        popularMovies.value = response.data.results;
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    });

    const handleSearch = async (query: string) => {
      if (query.trim() === '') {
        isSearching.value = false;
        selectedGenre.value = '';
        return;
      }

      isSearching.value = true;
      selectedGenre.value = '';
      try {
        const response = await searchMovies(query);
        searchResults.value = response.data.results;
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    };

    const handleGenreChange = async (genreId: string) => {
      selectedGenre.value = genreId;
      isSearching.value = false;
      if (!genreId) {
        genreResults.value = [];
        return;
      }
      try {
        const response = await getMoviesByGenre(Number(genreId));
        genreResults.value = response.data.results;
      } catch (error) {
        console.error('Error fetching movies by genre:', error);
      }
    };

    const displayedMovies = computed(() => {
      if (isSearching.value) return searchResults.value;
      if (selectedGenre.value) return genreResults.value;
      return popularMovies.value;
    });

    const movieListTitle = computed(() => {
      if (isSearching.value) return "Search Results";
      if (selectedGenre.value) return "Genre Results";
      return "Popular Movies";
    });

    return {
      displayedMovies,
      movieListTitle,
      handleSearch,
      handleGenreChange
    };
  },
});
</script>

<style scoped>
.app-name {
  margin: 1rem;
  font-weight: 700;
  font-size: xx-large;
}

.filters {
  display: flex;
  gap: 1rem;
  margin: 1rem;
}

.filters>* {
  flex: 1;
}
</style>