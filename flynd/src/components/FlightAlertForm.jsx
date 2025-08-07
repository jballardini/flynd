import { useState, useEffect } from "react";

export default function FlightAlertForm() {
  const [tripType, setTripType] = useState("oneway");
  const [alerts, setAlerts] = useState([]);

  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
    travelClass: "Económica",
    stops: "Directo",
    duration: "",
    price: ""
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("alerts") || "[]");
    setAlerts(stored);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAlert = { ...formData, tripType };
    const updated = [...alerts, newAlert];
    localStorage.setItem("alerts", JSON.stringify(updated));
    setAlerts(updated);
    alert("Alerta creada correctamente");
  };

  const handleDeleteAlert = (index) => {
    const updated = alerts.filter((_, i) => i !== index);
    setAlerts(updated);
    localStorage.setItem("alerts", JSON.stringify(updated));
  };

  return (
    <div className="mt-10 p-6 bg-white shadow rounded-md space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Crear una alerta</h2>

        <div className="flex gap-4">
          <label>
            <input type="radio" value="oneway" checked={tripType === "oneway"} onChange={() => setTripType("oneway")} className="mr-2" />
            Solo ida
          </label>
          <label>
            <input type="radio" value="roundtrip" checked={tripType === "roundtrip"} onChange={() => setTripType("roundtrip")} className="mr-2" />
            Ida y vuelta
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="origin" placeholder="Origen" className="input" onChange={handleChange} />
          <input type="text" name="destination" placeholder="Destino" className="input" onChange={handleChange} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="date" name="departureDate" className="input" onChange={handleChange} />
          {tripType === "roundtrip" && (
            <input type="date" name="returnDate" className="input" onChange={handleChange} />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input type="number" name="passengers" min="1" max="9" placeholder="Pasajeros" className="input" onChange={handleChange} />
          <select name="travelClass" className="input" onChange={handleChange}>
            <option>Económica</option>
            <option>Premium Económica</option>
            <option>Business</option>
            <option>Primera</option>
          </select>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <select name="stops" className="input" onChange={handleChange}>
            <option>Directo</option>
            <option>1 escala</option>
            <option>2 o más escalas</option>
          </select>
          <input type="number" name="duration" placeholder="Duración máxima (h)" className="input" onChange={handleChange} />
          <input type="number" name="price" placeholder="Precio de referencia" className="input" onChange={handleChange} />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
          Crear alerta
        </button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mt-8 mb-4">Mis alertas</h3>
        {alerts.length === 0 ? (
          <p className="text-gray-500">No hay alertas guardadas.</p>
        ) : (
          <ul className="space-y-2">
            {alerts.map((a, i) => (
              <li key={i} className="flex justify-between items-center border p-4 rounded bg-gray-50 text-sm">
                <div>
                  ✈️ {a.origin} → {a.destination} | {a.tripType === "roundtrip" ? `Ida: ${a.departureDate} / Vuelta: ${a.returnDate}` : `Salida: ${a.departureDate}`} | Max: ${a.price}
                </div>
                <button onClick={() => handleDeleteAlert(i)} className="text-red-500 hover:text-red-700 text-xs ml-4">
                  🗑 Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
