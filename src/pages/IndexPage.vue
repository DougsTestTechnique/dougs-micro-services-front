<template>
  <q-page class="row items-center justify-evenly">
    <index-component title="Bienvenue !"></index-component>
  </q-page>
</template>

<script setup lang="ts">
import IndexComponent from 'components/IndexComponent.vue';

defineOptions({
  name: 'IndexPage',
});
</script>
