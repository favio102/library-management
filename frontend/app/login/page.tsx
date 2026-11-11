"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiArrowLeftLine, RiLockLine } from "react-icons/ri";
import { CustomButton } from "@/components";
import { useAuth } from "@/context/AuthContext";

/* Single admin password. On success the server sets an httpOnly cookie and
 * the add / edit / remove controls appear across the site. */
const LoginPage = () => {
  const router = useRouter();
  const { isAdmin, login } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAdmin) router.replace("/");
  }, [isAdmin, router]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!password) {
      setError("Enter the admin password.");
      return;
    }
    setSubmitting(true);
    setError(undefined);
    try {
      await login(password);
      /* The effect above redirects once isAdmin flips. */
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Sign-in failed. Try again."
      );
      setPassword("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="shell">
      <div style={{ paddingTop: "var(--space-lg)" }}>
        <Link href="/" className="backlink">
          <RiArrowLeftLine size={15} aria-hidden="true" />
          Back to the catalogue
        </Link>
      </div>

      <section
        className="sect sect--tight"
        aria-labelledby="login-heading"
        style={{ maxWidth: "26rem" }}
      >
        <div className="sect__head">
          <h1 id="login-heading" className="sect__title">
            Admin sign-in
          </h1>
          <p className="sect__note">
            Anyone can read the catalogue. Adding, editing and removing books
            needs the admin password.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* CustomInput renders type="text"; a password field needs to be
              masked, so this one is written out with the same classes. */}
          <div className="field">
            <label className="field__label" htmlFor="admin-password">
              Password
            </label>
            <div className="field__control">
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="input"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={Boolean(error) || undefined}
                aria-describedby="admin-password-help"
                autoFocus
              />
            </div>
            <p
              id="admin-password-help"
              className={`field__help ${error ? "field__help--error" : ""}`.trim()}
              role={error ? "alert" : undefined}
            >
              {error ?? ""}
            </p>
          </div>

          <div className="form__actions">
            <CustomButton
              title="Sign in"
              tone="primary"
              btnType="submit"
              icon={<RiLockLine size={15} />}
              loading={submitting}
              loadingTitle="Signing in…"
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
