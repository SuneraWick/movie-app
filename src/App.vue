<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <h1 class="app-name">Movie App</h1>
  <RouterView />
</template>

<style>
.app-name {
  margin: 1rem;
  font-weight: 700;
  font-size: xx-large;
}
</style>