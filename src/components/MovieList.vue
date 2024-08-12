<template>
    <div class="movie-list">
        <h2 class="title">{{ title }}</h2>
        <div class="movie-grid">
            <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import MovieCard from './MovieCard.vue';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

export default defineComponent({
    name: 'MovieList',
    components: {
        MovieCard,
    },
    props: {
        title: String,
        movies: Array as PropType<Movie[]>,
    },
});
</script>

<style scoped>
.movie-list {
    margin: 1rem;
}

.movie-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    gap: 1rem;
}

.title {
    margin-bottom: 1rem;
}
</style>