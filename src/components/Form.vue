<script setup>
import { reactive, ref } from "vue";
import Alert from "./Alert.vue";

const emit = defineEmits(["get-weather"]);

const countries = [
  { code: "US", name: "United States" },
  { code: "MX", name: "Mexico" },
  { code: "AR", name: "Argentina" },
  { code: "CO", name: "Colombia" },
  { code: "CR", name: "Costa Rica" },
  { code: "ES", name: "Spain" },
  { code: "PE", name: "Peru" },
];

const search = reactive({
  city: "",
  country: "",
});
const isError = ref("");

const searchWeather = () => {
  if (Object.values(search).includes("")) {
    isError.value = "Todos los campos son obligatorios";
    return;
  }

  isError.value = "";

  // Consultar el clima
  emit("get-weather", search);
};
</script>

<template>
  <form class="form" @submit.prevent="searchWeather">
    <Alert v-if="isError">{{ isError }}</Alert>
    <div class="field">
      <label for="city" class="city">Ciudad</label>
      <input id="city" type="text" placeholder="Ciudad" v-model="search.city" />
    </div>
    <div class="field">
      <label for="country" class="country">País</label>
      <select id="country" v-model="search.country">
        <option value="">-- Selecciona un país --</option>
        <option :value="country.code" v-for="country in countries" :key="country.code">
          {{ country.name }}
        </option>
      </select>
    </div>
    <input type="submit" value="Buscar" />
  </form>
</template>
