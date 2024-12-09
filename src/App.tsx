import { useEffect, useRef, useState } from "react";
import { getSettlementData, getSettlementWeather, guessCity } from "./service/api";

function App() {
  const cityName = useRef<HTMLInputElement>(null);
  const [cityForecast, setCityForecast] = useState<any | undefined>(undefined);
  // const [displayModal, setDisplayModal] = useState(null);

  const handleShowForecast = async (cityName: string) => {
    try {
      if (cityName.length < 1) return;

      const settlementData = await getSettlementData(cityName);
      const { lat, lon, ...rest } = settlementData[0];

      const forecast = await getSettlementWeather({ lat, lon });

      setCityForecast(forecast);
      console.log(forecast);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getCityName = async () => {
      const result = await guessCity();
      await handleShowForecast(result.city);
    };

    getCityName();
  }, []);

  return (
    <>
      <div className="bg-slate-500">
        <input type="text" ref={cityName} />

        <button
          onClick={() => {
            handleShowForecast(cityName.current?.value || "");
          }}>
          Отобразить прогноз
        </button>

        {cityForecast && <h1>Погода в {cityForecast?.city?.name}</h1>}

        <div className="w-full">
          {cityForecast?.list.map((forecast, index) => (
            <div key={index} className="flex flex-row items-center">
              <p>{forecast["dt_txt"]}</p>
              <p>{forecast["main"]["temp"]}</p>
              <img
                src={`https://openweathermap.org/img/wn/${forecast["weather"]["0"]["icon"]}@2x.png`}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
