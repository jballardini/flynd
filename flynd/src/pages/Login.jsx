import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const match = users.find(
      (u) => u.email === form.email && u.password === form.password
    );
    if (match) {
      localStorage.setItem("currentUser", JSON.stringify(match));
      navigate("/");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="input"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
          className="input"
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Ingresar
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        ¿No tenés cuenta?{" "}
        <Link to="/register" className="text-blue-600 underline">
          Registrate acá
        </Link>
      </p>
    </div>
  );
}
