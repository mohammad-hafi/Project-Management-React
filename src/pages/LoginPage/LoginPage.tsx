import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../auth/useAuth";

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
    <main className="login-page">
      <section className="login-intro" aria-label="Project Manager">
        <Link className="login-brand" to="/login">
          <span className="login-brand-mark" aria-hidden="true">PM</span>
          <span>Project Manager</span>
        </Link>

        <div className="login-intro-copy">
          <p className="login-eyebrow">One workspace. Clear progress.</p>
          <h1>Keep every project moving forward.</h1>
          <p>
            Plan the work, see what matters, and keep your team aligned from
            the first brief to the final handoff.
          </p>
        </div>

        <div className="login-plan" aria-hidden="true">
          <div className="login-plan-header">
            <span>Today&apos;s plan</span>
            <span>3 active</span>
          </div>
          <div className="login-plan-row">
            <span className="login-plan-dot dot-blue" />
            <span>Product launch</span>
            <i className="login-plan-track track-blue" />
          </div>
          <div className="login-plan-row">
            <span className="login-plan-dot dot-mint" />
            <span>Research review</span>
            <i className="login-plan-track track-mint" />
          </div>
          <div className="login-plan-row">
            <span className="login-plan-dot dot-gold" />
            <span>Client handoff</span>
            <i className="login-plan-track track-gold" />
          </div>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-card">
          <div className="login-heading">
            <p className="login-eyebrow">Welcome back</p>
            <h2>Sign in to your workspace</h2>
            <p>Use your work email to continue.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="email">Email address</label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            {error && <p className="login-error" role="alert">{error}</p>}

            <button className="login-submit" type="submit" disabled={isLoading}>
              {isLoading ? "Signing in…" : "Sign in"}
            </button>

            <p className="login-alternate">
              Need an account? <Link to="/register">Create one</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
