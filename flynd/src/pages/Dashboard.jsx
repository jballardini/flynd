import FlightAlertForm from "../components/FlightAlertForm";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <div className="flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold">Hola, {currentUser.email}</h1>
        <button onClick={logout} className="text-sm text-red-600">
          Cerrar sesión
        </button>
      </div>
      <FlightAlertForm />
    </div>
  );
}
