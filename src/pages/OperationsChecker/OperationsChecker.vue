<template>
  <q-page class="flex flex-center q-pa-md">
    <div class="column items-center q-gutter-md q-mx-md full-width">
      <h4>Ce micro service permet de comparer deux fichiers JSON :</h4>
      <p>1) Fichier JSON de Scrapping des entreprises externes</p>
      <p>1) Fichier JSON de relevé bancaire</p>

      <!-- Affichage ddes deux uplodaers + bouton validation -->
      <div class="row q-gutter-md full-width">
        <q-uploader
          label="Téléverser du fichier (Scrapping)"
          :multiple="true"
          accept=".json"
          class="q-uploader-width"
          @added="handleFileUpload1"
        ></q-uploader>

        <q-uploader
          label="Téléverser du fichier (Banque)"
          :multiple="true"
          accept=".json"
          class="q-uploader-width"
          @added="handleFileUpload2"
        ></q-uploader>
      </div>

      <q-btn
        label="Valider les imports"
        color="primary"
        class="q-mt-md full-width"
        @click="validateImports"
      />

      <!-- Affichage du spinner de chargement -->
      <q-spinner v-if="loading" class="q-mt-md" />

      <!-- Affichage du composant AnomalyCard -->
      <div v-if="!loading && result">
        <div v-if="result.anomalies && result.anomalies.length > 0">
          <anomaly-card
            v-for="(anomaly, index) in result.anomalies"
            :key="index"
            :anomaly="anomaly"
          />
        </div>

        <!-- Affichage d'une card vide -->
        <div v-else>
          <q-card class="q-ma-md">
            <q-card-section>
              <div class="text-h6">Aucune anomalie détectée</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import api from '../../utils/databaseService';
import { Notify } from 'quasar';
import AnomalyCard from './components/AnomalyCard.vue';
import { Result } from './types';

defineOptions({
  name: 'OperationsCheckerPage',
});

// Définition des constantes
const scrappingFile = ref<File[]>([]);
const bankFile = ref<File[]>([]);
const jsonContentsScrapping = ref<object[]>([]);
const jsonContentsBank = ref<object[]>([]);
const loading = ref(false);
const result = ref<Result | null>(null);

// Fonctions d'ajout des fichiers JSON
const handleFileUpload1 = (files: readonly File[]) => {
  scrappingFile.value = Array.from(files);
  readFiles(scrappingFile.value, jsonContentsScrapping);
};

const handleFileUpload2 = (files: readonly File[]) => {
  bankFile.value = Array.from(files);
  readFiles(bankFile.value, jsonContentsBank);
};

// Fonction de decodage du JSON
const readFiles = (files: File[], jsonContents: Ref<object[]>) => {
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        jsonContents.value.push(json);
      } catch (e) {
        Notify.create({
          message: 'Erreur de parsing JSON',
          color: 'negative',
        });
      }
    };
    reader.readAsText(file);
  });
};

// Fonction d'appel vers l'API Back-end
const validateImports = async () => {
  if (
    jsonContentsScrapping.value.length > 0 &&
    jsonContentsBank.value.length > 0
  ) {
    loading.value = true;
    result.value = null;
    try {
      const response = await api.post('/operations-checker', {
        movements: jsonContentsScrapping.value,
        balances: jsonContentsBank.value,
      });
      result.value = response.data as Result;
      Notify.create({
        message: 'Fichiers analysés avec succès !',
        color: 'positive',
      });
    } catch (error) {
      console.error('Erreur :', error);
      Notify.create({
        message: "Erreur lors de l'appel à l'API.",
        color: 'negative',
      });
    } finally {
      loading.value = false;
    }
  } else {
    Notify.create({
      message: 'Veuillez téléverser les fichiers JSON dans les deux champs.',
      color: 'negative',
    });
  }
};
</script>

<style scoped>
.q-uploader-width {
  flex: 1;
  margin: 0 8px;
}
</style>
