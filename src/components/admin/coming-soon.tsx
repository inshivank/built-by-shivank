import { Construction } from "lucide-react";

interface ComingSoonProps {
  feature?: string;
}

export function ComingSoon({ feature }: ComingSoonProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        textAlign: "center",
        gap: "16px",
      }}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "16px",
          background: "rgba(59,130,246,0.1)",
          border: "1px solid rgba(59,130,246,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Construction size={28} color="#3B82F6" strokeWidth={1.5} />
      </div>

      <div>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#FAFAFA",
            margin: "0 0 8px",
          }}
        >
          {feature ? `${feature} — Coming Soon` : "Coming Soon"}
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "#A1A1AA",
            margin: 0,
            maxWidth: "360px",
            lineHeight: 1.6,
          }}
        >
          This section is part of Phase 3 and will allow you to manage your
          portfolio content dynamically from the database.
        </p>
      </div>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 14px",
          borderRadius: "20px",
          background: "rgba(59,130,246,0.08)",
          border: "1px solid rgba(59,130,246,0.15)",
          fontSize: "12px",
          color: "#3B82F6",
          fontWeight: 500,
        }}
      >
        Phase 3 — Frontend Data Binding
      </div>
    </div>
  );
}
