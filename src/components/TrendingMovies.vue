<template>
    <div class="trending-movies">
        <h2>Trending This Week</h2>
        <div class="movie-scroll" ref="scrollContainer">
            <MovieCard v-for="movie in trendingMovies" :key="movie.id" :movie="movie" class="movie-card" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import MovieCard from './MovieCard.vue';
import { getTrendingMovies } from '@/services/tmdbApi';

export default defineComponent({
    name: 'TrendingMovies',
    components: {
        MovieCard
    },
    setup() {
        const trendingMovies = ref([]);
        const scrollContainer = ref(null);

        onMounted(async () => {
            try {
                const response = await getTrendingMovies();
                trendingMovies.value = response.data.results;
            } catch (error) {
                console.error('Error fetching trending movies:', error);
            }
        });

        return {
            trendingMovies,
            scrollContainer
        };
    }
});
</script>

<style scoped>
.trending-movies {
    margin: 2rem 0;
}

.movie-scroll {
    display: flex;
    overflow-x: auto;
    gap: 1rem;
    padding: 1rem 0;
}

.movie-card {
    flex: 0 0 auto;
    width: 200px;
}
</style>