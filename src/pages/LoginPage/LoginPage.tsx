import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../auth/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      await login(email, password);

      navigate("/projects");
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      if (axios.isAxiosError(error)) {
        console.error("Response:", error.response);
        console.error("Status:", error.response?.status);
        console.error("Data:", error.response?.data);

        if (error.response?.status === 401) {
          setError("Invalid email or password.");
        } else if (!error.response) {
          setError("Cannot connect to the backend.");
        } else {
          setError("Login failed.");
        }
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        {error && <p>{error}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
