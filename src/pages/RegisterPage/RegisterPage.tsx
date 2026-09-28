import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { register } from "../../api/auth.api";

const initialForm = {
  name: "",
  description: "",
  email: "",
  department: "",
  jobTitle: "",
  password: "",
};

export default function RegisterPage() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function updateField(field: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await register({ ...form, statusId: 1 });
      setIsSubmitted(true);
    } catch (requestError) {
      if (axios.isAxiosError(requestError) && requestError.response?.status === 409) {
        setError("An account already exists for this email address.");
      } else if (!axios.isAxiosError(requestError) || !requestError.response) {
        setError("Cannot connect to the backend. Please try again shortly.");
      } else {
        setError("We could not create the account. Check every field and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="login-page register-page">
      <section className="login-intro" aria-label="Project Manager">
        <Link className="login-brand" to="/login">
          <span className="login-brand-mark" aria-hidden="true">PM</span>
          <span>Project Manager</span>
        </Link>

        <div className="login-intro-copy">
          <p className="login-eyebrow">Start with a clear plan</p>
          <h1>Give your next project a steady start.</h1>
          <p>
            Set up your workspace once, then make every task, deadline, and
            decision easier to follow.
          </p>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-card register-card">
          {isSubmitted ? (
            <div className="registration-success" role="status">
              <p className="login-eyebrow">Account created</p>
              <h2>You&apos;re ready to sign in.</h2>
              <p>Your account is active. Use your email and password to enter the workspace.</p>
              <Link className="login-submit success-link" to="/login">Go to sign in</Link>
            </div>
          ) : (
            <>
              <div className="login-heading">
                <p className="login-eyebrow">Create your account</p>
                <h2>Set up your workspace</h2>
                <p>Every field helps keep project ownership clear.</p>
              </div>

              <form className="login-form registration-form" onSubmit={handleSubmit}>
                <div className="login-field">
                  <label htmlFor="name">Full name</label>
                  <input id="name" value={form.name} onChange={(event) => updateField("name", event.target.value)} autoComplete="name" placeholder="Jane Smith" pattern="[A-Za-z ]+" required />
                </div>
                <div className="login-field">
                  <label htmlFor="email">Email address</label>
                  <input id="email" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} autoComplete="email" placeholder="jane@company.com" required />
                </div>
                <div className="login-field">
                  <label htmlFor="department">Department</label>
                  <input id="department" value={form.department} onChange={(event) => updateField("department", event.target.value)} placeholder="Product" required />
                </div>
                <div className="login-field">
                  <label htmlFor="jobTitle">Job title</label>
                  <input id="jobTitle" value={form.jobTitle} onChange={(event) => updateField("jobTitle", event.target.value)} placeholder="Product manager" required />
                </div>
                <div className="login-field registration-description">
                  <label htmlFor="description">Short description</label>
                  <input id="description" value={form.description} onChange={(event) => updateField("description", event.target.value)} placeholder="What you work on" required />
                </div>
                <div className="login-field registration-password">
                  <label htmlFor="password">Password</label>
                  <input id="password" type="password" value={form.password} onChange={(event) => updateField("password", event.target.value)} autoComplete="new-password" placeholder="8+ characters" minLength={8} required />
                  <span className="password-hint">Use upper- and lowercase letters, a number, and a symbol.</span>
                </div>

                {error && <p className="login-error registration-error" role="alert">{error}</p>}

                <button className="login-submit" type="submit" disabled={isLoading}>
                  {isLoading ? "Creating account…" : "Create account"}
                </button>
                <p className="login-alternate">Already have an account? <Link to="/login">Sign in</Link></p>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
