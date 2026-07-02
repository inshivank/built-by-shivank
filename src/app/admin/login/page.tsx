"use client";

import { useActionState } from "react";
import { login } from "@/actions/auth";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        background: "#09090B",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Card */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "380px",
          background: "#17171B",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding: "36px 32px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* Icon */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              background: "rgba(59,130,246,0.12)",
              border: "1px solid rgba(59,130,246,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Lock size={22} color="#3B82F6" strokeWidth={1.8} />
          </div>
        </div>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h1
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#FAFAFA",
              margin: "0 0 6px",
              letterSpacing: "-0.02em",
            }}
          >
            Admin Access
          </h1>
          <p style={{ fontSize: "13px", color: "#A1A1AA", margin: 0 }}>
            Built by Shivank — CMS
          </p>
        </div>

        {/* Form */}
        <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              htmlFor="email"
              style={{ fontSize: "12px", fontWeight: 500, color: "#A1A1AA" }}
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="admin@shivank.dev"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                color: "#FAFAFA",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              htmlFor="password"
              style={{ fontSize: "12px", fontWeight: 500, color: "#A1A1AA" }}
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                color: "#FAFAFA",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
            />
          </div>

          {/* Error */}
          {state?.error && (
            <div
              style={{
                padding: "10px 12px",
                borderRadius: "8px",
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)",
                fontSize: "13px",
                color: "#FCA5A5",
              }}
            >
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            style={{
              width: "100%",
              padding: "11px",
              borderRadius: "8px",
              border: "none",
              background: pending
                ? "rgba(59,130,246,0.5)"
                : "#3B82F6",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              cursor: pending ? "not-allowed" : "pointer",
              transition: "background 0.15s, opacity 0.15s",
              marginTop: "4px",
            }}
          >
            {pending ? "Signing in…" : "Sign In"}
          </button>
        </form>

        {/* Footer hint */}
        <p
          style={{
            textAlign: "center",
            fontSize: "11px",
            color: "rgba(161,161,170,0.5)",
            margin: "20px 0 0",
          }}
        >
          This page is not publicly linked.
        </p>
      </div>
    </div>
  );
}
