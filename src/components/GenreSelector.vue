<template>
    <div class="genre-selector">
        <select v-model="selectedGenre" @change="onGenreChange">
            <option value="">All Genres</option>
            <option v-for="genre in genres" :key="genre.id" :value="genre.id">
                {{ genre.name }}
            </option>
        </select>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getGenres } from '@/services/tmdbApi';

export default defineComponent({
    name: 'GenreSelector',
    emits: ['genreChange'],
    setup(props, { emit }) {
        const genres = ref([]);
        const selectedGenre = ref('');

        onMounted(async () => {
            try {
                const response = await getGenres();
                genres.value = response.data.genres;
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        });

        const onGenreChange = () => {
            emit('genreChange', selectedGenre.value);
        };

        return {
            genres,
            selectedGenre,
            onGenreChange
        };
    }
});
</script>

<style scoped>
.genre-selector {
    margin: 1rem 0;
}

select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
}
</style>