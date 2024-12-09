import { serializeDate, serializeTime } from "../service/serializeDateTime";

type props = {
  isOpen: boolean;
  onClose: () => void;
  forecast: any;
};

const WeatherModal = ({ isOpen, onClose, forecast }: props) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-lg bg-gray-800 p-2 text-gray-300">
        <div className="flex flex-col items-center rounded-lg border border-gray-700 bg-gray-800 md:max-w-xl md:flex-row">
          <img
            className="w-full rounded-t-lg object-cover md:h-auto md:w-12 md:rounded-none md:rounded-s-lg"
            src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />

          <div className="flex flex-col justify-between p-4 leading-normal">
            <p className="text-xl font-semibold">{serializeDate(forecast.dt)}</p>
            <p>{serializeTime(forecast.dt)}</p>
            <div>
              <p>{forecast["weather"][0]["description"]}</p>
              <p>
                Температура: {forecast["main"]["temp"]} °C, ощущается как{" "}
                {forecast["main"]["feels_like"]}
              </p>
              <p>Влажность: {forecast["main"]["humidity"]}%</p>
              <p>Ветер: {forecast["wind"]["speed"]} км/ч</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherModal;
