import { useState } from "react";
import { useLoginMutation } from "../api/authApi";

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form).unwrap();
      window.location.href = "/profile";
    } catch (err) {
      console.error("Erreur login", err);
    }
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>Connexion</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px", width: "250px" }}
      >
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button disabled={isLoading}>
          {isLoading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}