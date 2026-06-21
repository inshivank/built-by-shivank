"use client";

import { Activity, AlertTriangle, MessageSquare, Search, ShoppingBag, Terminal, ShieldAlert, CloudRain, Sun, Crop, Undo2, Download, Image as ImageIcon, Layout } from "lucide-react";

interface ProjectPreviewProps {
  slug: string;
}

export function ProjectPreview({ slug }: ProjectPreviewProps) {
  switch (slug) {
    case "college-marketplace":
      return <MarketplacePreview />;
    case "adaptive-cyber-threat-detection":
      return <ThreatDetectionPreview />;
    case "hate-speech-detection":
      return <HateSpeechPreview />;
    case "weather-application":
      return <WeatherPreview />;
    case "image-editor":
      return <ImageEditorPreview />;
    case "portfolio-website":
      return <PortfolioPreview />;
    default:
      return <div className="h-full w-full bg-secondary/50 rounded-xl" />;
  }
}

/* College Marketplace Mockup */
function MarketplacePreview() {
  const items = [
    { title: "MacBook Pro M2", price: "$850", location: "JUIT Hostels", offer: "Pending Bid: $800" },
    { title: "Sony WH-1000XM4", price: "$180", location: "Academic Block", offer: "Negotiating" },
    { title: "Calculus Textbook", price: "$35", location: "Library Lounge", offer: null },
  ];

  return (
    <div className="relative h-full w-full bg-[#0d0d10] p-4 flex flex-col gap-3 font-sans overflow-hidden">
      {/* Visual Header */}
      <div className="flex items-center justify-between border-b border-border/40 pb-2">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 text-blue-500" />
          <span className="text-xs font-bold tracking-wide text-foreground">CampuStore</span>
        </div>
        <div className="relative w-1/3">
          <Search className="absolute left-2 top-1.5 h-3 w-3 text-muted-foreground" />
          <div className="w-full h-5 rounded-md bg-secondary/60 border border-border/40 px-6 text-[9px] text-muted-foreground flex items-center">
            Search campustore...
          </div>
        </div>
      </div>

      {/* Categories chips */}
      <div className="flex gap-2">
        {["Electronics", "Textbooks", "Housing", "Tickets"].map((cat, i) => (
          <div
            key={cat}
            className={`px-2 py-0.5 rounded-full text-[9px] font-medium border ${
              i === 0
                ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                : "bg-secondary border-border/40 text-muted-foreground"
            }`}
          >
            {cat}
          </div>
        ))}
      </div>

      {/* Grid of Listings */}
      <div className="grid grid-cols-1 gap-2 flex-1 overflow-hidden">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-2.5 rounded-xl border border-border/40 bg-card/60 shadow-sm"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-bold text-foreground">{item.title}</span>
              <span className="text-[9px] text-muted-foreground">📍 {item.location}</span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs font-extrabold text-blue-400">{item.price}</span>
              {item.offer ? (
                <span className="text-[8px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/15 animate-pulse">
                  {item.offer}
                </span>
              ) : (
                <span className="text-[8px] px-1.5 py-0.5 bg-secondary text-muted-foreground rounded-md border border-border/40">
                  Fixed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Threat Detection Mockup */
function ThreatDetectionPreview() {
  return (
    <div className="relative h-full w-full bg-[#09090b] p-4 flex flex-col gap-3 font-sans overflow-hidden">
      {/* Monitor Header */}
      <div className="flex items-center justify-between border-b border-border/40 pb-2">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-amber-500" />
          <span className="text-xs font-bold text-foreground">CyberScan Anomaly Engine</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-md text-[9px] font-bold">
          <ShieldAlert className="h-3 w-3 animate-bounce" />
          <span>Anomaly Warning</span>
        </div>
      </div>

      {/* Network Nodes Viewport */}
      <div className="flex-1 border border-border/40 rounded-xl relative bg-[#0c0c0f] flex items-center justify-center overflow-hidden">
        {/* SVG Network Graph */}
        <svg className="absolute inset-0 w-full h-full p-2" viewBox="0 0 100 50">
          {/* Paths connecting nodes */}
          <line x1="20" y1="25" x2="50" y2="12" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
          <line x1="20" y1="25" x2="50" y2="38" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
          <line x1="50" y1="12" x2="80" y2="25" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
          <line x1="50" y1="38" x2="80" y2="25" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
          {/* Warning line */}
          <line
            x1="50" y1="12"
            x2="50"
            y2="38"
            stroke="var(--color-brand, #3b82f6)"
            strokeWidth="0.8"
            strokeDasharray="2, 2"
            className="animate-pulse"
          />

          {/* Central gateway */}
          <circle cx="20" cy="25" r="3" fill="#3B82F6" className="animate-pulse" />
          <text x="18" y="32" fill="#888" fontSize="3" textAnchor="middle">Gateway</text>

          {/* Host node */}
          <circle cx="50" cy="12" r="2.5" fill="#10B981" />
          <text x="50" y="7" fill="#888" fontSize="3" textAnchor="middle">AppSrv-1</text>

          {/* Targeted Database node */}
          <circle cx="50" cy="38" r="2.8" fill="#F59E0B" className="animate-ping opacity-75" />
          <circle cx="50" cy="38" r="2.5" fill="#EF4444" />
          <text x="50" y="45" fill="#EF4444" fontSize="3" fontWeight="bold" textAnchor="middle">DB-Anomaly</text>

          {/* Client node */}
          <circle cx="80" cy="25" r="2.5" fill="#10B981" />
          <text x="82" y="30" fill="#888" fontSize="3">Host-Client</text>
        </svg>

        {/* Small warning popup overlay */}
        <div className="absolute bottom-2 right-2 p-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-[8px] font-mono text-red-400 max-w-[120px] shadow-sm">
          🚨 Anomaly detected: DB-2 Port Scan from 10.2.45.8
        </div>
      </div>

      {/* Terminal log output */}
      <div className="h-[38px] bg-black border border-border/40 rounded-lg p-1.5 font-mono text-[8px] text-zinc-500 flex items-center gap-1.5">
        <Terminal className="h-3 w-3 text-amber-500" />
        <span className="truncate flex-1">
          [WARN] 12:51:20: Port SCAN check flag triggered at DB-Node... isolation script active.
        </span>
      </div>
    </div>
  );
}

/* Hate Speech Detection Mockup */
function HateSpeechPreview() {
  return (
    <div className="relative h-full w-full bg-[#0c0c0e] p-4 flex flex-col gap-3 font-sans overflow-hidden">
      {/* Moderation Header */}
      <div className="flex items-center justify-between border-b border-border/40 pb-2">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-purple-500" />
          <span className="text-xs font-bold text-foreground">SentMod AI Moderator</span>
        </div>
        <div className="text-[9px] text-muted-foreground border border-border/60 rounded px-1.5 py-0.5 bg-secondary/50">
          NLP Model: BERT-toxic
        </div>
      </div>

      {/* Message Chat Queue */}
      <div className="flex-1 flex flex-col gap-2 overflow-hidden">
        {/* Chat bubble 1 */}
        <div className="p-2 rounded-xl border border-border/30 bg-card/60 flex items-start justify-between gap-3 max-w-[90%]">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-semibold text-purple-400">User_Alpha</span>
            <span className="text-[10px] text-foreground">Hey, could we check the code updates tomorrow morning?</span>
          </div>
          <span className="text-[8px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/15 px-1.5 py-0.5 rounded-md self-center">
            Clean 99%
          </span>
        </div>

        {/* Chat bubble 2 (Flagged) */}
        <div className="p-2 rounded-xl border border-red-500/25 bg-red-950/10 flex items-start justify-between gap-3 max-w-[90%]">
          <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-semibold text-red-400">Spammer_Omega</span>
            <p className="text-[10px] text-foreground">
              You are completely useless, <mark className="bg-red-500/20 text-red-200 border-b border-red-500/35 rounded-sm px-0.5">go delete your account</mark> immediately.
            </p>
          </div>
          <div className="flex flex-col items-center gap-1 self-center shrink-0">
            <span className="text-[8px] font-bold text-red-400 bg-red-500/10 border border-red-500/15 px-1.5 py-0.5 rounded-md">
              Harass 89%
            </span>
            <AlertTriangle className="h-3 w-3 text-red-500" />
          </div>
        </div>
      </div>

      {/* Stats bar indicator */}
      <div className="flex items-center justify-between text-[8px] font-mono text-zinc-500 pt-1 border-t border-border/20">
        <span>Queue: 1 pending</span>
        <span>Accuracy: 98.4%</span>
      </div>
    </div>
  );
}

/* Weather Application Mockup */
function WeatherPreview() {
  return (
    <div className="relative h-full w-full bg-[#0a0f1d] p-4 flex flex-col gap-3 font-sans overflow-hidden">
      {/* Weather Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <div className="flex items-center gap-2">
          <CloudRain className="h-4 w-4 text-sky-400" />
          <span className="text-xs font-bold text-foreground">Skyline Weather</span>
        </div>
        <span className="text-[9px] text-sky-300 font-semibold px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20">
          JUIT Solan
        </span>
      </div>

      {/* Main Grid Forecast */}
      <div className="flex-1 flex gap-3.5 items-stretch min-h-0">
        {/* Current Widget (60%) */}
        <div className="w-[55%] rounded-xl bg-white/[0.02] border border-white/5 p-3 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold text-foreground tracking-tighter">68°F</span>
              <span className="text-[9px] text-muted-foreground">Scattered Showers</span>
            </div>
            <Sun className="h-7 w-7 text-amber-400 animate-spin" style={{ animationDuration: "12s" }} />
          </div>
          <div className="grid grid-cols-2 gap-1.5 pt-2">
            <div className="bg-white/[0.02] border border-white/5 rounded-lg p-1 text-[8px] text-zinc-400">
              Wind: <span className="text-foreground font-bold">12mph</span>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-lg p-1 text-[8px] text-zinc-400">
              Humid: <span className="text-foreground font-bold">78%</span>
            </div>
          </div>
        </div>

        {/* Hourly Spline Chart (45%) */}
        <div className="flex-1 rounded-xl bg-white/[0.02] border border-white/5 p-2.5 flex flex-col justify-between">
          <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-wider">Hourly Rain (ml)</span>
          <div className="flex-1 flex items-end">
            <svg className="w-full h-full min-h-[35px]" viewBox="0 0 100 30" preserveAspectRatio="none">
              <path d="M 0 30 Q 25 10 50 18 T 100 5 L 100 30 Z" fill="rgba(56, 189, 248, 0.15)" />
              <path d="M 0 30 Q 25 10 50 18 T 100 5" fill="none" stroke="#38bdf8" strokeWidth="1" />
            </svg>
          </div>
          <div className="flex justify-between text-[7px] text-zinc-500 font-mono">
            <span>2PM</span>
            <span>4PM</span>
            <span>6PM</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Image Editor Mockup */
function ImageEditorPreview() {
  return (
    <div className="relative h-full w-full bg-[#121215] p-4 flex flex-col gap-3 font-sans overflow-hidden">
      {/* Editor Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <div className="flex items-center gap-2">
          <Crop className="h-4 w-4 text-zinc-400" />
          <span className="text-xs font-bold text-foreground">PixelStudio</span>
        </div>
        <div className="flex gap-2">
          <Undo2 className="h-3.5 w-3.5 text-muted-foreground cursor-default" />
          <Download className="h-3.5 w-3.5 text-brand cursor-default" />
        </div>
      </div>

      {/* Workspace Area */}
      <div className="flex-1 flex gap-3 min-h-0">
        {/* Image Canvas Panel (70%) */}
        <div className="flex-1 rounded-xl border border-white/5 bg-black/60 relative flex items-center justify-center p-4">
          {/* Crop guides */}
          <div className="absolute inset-4 border border-dashed border-brand/40 rounded-lg flex items-center justify-center pointer-events-none">
            <ImageIcon className="h-8 w-8 text-zinc-700" />
          </div>
          <span className="absolute bottom-2 left-2 text-[8px] font-mono text-zinc-500">1080 x 1080px</span>
        </div>

        {/* Adjustments control column (30%) */}
        <div className="w-[100px] shrink-0 flex flex-col justify-between py-1.5">
          {[
            { label: "Brightness", val: "78%" },
            { label: "Contrast", val: "42%" },
            { label: "Saturation", val: "120%" },
          ].map((slider) => (
            <div key={slider.label} className="flex flex-col gap-1">
              <div className="flex justify-between text-[8px] text-zinc-400 font-semibold">
                <span>{slider.label}</span>
                <span>{slider.val}</span>
              </div>
              <div className="h-1 w-full bg-zinc-800 rounded-full relative">
                <div
                  className="h-full bg-brand rounded-full"
                  style={{ width: slider.val }}
                />
                <div
                  className="absolute h-2 w-2 bg-white rounded-full -top-0.5 -translate-x-1/2 shadow"
                  style={{ left: slider.val }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Portfolio Website Mockup */
function PortfolioPreview() {
  return (
    <div className="relative h-full w-full bg-[#09090b] p-4 flex flex-col gap-3 font-sans overflow-hidden">
      {/* Mini Mock Browser shell */}
      <div className="flex items-center gap-1.5 pb-2 border-b border-white/5">
        <div className="h-2 w-2 rounded-full bg-red-500/40" />
        <div className="h-2 w-2 rounded-full bg-yellow-500/40" />
        <div className="h-2 w-2 rounded-full bg-green-500/40" />
        <div className="flex-1 h-3.5 rounded bg-[#17171b] border border-white/5 px-2 text-[8px] text-zinc-500 flex items-center">
          builtbyshivank.com
        </div>
      </div>

      {/* Mini Homepage content */}
      <div className="flex-1 flex flex-col gap-3 p-1 bg-[#09090b]">
        {/* Navigation Mock */}
        <div className="flex items-center justify-between border-b border-white/5 pb-1">
          <span className="text-[8px] font-bold text-foreground">Built by Shivank</span>
          <div className="flex gap-2 text-[6px] text-zinc-500 font-mono">
            <span>Work</span>
            <span>Journey</span>
            <span>About</span>
          </div>
        </div>

        {/* Hero Mock */}
        <div className="flex flex-col gap-1.5 pt-1.5">
          <div className="h-1 w-1/3 bg-brand/30 rounded-full" />
          <div className="h-3.5 w-3/4 bg-white/10 rounded-md" />
          <div className="h-2.5 w-1/2 bg-white/10 rounded-md" />
          <div className="flex gap-1.5 mt-1">
            <div className="h-3 w-10 bg-white rounded-md" />
            <div className="h-3 w-12 border border-white/10 rounded-md" />
          </div>
        </div>

        {/* Visual Laptop Mockup Frame */}
        <div className="flex-1 border border-white/5 rounded-lg bg-[#17171b]/80 flex items-center justify-center p-2 relative shadow-inner">
          <Layout className="h-4 w-4 text-brand/40 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-radial from-brand/5 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
