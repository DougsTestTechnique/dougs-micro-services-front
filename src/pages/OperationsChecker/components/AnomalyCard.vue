<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <div class="text-h6">{{ formatDate(anomaly.date) }}</div>
      <div>Expected: {{ formatAmount(anomaly.expected) }} €</div>
      <div>Actual: {{ formatAmount(anomaly.actual) }} €</div>
      <q-chip
        :color="anomaly.difference >= 0 ? 'positive' : 'negative'"
        text-color="white"
      >
        Difference: {{ formatAmount(anomaly.difference) }} €
      </q-chip>
      <div>{{ anomaly.message }}</div>
      <q-list>
        <q-item v-for="(movement, mIndex) in anomaly.movements" :key="mIndex">
          <q-item-section>
            <div>
              {{ formatDate(movement.date) }} - {{ movement.label }}:
              {{ movement.amount }} €
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Anomaly } from '../types';
import { date } from 'quasar';

defineProps({
  anomaly: {
    type: Object as PropType<Anomaly>,
    required: true
  },
});

const formatDate = (dateStr: string) => {
  const parsedDate = new Date(dateStr);
  return date.formatDate(parsedDate, 'DD/MM/YYYY HH:mm:ss');
};

const formatAmount = (amount: number) => {
      return new Intl.NumberFormat('fr-FR', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    }
</script>
