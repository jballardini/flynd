import { useState } from "react";
import "./index.css";

export default function FlightAlertForm() {
  const [tripType, setTripType] = useState("oneway");

  return (
    <form className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md space-y-6 mt-10">
      <h2 className="text-2xl font-semibold text-gray-800">Crear una alerta</h2>

      <div className="flex gap-4">
        <label>
          <input
            type="radio"
            value="oneway"
            checked={tripType === "oneway"}
            onChange={() => setTripType("oneway")}
            className="mr-2"
          />
          Solo ida
        </label>
        <label>
          <input
            type="radio"
            value="roundtrip"
            checked={tripType === "roundtrip"}
            onChange={() => setTripType("roundtrip")}
            className="mr-2"
          />
          Ida y vuelta
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input type="text" placeholder="Origen" className="input" />
        <input type="text" placeholder="Destino" className="input" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600">Fecha de salida</label>
          <input type="date" className="input" />
        </div>
        {tripType === "roundtrip" && (
          <div>
            <label className="block text-sm text-gray-600">Fecha de regreso</label>
            <input type="date" className="input" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input type="number" min="1" max="9" placeholder="Pasajeros" className="input" />
        <select className="input">
          <option>Clase económica</option>
          <option>Premium económica</option>
          <option>Business</option>
          <option>Primera</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <select className="input">
          <option>Directo</option>
          <option>1 escala</option>
          <option>2 o más escalas</option>
        </select>
        <input type="number" placeholder="Duración máxima (h)" className="input" />
        <input type="number" placeholder="Precio de referencia" className="input" />
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
        Crear alerta
      </button>
    </form>
  );
}
