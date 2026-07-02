import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  accentColor?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  accentColor = "#3B82F6",
}: StatCardProps) {
  return (
    <div
      style={{
        background: "#17171B",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        transition: "border-color 0.15s, box-shadow 0.15s",
      }}
      className="stat-card"
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            color: "#A1A1AA",
            fontWeight: 500,
          }}
        >
          {title}
        </div>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            background: `${accentColor}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={16} color={accentColor} strokeWidth={2} />
        </div>
      </div>

      <div
        style={{
          fontSize: "28px",
          fontWeight: 700,
          color: "#FAFAFA",
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        {value}
      </div>

      {trend && (
        <div
          style={{
            fontSize: "11px",
            color: trendUp ? "#22C55E" : "#A1A1AA",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          {trend}
        </div>
      )}
    </div>
  );
}
