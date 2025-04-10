import React from "react";
import "./Auth.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <main id="auth">
        <AuthLeft />
        {children}
      </main>
    </>
  );
}

const AuthLeft = () => {
  return (
    <div className="auth-left">
      <div className="auth-left-container">
        <p className="auth-text">
          Start learning <br />
          <span>
            with <span className="highlighted-text">MSCSC</span>
          </span>
        </p>
      </div>
    </div>
  );
};
