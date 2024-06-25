<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
  title: string;
}

defineProps<Props>();
</script>
