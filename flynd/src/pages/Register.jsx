import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find((u) => u.email === form.email);
    if (exists) {
      alert("El usuario ya existe");
    } else {
      const updated = [...users, form];
      localStorage.setItem("users", JSON.stringify(updated));
      alert("Registro exitoso");
      navigate("/login");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Registrarse</h2>
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
        <button className="w-full bg-green-600 text-white py-2 rounded">
          Crear cuenta
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        ¿Ya tenés cuenta?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Iniciá sesión
        </Link>
      </p>
    </div>
  );
}
