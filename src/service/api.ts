const baseWeatherApiUrl = "http://api.openweathermap.org";
const weaterApi = "611df2fdca75ebaccf7c781e9fa1df2b";
const baseGeoGuessApiUrl = "http://ipinfo.io";
const geoGeoGuessApi = "337355e36fdd3c";

export const guessCity = async () => {
  const response = await fetch(`${baseGeoGuessApiUrl}/?token=${geoGeoGuessApi}`);

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
  return await response.json();
};

export const getSettlementData = async (placeName: string) => {
  const response = await fetch(
    `${baseWeatherApiUrl}/geo/1.0/direct?q=${placeName}&limit=1&appid=${weaterApi}`,
  );

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
  return await response.json();
};

export const getSettlementWeather = async ({ lat, lon }: { lat: number; lon: number }) => {
  const response = await fetch(
    `${baseWeatherApiUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weaterApi}&units=metric&lang=ru`,
  );

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }

  return await response.json();
};
