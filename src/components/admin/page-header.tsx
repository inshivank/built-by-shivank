interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: "28px",
        gap: "16px",
        flexWrap: "wrap",
      }}
    >
      <div>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "#FAFAFA",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h2>
        {description && (
          <p
            style={{
              fontSize: "14px",
              color: "#A1A1AA",
              margin: "6px 0 0",
              lineHeight: 1.5,
            }}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
