import { useState } from "react";
import { useLoginMutation } from "../api/authApi";

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(form).unwrap();
      window.location.href = "/pokemon"; // ← redirection finale
    } catch {
      alert("Identifiants incorrects");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
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
      <button disabled={isLoading}>Se connecter</button>
    </form>
  );
}