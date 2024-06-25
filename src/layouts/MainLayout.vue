<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Dougs Micro Services
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Services
        </q-item-label>

        <q-item clickable v-for="link in linksList" :key="link.title" @click="navigateTo(link.route)">
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.title }}</q-item-label>
            <q-item-label caption>{{ link.caption }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { QItem, QItemSection, QItemLabel, QIcon } from 'quasar';

defineOptions({
  name: 'MainLayout'
});

const linksList = [
  {
    title: 'Operations Validateurs',
    caption: 'Test technique',
    icon: 'school',
    route: '/operations-checker'
  },
];

const leftDrawerOpen = ref(false);
const router = useRouter();

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function navigateTo(route: string) {
  router.push(route);
}
</script>
