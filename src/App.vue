<script setup>
import Form from "./components/Form.vue";
import useWeather from "./composables/useWeather";
import Weather from "./components/Weather.vue";
import Spinner from "./components/Spinner.vue";
import Alert from "./components/Alert.vue";

const { getWeather, showWeather, weather, isLoading, isError } = useWeather();
</script>

<template>
  <h1 class="title">Buscador de clima</h1>
  <div class="container weather-search">
    <Form @get-weather="getWeather" />
    <Spinner v-if="isLoading" />
    <Alert v-if="isError">{{ isError }}</Alert>
    <Weather v-if="showWeather" :weather="weather" />
  </div>
</template>
