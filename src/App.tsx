import { useEffect, useRef, useState } from "react";
import { getSettlementData, getSettlementWeather, guessCity } from "./service/api";
import { serializeDate, serializeTime } from "./service/serializeDateTime";
import WeatherModal from "./components/WeatherModal";
import Toast, { handleError, handleSuccess } from "./components/Toast";

function App() {
  const cityName = useRef<HTMLInputElement>(null);
  const [cityForecast, setCityForecast] = useState<any | undefined>(undefined);

  const [forecast, setForecast] = useState<any | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleShowForecast = async (cityName: string) => {
    try {
      if (cityName.length < 1) {
        return handleError("Укажите хоть какое-нибудь название города");
      }

      const settlementData = await getSettlementData(cityName);

      // console.log(settlementData.length);

      if (settlementData.length < 1) {
        return handleError("Город не найден");
      }

      const { lat, lon, ...rest } = settlementData[0];

      const forecast = await getSettlementWeather({ lat, lon });

      setCityForecast(forecast);
      console.log(forecast);
    } catch (e) {
      handleError("Произошла непредвиденная ошибка. Попробуйте позже.");
      console.log(e);
    }
  };

  const handleOpenModal = (forecast: any) => {
    setForecast(forecast);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    const getCityName = async () => {
      const result = await guessCity();
      await handleShowForecast(result.city);
    };

    getCityName();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-2 bg-gradient-to-b from-cyan-700 to-blue-900 p-2">
      {cityForecast && (
        <h1 className="text-2xl font-bold text-gray-200">
          Прогноз погоды в городе {cityForecast?.city?.name}
        </h1>
      )}

      {!cityForecast && <h1 className="text-2xl font-bold text-gray-200">Прогноз погоды</h1>}

      <div className="relative w-72">
        <input
          type="text"
          className="ease w-full rounded-md border border-slate-200 bg-transparent py-2 pl-3 pr-20 text-sm text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none"
          placeholder="Укажите город"
          ref={cityName}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleShowForecast(cityName.current?.value || "");
            }
          }}
        />
        <button
          className="absolute right-1 top-1 rounded border border-transparent bg-slate-800 px-2.5 py-1 text-center text-sm text-white shadow-sm transition-all hover:bg-slate-700 hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={() => {
            handleShowForecast(cityName.current?.value || "");
          }}>
          Узнать прогноз
        </button>
      </div>

      <div className="flex w-72 flex-col gap-2">
        {cityForecast?.list.map((forecast, index) => (
          <div
            key={index}
            className="flex cursor-pointer flex-col items-center rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-700 md:max-w-xl md:flex-row"
            onClick={() => handleOpenModal(forecast)}>
            <img
              className="w-full rounded-t-lg object-cover md:h-auto md:w-12 md:rounded-none md:rounded-s-lg"
              src={`https://openweathermap.org/img/wn/${forecast["weather"]["0"]["icon"]}@2x.png`}
              alt=""
            />

            <div className="flex flex-col justify-between p-4 leading-normal text-gray-300">
              <p className="weig text-xl font-semibold">{serializeDate(forecast["dt"])}</p>
              <p>{serializeTime(forecast["dt"])}</p>
              <div>
                <p className="">Температура: {forecast["main"]["temp"]} °C</p>
                <p className="">Влажность: {forecast["main"]["humidity"]}%</p>
                <p className="">Ветер: {forecast["wind"]["speed"]} км/ч</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <WeatherModal isOpen={isModalOpen} onClose={handleCloseModal} forecast={forecast} />

      <Toast />
    </div>
  );
}

export default App;
