<template>
    <div v-if="movie" class="movie-detail">
        <h1>{{ movie.title }}</h1>
        <div class="movie-info">
            <img :src="posterUrl" :alt="movie.title" class="movie-poster">
            <div class="movie-details">
                <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
                <p><strong>Rating:</strong> {{ movie.vote_average }}/10</p>
                <p><strong>Overview:</strong> {{ movie.overview }}</p>
                <p><strong>Genres:</strong> {{ movieGenres }}</p>
            </div>
        </div>
    </div>
    <div v-else>Loading...</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getMovieDetails } from '@/services/tmdbApi';

export default defineComponent({
    name: 'MovieDetailView',
    setup() {
        const route = useRoute();
        const movie = ref<any>(null);

        const posterUrl = computed(() =>
            movie.value ? `https://image.tmdb.org/t/p/w500${movie.value.poster_path}` : ''
        );

        const movieGenres = computed(() =>
            movie.value ? movie.value.genres.map((genre: any) => genre.name).join(', ') : ''
        );

        onMounted(async () => {
            const movieId = Number(route.params.id);
            try {
                const response = await getMovieDetails(movieId);
                movie.value = response.data;
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        });

        return { movie, posterUrl, movieGenres };
    },
});
</script>

<style scoped>
.movie-detail {
    margin: 2rem;
}

.movie-info {
    display: flex;
    gap: 2rem;
    margin-top: 1rem;
}

.movie-poster {
    max-width: 300px;
    height: auto;
}

.movie-details {
    flex: 1;
}

.movie-details p {
    margin-bottom: 0.5rem;
}
</style>