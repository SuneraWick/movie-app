<template>
    <div class="search-bar">
        <input v-model="searchQuery" @input="debouncedSearch" type="text" placeholder="Search for movies...">
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { debounce } from 'lodash-es';

export default defineComponent({
    name: 'SearchBar',
    emits: ['search'],
    setup(props, { emit }) {
        const searchQuery = ref('');

        const debouncedSearch = debounce(() => {
            emit('search', searchQuery.value);
        }, 300);

        return {
            searchQuery,
            debouncedSearch
        };
    }
});
</script>

<style scoped>
.search-bar {
    margin: 1rem 0;
}

input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
}
</style>