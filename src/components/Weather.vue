<script setup>
import useWeather from "../composables/useWeather";

defineProps({
  weather: {
    type: Object,
    required: true,
  },
});

const { formatterTemp } = useWeather();
</script>

<template>
  <div class="result">
    <h2>Clima de: {{ weather.name }}, {{ weather.sys.country }}</h2>
    <p class="current">{{ formatterTemp(weather.main.temp) }}<span>&deg;C</span></p>
    <div class="temperatures">
      <p>Min: {{ formatterTemp(weather.main.temp_min) }}<span>&deg;C</span></p>
      <p>Max: {{ formatterTemp(weather.main.temp_max) }}<span>&deg;C</span></p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
