import { computed, ref } from 'vue';
import axios from 'axios';

export default function useWeather() {
  const weather = ref({});
  const isLoading = ref(false);
  const isError = ref('');

  const getWeather = async ({ city, country }) => {
    const apiKey = import.meta.env.VITE_API_KEY;

    isLoading.value = true;
    weather.value = {};
    isError.value = '';
    try {
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${apiKey}`;
      const { data } = await axios.get(url);
      const { lat, lon } = data[0];

      // consultar el clima
      const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const { data: weatherData } = await axios.get(urlWeather);
      weather.value = weatherData;
    } catch (error) {
      console.log('Error: ', error);
      isError.value = 'Hubo un error, intenta de nuevo. Ciudad no encontrada';
    } finally {
      isLoading.value = false;
    }
  };

  const showWeather = computed(() => Object.values(weather.value).length > 0);

  const formatterTemp = (temp) => parseInt(temp - 273.15);

  return {
    getWeather,
    showWeather,
    weather,
    formatterTemp,
    isLoading,
    isError,
  };
}
