<template>
    <router-link :to="{ name: 'movieDetail', params: { id: movie.id } }" class="movie-card">
        <img :src="posterUrl" :alt="movie.title">
        <h3>{{ movie.title }}</h3>
    </router-link>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

export default defineComponent({
    name: 'MovieCard',
    props: {
        movie: {
            type: Object as PropType<Movie>,
            required: true,
        },
    },
    setup(props) {
        const posterUrl = computed(() =>
            `https://image.tmdb.org/t/p/w200${props.movie.poster_path}`
        );

        return { posterUrl };
    },
});
</script>

<style scoped>
.movie-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    display: block;
}

.movie-card img {
    width: 100%;
    height: auto;
}

.movie-card h3 {
    padding: 0.5rem;
    margin: 0;
    font-size: 1rem;
}
</style>