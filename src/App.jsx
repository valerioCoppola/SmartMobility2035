import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, Legend
} from "recharts";

const COLORS = {
  orange: "#FF5F1F",
  amber: "#FFAA00",
  teal: "#00D4C8",
  red: "#FF3B3B",
  green: "#00E676",
  bg: "#0A0A0F",
  card: "#111118",
  border: "#1E1E2E",
  muted: "#4A4A6A",
  text: "#E8E8F0",
  textDim: "#8888A8",
};

const Tag = ({ children, color = "orange" }) => {
  const colors = {
    orange: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
    teal: "bg-teal-500/10 text-teal-400 border border-teal-500/20",
    amber: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    green: "bg-green-500/10 text-green-400 border border-green-500/20",
    red: "bg-red-500/10 text-red-400 border border-red-500/20",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-bold tracking-widest uppercase ${colors[color]}`}>
      {children}
    </span>
  );
};

const Stat = ({ value, label, sub, accent = "#FF5F1F", trend }) => (
  <div className="flex flex-col gap-1">
    <div className="font-black text-4xl tracking-tight" style={{ color: accent, fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
      {value}
    </div>
    <div className="text-xs font-bold uppercase tracking-widest" style={{ color: COLORS.textDim }}>{label}</div>
    {sub && <div className="text-xs" style={{ color: COLORS.textDim }}>{sub}</div>}
    {trend && <div className={`text-xs font-bold ${trend > 0 ? "text-red-400" : "text-green-400"}`}>{trend > 0 ? "▲" : "▼"} {Math.abs(trend)}%</div>}
  </div>
);

const Card = ({ children, className = "", glowColor = "" }) => (
  <div
    className={`rounded-2xl p-6 relative overflow-hidden ${className}`}
    style={{
      background: COLORS.card,
      border: `1px solid ${COLORS.border}`,
      boxShadow: glowColor ? `0 0 40px -10px ${glowColor}40` : "none"
    }}
  >
    {children}
  </div>
);

const PhaseStep = ({ phase, title, years, items, color, icon }) => (
  <div className="relative pl-8">
    <div className="absolute left-0 top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black" style={{ background: color, color: "#000" }}>
      {phase}
    </div>
    <div className="absolute left-3 top-6 bottom-0 w-px" style={{ background: `${color}30` }} />
    <div className="mb-2">
      <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color }}>{years}</div>
      <div className="font-black text-lg" style={{ color: COLORS.text, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}>{title}</div>
    </div>
    <ul className="space-y-1 mb-6">
      {items.map((item, i) => (
        <li key={i} className="text-sm flex items-start gap-2" style={{ color: COLORS.textDim }}>
          <span style={{ color }} className="mt-0.5 shrink-0">◆</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

// DATA
const vehicleData = [
  { name: "Auto private", value: 1420000, fill: COLORS.red },
  { name: "Moto/Scooter", value: 510000, fill: COLORS.orange },
  { name: "Bici (stimate)", value: 150000, fill: COLORS.teal },
  { name: "Monopattini", value: 25000, fill: COLORS.green },
  { name: "Bus/Tram ATac", value: 2300, fill: COLORS.amber },
];

const occupancyData = [
  { time: "07:00", medio: 1.1, ottimale: 4.2 },
  { time: "08:30", medio: 1.3, ottimale: 4.2 },
  { time: "10:00", medio: 1.4, ottimale: 4.2 },
  { time: "12:00", medio: 1.6, ottimale: 4.2 },
  { time: "14:00", medio: 1.5, ottimale: 4.2 },
  { time: "17:00", medio: 1.2, ottimale: 4.2 },
  { time: "19:00", medio: 1.3, ottimale: 4.2 },
  { time: "21:00", medio: 1.7, ottimale: 4.2 },
];

const projectionData = [
  { year: "2025", auto: 1420, condivisi: 20, elettrici: 45 },
  { year: "2027", auto: 1250, condivisi: 80, elettrici: 180 },
  { year: "2029", auto: 1050, condivisi: 180, elettrici: 420 },
  { year: "2031", auto: 820, condivisi: 320, elettrici: 680 },
  { year: "2033", auto: 600, condivisi: 480, elettrici: 850 },
  { year: "2035", auto: 420, condivisi: 620, elettrici: 1000 },
];

const licenseData = [
  { tipo: "Patente B (auto)", numero: 1680000, colore: COLORS.orange },
  { tipo: "Patente A (moto)", numero: 510000, colore: COLORS.amber },
  { tipo: "Solo AM (ciclomotori)", numero: 220000, colore: COLORS.teal },
  { tipo: "Patenti C/D (prof.)", numero: 95000, colore: COLORS.green },
];

const emissioniData = [
  { year: "2024", CO2: 100, PM25: 100, NOx: 100 },
  { year: "2027", CO2: 82, PM25: 78, NOx: 75 },
  { year: "2030", CO2: 58, PM25: 52, NOx: 48 },
  { year: "2033", CO2: 35, PM25: 30, NOx: 28 },
  { year: "2035", CO2: 18, PM25: 15, NOx: 14 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-4 py-3 text-xs" style={{ background: "#1a1a2e", border: `1px solid ${COLORS.border}` }}>
      <div className="font-bold mb-1" style={{ color: COLORS.text }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || p.fill }}>{p.name}: <strong>{p.value?.toLocaleString()}</strong></div>
      ))}
    </div>
  );
};

const sections = ["panoramica", "dati", "problema", "visione", "meccaniche", "roadmap", "risultati"];
const sectionLabels = ["Overview", "Dati Roma", "Il Problema", "La Visione", "Meccaniche", "Roadmap", "Risultati"];

export default function App() {
  const [activeSection, setActiveSection] = useState("panoramica");

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: COLORS.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; } 
        ::-webkit-scrollbar-track { background: #0A0A0F; }
        ::-webkit-scrollbar-thumb { background: #1E1E2E; border-radius: 2px; }
        .glow-text { text-shadow: 0 0 40px #FF5F1F60; }
        .noise { position: relative; }
        .noise::before { content: ''; position: absolute; inset: 0; opacity: 0.03; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); pointer-events: none; z-index: 0; }
      `}</style>

      {/* HEADER */}
      <div className="noise" style={{ background: "linear-gradient(135deg, #0A0A0F 0%, #0D0D1A 50%, #0A0A0F 100%)", borderBottom: `1px solid ${COLORS.border}`, position: "sticky", top: 0, zIndex: 50 }}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3">
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.orange, boxShadow: `0 0 8px ${COLORS.orange}` }} className="animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: COLORS.orange }}>Piano Strategico</span>
            </div>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.4rem, 4vw, 2rem)", letterSpacing: "0.1em", lineHeight: 1 }}>
              ROMA MOBILITÀ <span style={{ color: COLORS.orange }}>2035</span>
            </h1>
          </div>
          <nav className="flex gap-1 flex-wrap">
            {sections.map((s, i) => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className="text-xs px-3 py-1.5 rounded-full transition-all duration-200 font-bold"
                style={{
                  background: activeSection === s ? COLORS.orange : "transparent",
                  color: activeSection === s ? "#000" : COLORS.textDim,
                  border: `1px solid ${activeSection === s ? COLORS.orange : COLORS.border}`,
                }}
              >
                {sectionLabels[i]}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* =================== PANORAMICA =================== */}
        {activeSection === "panoramica" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card glowColor={COLORS.orange} className="md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <Tag>Visione 2035</Tag>
                    <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 6vw, 4rem)", letterSpacing: "0.05em", lineHeight: 1, marginTop: "0.5rem" }} className="glow-text">
                      ROMA LIBERA<br />
                      <span style={{ color: COLORS.orange }}>DALL'AUTO PRIVATA</span>
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed max-w-xl" style={{ color: COLORS.textDim }}>
                      Un sistema integrato di mobilità condivisa, elettrica e intelligente che trasforma Roma da città con 
                      <strong style={{ color: COLORS.text }}> 1 auto ogni 2 abitanti </strong> 
                      a metropoli dove lo stato garantisce mobilità efficiente per ogni esigenza — senza possedere nulla.
                    </p>
                    <div className="flex gap-3 mt-5 flex-wrap">
                      <Tag color="teal">Sharing Economy</Tag>
                      <Tag color="green">Zero Emissioni</Tag>
                      <Tag color="amber">Smart City</Tag>
                      <Tag color="orange">AI-Driven</Tag>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center gap-4 p-4 rounded-xl" style={{ background: "#0A0A0F" }}>
                    <Stat value="−820.000" label="Auto in meno sulle strade" accent={COLORS.green} />
                    <div style={{ height: 1, background: COLORS.border }} />
                    <Stat value="−68%" label="Emissioni CO₂ da trasporti" accent={COLORS.teal} />
                    <div style={{ height: 1, background: COLORS.border }} />
                    <Stat value="€2.400/anno" label="Risparmio medio per famiglia" accent={COLORS.amber} />
                  </div>
                </div>
              </Card>
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: "🚗", title: "Car Sharing Intelligente", desc: "Le auto private diventano flotta condivisa tramite app, RFID e rimborso automatico al proprietario", color: COLORS.orange },
                { icon: "⚡", title: "Ricarica & Battery Swap", desc: "Rete massiva di colonnine e stazioni di scambio rapido batteria — tempi simili al rifornimento benzina", color: COLORS.amber },
                { icon: "📱", title: "App Universale Roma", desc: "Un'unica super-app per pianificare, prenotare e pagare monopattino, bici, auto, tram e metro", color: COLORS.teal },
                { icon: "📊", title: "Monitoraggio Continuo", desc: "Sensori IoT e AI che misurano flussi, occupazione, qualità dell'aria e ottimizzano in real-time", color: COLORS.green },
              ].map((p, i) => (
                <Card key={i} className="flex flex-col gap-3" glowColor={p.color}>
                  <div className="text-3xl">{p.icon}</div>
                  <div className="font-black text-sm" style={{ color: p.color }}>{p.title}</div>
                  <p className="text-xs leading-relaxed" style={{ color: COLORS.textDim }}>{p.desc}</p>
                </Card>
              ))}
            </div>

            {/* Timeline snapshot */}
            <Card>
              <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: COLORS.textDim }}>Timeline del Piano</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { fase: "Fase 1", anni: "2025–2027", titolo: "Fondamenta", desc: "Car sharing civico, app pilota, 500 stazioni di ricarica, battery swap zone EUR/Prati", color: COLORS.orange },
                  { fase: "Fase 2", anni: "2028–2031", titolo: "Espansione", desc: "Flotta statale garantita, zone a traffico limtatissimo, parking convertiti in hub mobilità", color: COLORS.amber },
                  { fase: "Fase 3", anni: "2032–2035", titolo: "Roma 2035", desc: "Flotta parzialmente autonoma, 70% spostamenti su mezzi condivisi/pubblici, centro storico car-free", color: COLORS.green },
                ].map((f, i) => (
                  <div key={i} className="rounded-xl p-4" style={{ background: "#0A0A0F", border: `1px solid ${f.color}30` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded-full text-xs font-black flex items-center justify-center" style={{ background: f.color, color: "#000" }}>{i + 1}</div>
                      <span className="text-xs font-bold" style={{ color: f.color }}>{f.anni}</span>
                    </div>
                    <div className="font-black" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", letterSpacing: "0.1em", color: COLORS.text }}>{f.titolo}</div>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: COLORS.textDim }}>{f.desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* =================== DATI ROMA =================== */}
        {activeSection === "dati" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: "0.1em" }}>
                FOTOGRAFIA DI <span style={{ color: COLORS.orange }}>ROMA OGGI</span>
              </h2>
              <Tag color="teal">Monitoraggio Continuo 2025</Tag>
            </div>

            {/* Big stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "2.87M", label: "Residenti", sub: "+4.3M area metropolitana", accent: COLORS.text },
                { value: "1.42M", label: "Auto registrate", sub: "1 auto ogni 2.02 persone", accent: COLORS.red },
                { value: "510K", label: "Moto & Scooter", sub: "1° città EU per densità moto", accent: COLORS.orange },
                { value: "~11M", label: "Spostamenti/giorno", sub: "Auto: 4.8M  TPL: 3.2M  Piedi/bici: 3M", accent: COLORS.amber },
              ].map((s, i) => (
                <Card key={i}>
                  <Stat {...s} />
                </Card>
              ))}
            </div>

            {/* Patenti */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: COLORS.textDim }}>Patenti per Tipo — Roma</div>
                <div className="space-y-3">
                  {licenseData.map((l, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: COLORS.text }}>{l.tipo}</span>
                        <span className="font-bold" style={{ color: l.colore }}>{l.numero.toLocaleString()}</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: "#1E1E2E" }}>
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${(l.numero / 1680000) * 100}%`, background: l.colore }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-xl text-xs" style={{ background: "#0A0A0F", color: COLORS.textDim }}>
                  📊 <strong style={{ color: COLORS.text }}>73%</strong> degli adulti romani ha la patente B — una delle percentuali più alte d'Europa. Indica forte dipendenza dall'auto.
                </div>
              </Card>

              <Card>
                <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: COLORS.textDim }}>Veicoli Circolanti — Composizione</div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={vehicleData} layout="vertical" margin={{ left: 10, right: 30 }}>
                    <XAxis type="number" tick={{ fill: COLORS.textDim, fontSize: 10 }} tickFormatter={v => (v / 1000) + "K"} />
                    <YAxis type="category" dataKey="name" tick={{ fill: COLORS.textDim, fontSize: 10 }} width={100} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {vehicleData.map((entry, index) => (
                        <Cell key={index} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs" style={{ color: COLORS.textDim }}>
                  <div>🔴 <strong style={{ color: COLORS.red }}>1.42M auto</strong> — solo 60% Euro 6</div>
                  <div>🟠 <strong style={{ color: COLORS.orange }}>510K moto</strong> — 30% pre-Euro 3</div>
                </div>
              </Card>
            </div>

            {/* Monitoraggio continuo */}
            <Card glowColor={COLORS.teal}>
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: COLORS.teal }}>🛰 Sistema di Monitoraggio Automatico Proposto</div>
                  <div className="font-black text-lg" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}>ROMA TRAFFIC INTELLIGENCE NETWORK</div>
                  <p className="text-sm mt-2 max-w-2xl" style={{ color: COLORS.textDim }}>
                    Rete di sensori IoT, telecamere con computer vision e dati aggregati da app per misurare in tempo reale la mobilità cittadina — aggiornando ogni anno il "registro veicoli attivi" e i flussi di spostamento.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.teal }} className="animate-pulse" />
                  <span className="text-xs font-bold" style={{ color: COLORS.teal }}>LIVE</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                {[
                  { icon: "📷", title: "3.800 punti di rilevamento", desc: "Telecamere con AI per conteggio e classificazione veicoli" },
                  { icon: "📡", title: "GPS anonimizzato", desc: "Dati da app di navigazione per mappe di calore in tempo reale" },
                  { icon: "🌬", title: "Sensori qualità aria", desc: "PM2.5, NO2, CO2 in ogni quartiere — correlati al traffico" },
                  { icon: "📊", title: "Dashboard pubblica", desc: "Open data accessibili a cittadini, ricercatori e policy maker" },
                ].map((m, i) => (
                  <div key={i} className="rounded-xl p-3" style={{ background: "#0A0A0F" }}>
                    <div className="text-xl mb-2">{m.icon}</div>
                    <div className="text-xs font-bold mb-1" style={{ color: COLORS.teal }}>{m.title}</div>
                    <div className="text-xs" style={{ color: COLORS.textDim }}>{m.desc}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* =================== IL PROBLEMA =================== */}
        {activeSection === "problema" && (
          <div className="space-y-6">
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: "0.1em" }}>
              IL PESO DEL <span style={{ color: COLORS.red }}>SISTEMA ATTUALE</span>
            </h2>

            {/* Occupancy chart */}
            <Card glowColor={COLORS.red}>
              <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: COLORS.red }}>Occupazione Media dei Veicoli — Roma (persone/auto)</div>
              <div className="text-xs mb-4" style={{ color: COLORS.textDim }}>Un'auto può trasportare 5 persone. Ne trasporta mediamente 1.3.</div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={occupancyData}>
                  <defs>
                    <linearGradient id="gradOtt" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.teal} stopOpacity={0.15} />
                      <stop offset="95%" stopColor={COLORS.teal} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradMed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.red} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS.red} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis dataKey="time" tick={{ fill: COLORS.textDim, fontSize: 10 }} />
                  <YAxis tick={{ fill: COLORS.textDim, fontSize: 10 }} domain={[0, 5]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="ottimale" name="Capacità ottimale" stroke={COLORS.teal} fill="url(#gradOtt)" strokeDasharray="6 3" />
                  <Area type="monotone" dataKey="medio" name="Occupazione reale" stroke={COLORS.red} fill="url(#gradMed)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-3 text-xs p-3 rounded-xl" style={{ background: "#0A0A0F", color: COLORS.textDim }}>
                🔴 <strong style={{ color: COLORS.text }}>Il gap di efficienza è del 69%.</strong> Se ogni auto trasportasse solo 2.5 persone (metà della capacità), le auto necessarie si ridurrebbero della metà.
              </div>
            </Card>

            {/* Cost breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: "💸", title: "Costo per il Cittadino", color: COLORS.red,
                  items: [
                    "Auto media: €8.000–€12.000 acquisto",
                    "Assicurazione: €1.200/anno",
                    "Carburante: €1.500–€2.000/anno",
                    "Manutenzione: €800/anno",
                    "Parcheggio: €600–€1.200/anno",
                    "= €4.100–€5.200/anno per un mezzo fermo il 94% del giorno",
                  ]
                },
                {
                  icon: "🌍", title: "Costo per la Città", color: COLORS.orange,
                  items: [
                    "€1.5 miliardi/anno in produttività persa nel traffico",
                    "€420M/anno in costi sanitari da inquinamento",
                    "80% della superficie pubblica occupata da parcheggi",
                    "2.8 ore/settimana perse nel traffico per romano",
                    "Temperatura urbana +2.1°C effetto isola di calore",
                    "35% dello spazio stradale per sosta privata gratuita",
                  ]
                },
                {
                  icon: "⛽", title: "Costo per il Pianeta", color: COLORS.amber,
                  items: [
                    "3.8 milioni di tonnellate CO₂/anno a Roma",
                    "PM2.5 oltre soglia OMS per 180+ giorni/anno",
                    "14.000 morti premature in Italia da inquinamento veicolare",
                    "Italia importa 96% del petrolio che brucia in auto",
                    "Un'auto brucia carburante al 25% di efficienza media",
                    "Il 60% dei tragitti è <8km: ideale per bici/monopattino",
                  ]
                },
              ].map((c, i) => (
                <Card key={i} glowColor={c.color}>
                  <div className="text-2xl mb-2">{c.icon}</div>
                  <div className="font-black mb-3 text-sm" style={{ color: c.color, fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", letterSpacing: "0.08em" }}>{c.title}</div>
                  <ul className="space-y-1.5">
                    {c.items.map((item, j) => (
                      <li key={j} className="text-xs flex items-start gap-2" style={{ color: COLORS.textDim }}>
                        <span style={{ color: c.color }} className="shrink-0 mt-0.5">▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>

            <Card>
              <div className="font-black text-center py-4" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.2rem, 4vw, 2.2rem)", letterSpacing: "0.08em" }}>
                Roma ha <span style={{ color: COLORS.red }}>1.42 milioni di auto</span> che occupano spazio fisico 24h/giorno<br />
                ma vengono usate in media <span style={{ color: COLORS.amber }}>solo 86 minuti al giorno</span>.<br />
                <span style={{ color: COLORS.teal }}>Il 94% del tempo: ferme. Che spreco.</span>
              </div>
            </Card>
          </div>
        )}

        {/* =================== VISIONE =================== */}
        {activeSection === "visione" && (
          <div className="space-y-6">
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: "0.1em" }}>
              LA VISIONE: <span style={{ color: COLORS.teal }}>MOBILITÀ COME SERVIZIO</span>
            </h2>

            <Card glowColor={COLORS.teal}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Tag color="teal">Il Modello</Tag>
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", letterSpacing: "0.08em", marginTop: "0.5rem" }}>
                    MAAS — MOBILITY<br />AS A SERVICE
                  </h3>
                  <p className="text-sm mt-3 leading-relaxed" style={{ color: COLORS.textDim }}>
                    Il cittadino non possiede un mezzo: <strong style={{ color: COLORS.text }}>sottoscrive la mobilità</strong> come abbonamento economico. 
                    Lo Stato garantisce che per ogni esigenza, in ogni quartiere, ci sia sempre il mezzo giusto disponibile.
                  </p>
                  <div className="mt-4 space-y-3">
                    {[
                      { scenario: "Breve tragitto in città", soluzione: "🛴 Monopattino / 🚲 Bici condivisa", costo: "€0.5–1.5", tempo: "<5 min" },
                      { scenario: "Tragitto medio (5–15 km)", soluzione: "🚎 Bus elettrico / 🚇 Metro / 🛵 Scooter", costo: "€1.5–3", tempo: "<10 min" },
                      { scenario: "Necessità auto (famiglia, spesa)", soluzione: "🚗 Auto condivisa da hub/strada", costo: "€4–8/ora", tempo: "<15 min" },
                      { scenario: "Viaggio rapido cross-città", soluzione: "🚈 Metro/Treno + Auto all'arrivo", costo: "€5–12", tempo: "Ottimizzato" },
                    ].map((s, i) => (
                      <div key={i} className="rounded-xl p-3 flex flex-col gap-1" style={{ background: "#0A0A0F" }}>
                        <div className="text-xs font-bold" style={{ color: COLORS.text }}>{s.scenario}</div>
                        <div className="text-xs" style={{ color: COLORS.teal }}>{s.soluzione}</div>
                        <div className="flex gap-4 text-xs" style={{ color: COLORS.textDim }}>
                          <span>💰 {s.costo}</span>
                          <span>⏱ Disponibile {s.tempo}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: COLORS.textDim }}>L'Ecosistema Integrato</div>
                  {[
                    { layer: "1", title: "MICRO-MOBILITÀ", items: ["Monopattini elettrici", "Bici con pedalata assistita", "Cargo bike per consegne"], color: COLORS.green },
                    { layer: "2", title: "TRASPORTO PUBBLICO POTENZIATO", items: ["Metro linee A/B/C + nuova D", "Bus elettrici a frequenza alta", "Tram corridoi rapidi"], color: COLORS.teal },
                    { layer: "3", title: "CAR SHARING CIVICO", items: ["Auto private condivise (RFID)", "Flotta pubblica di riserva", "Van per famiglie numerose"], color: COLORS.amber },
                    { layer: "4", title: "INFRASTRUTTURA SMART", items: ["App universale Roma Mobility", "3.500 hub di mobilità", "Battery swap network"], color: COLORS.orange },
                  ].map((l, i) => (
                    <div key={i} className="rounded-xl p-3 mb-2" style={{ background: "#0A0A0F", border: `1px solid ${l.color}25` }}>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-5 h-5 rounded text-xs font-black flex items-center justify-center" style={{ background: l.color, color: "#000" }}>L{l.layer}</div>
                        <span className="font-black text-xs" style={{ color: l.color, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.1em" }}>{l.title}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {l.items.map((item, j) => (
                          <span key={j} className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${l.color}10`, color: l.color }}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* =================== MECCANICHE =================== */}
        {activeSection === "meccaniche" && (
          <div className="space-y-6">
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: "0.1em" }}>
              LE MECCANICHE: <span style={{ color: COLORS.amber }}>COME FUNZIONA</span>
            </h2>

            {/* Car Sharing Civico */}
            <Card glowColor={COLORS.orange}>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4 flex-wrap">
                  <div className="text-4xl">🗝️</div>
                  <div className="flex-1">
                    <Tag color="orange">Meccanica Centrale</Tag>
                    <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.6rem", letterSpacing: "0.08em", marginTop: "0.3rem" }}>CAR SHARING CIVICO — "LA TUA AUTO LAVORA PER TE"</h3>
                    <p className="text-sm mt-2" style={{ color: COLORS.textDim }}>
                      Il proprietario cede la propria auto alla rete condivisa tramite app. L'auto viene utilizzata da altri cittadini quando lui non ne ha bisogno. 
                      Lui riceve un rimborso automatico. Tutti ci guadagnano.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: COLORS.orange }}>Come funziona tecnicamente</div>
                    {[
                      { step: "01", title: "Registrazione", desc: "Il proprietario registra l'auto sull'app Roma Mobility con foto, libretto e dati assicurativi" },
                      { step: "02", title: "Installazione RFID/Smart Key", desc: "Il Comune installa gratuitamente un dispositivo RFID sul veicolo che permette accesso sicuro tramite smartphone" },
                      { step: "03", title: "Disponibilità flessibile", desc: "Il proprietario imposta orari e giorni di disponibilità. L'auto è sua quando vuole, condivisa nel resto del tempo" },
                      { step: "04", title: "Rimborso automatico", desc: "€0.35–0.45/km percorso da altri utenti viene accreditato mensilmente sul conto del proprietario" },
                      { step: "05", title: "Assicurazione garantita", desc: "Il Comune garantisce copertura assicurativa durante l'uso condiviso. Zero rischi extra per il proprietario" },
                      { step: "06", title: "Rating e controllo", desc: "Sistema di rating bidirezione. Telecamera interna per sicurezza. Limite velocità monitorato" },
                    ].map((s, i) => (
                      <div key={i} className="flex items-start gap-3 mb-3">
                        <div className="w-6 h-6 rounded text-xs font-black flex items-center justify-center shrink-0" style={{ background: COLORS.orange, color: "#000" }}>{s.step}</div>
                        <div>
                          <div className="text-xs font-bold" style={{ color: COLORS.text }}>{s.title}</div>
                          <div className="text-xs" style={{ color: COLORS.textDim }}>{s.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-xl p-4" style={{ background: "#0A0A0F" }}>
                      <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: COLORS.amber }}>Incentivi al proprietario</div>
                      <ul className="space-y-2">
                        {[
                          "€500–800/anno in rimborsi da utilizzo condiviso",
                          "Esenzione ZTL permanente",
                          "Sosta gratuita nei parcheggi comunali",
                          "Priorità acquisto EV con sconto €4.000 extra comunale",
                          "Bollo auto ridotto del 50%",
                          "Crediti mobilità per uso mezzi pubblici gratuiti",
                        ].map((inc, i) => (
                          <li key={i} className="text-xs flex gap-2" style={{ color: COLORS.textDim }}>
                            <span style={{ color: COLORS.amber }}>✓</span>{inc}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl p-4" style={{ background: "#0A0A0F" }}>
                      <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: COLORS.teal }}>Per chi usa l'auto condivisa</div>
                      <ul className="space-y-2">
                        {[
                          "€0.35/min + €0.25/km — tutto incluso",
                          "Prenotazione 1 ora prima o istantanea",
                          "Punto di ritiro e consegna flessibile (raggio 500m)",
                          "Paga solo quanto usi — no abbonamento obbligatorio",
                          "Accesso con lo smartphone — nessuna chiave fisica",
                          "Storni automatici se auto non disponibile",
                        ].map((u, i) => (
                          <li key={i} className="text-xs flex gap-2" style={{ color: COLORS.textDim }}>
                            <span style={{ color: COLORS.teal }}>✓</span>{u}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Battery Swap */}
            <Card glowColor={COLORS.teal}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Tag color="teal">Infrastruttura Chiave</Tag>
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.6rem", letterSpacing: "0.08em", marginTop: "0.3rem" }}>⚡ BATTERY SWAP NETWORK — "RIFORNISCI IN 5 MINUTI"</h3>
                  <p className="text-sm mt-2 leading-relaxed" style={{ color: COLORS.textDim }}>
                    Il principale freno all'adozione dell'elettrico è la lunga ricarica. La soluzione: <strong style={{ color: COLORS.text }}>sostituire l'intera batteria in 3–5 minuti</strong>, come un cambio di gomme al pit stop. 
                    Nessuna attesa. La batteria scarica rimane alla stazione, quella carica va sull'auto. Modello già funzionante in Cina (NIO: 2.000+ stazioni).
                  </p>
                  <div className="mt-4 space-y-2">
                    {[
                      { kpi: "500 stazioni Fase 1", note: "Prima distribuzione su grandi arterie e nodi strategici" },
                      { kpi: "3 min swap medio", note: "Robot automatizzato, nessun operatore necessario" },
                      { kpi: "Batteria standardizzata", note: "Normativa europea già in discussione — Roma apripista" },
                      { kpi: "Ciclo 24/7", note: "Le batterie si caricano di notte quando l'energia costa meno" },
                    ].map((k, i) => (
                      <div key={i} className="flex gap-3 rounded-lg p-2" style={{ background: "#0A0A0F" }}>
                        <div className="font-black text-xs shrink-0 w-36" style={{ color: COLORS.teal }}>{k.kpi}</div>
                        <div className="text-xs" style={{ color: COLORS.textDim }}>{k.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: COLORS.textDim }}>Rete di Ricarica — Piano di Installazione</div>
                  <div className="space-y-3">
                    {[
                      { tipo: "Colonnine Fast (22kW)", quantita: "8.000", dove: "Strade, parcheggi condominiali", color: COLORS.green },
                      { tipo: "Ultra-fast (150kW)", quantita: "1.200", dove: "Superstrade, hub mobilità", color: COLORS.teal },
                      { tipo: "Battery Swap Station", quantita: "500 → 1.500", dove: "Ogni 2km in media a regime", color: COLORS.amber },
                      { tipo: "Ricarica wireless (induttiva)", quantita: "800", dove: "Soste brevi, piazze, semafori", color: COLORS.orange },
                    ].map((r, i) => (
                      <div key={i} className="rounded-xl p-3" style={{ background: "#0A0A0F" }}>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-xs font-bold" style={{ color: r.color }}>{r.tipo}</div>
                            <div className="text-xs mt-0.5" style={{ color: COLORS.textDim }}>{r.dove}</div>
                          </div>
                          <div className="font-black text-lg" style={{ color: r.color, fontFamily: "'Bebas Neue', sans-serif" }}>{r.quantita}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* App Universale */}
            <Card glowColor={COLORS.green}>
              <Tag color="green">Super App</Tag>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", letterSpacing: "0.08em", marginTop: "0.3rem" }}>📱 ROMA MOBILITY APP — UN'APP PER TUTTO</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                {[
                  { icon: "🗺️", feat: "Pianificazione multimodale", desc: "Ti dice il percorso più veloce mescolando tutti i mezzi" },
                  { icon: "💳", feat: "Pagamento unico", desc: "Un wallet per metro, bus, monopattino, car sharing, parcheggio" },
                  { icon: "🤖", feat: "AI Mobility Assistant", desc: "Predice traffico e suggerisce quando partire e come" },
                  { icon: "🌱", feat: "Carbon Score", desc: "Traccia le tue emissioni e premia i comportamenti virtuosi" },
                  { icon: "🔑", feat: "Smart Key", desc: "Sblocca qualsiasi mezzo condiviso registrato" },
                  { icon: "👨‍👩‍👧", feat: "Piano Famiglia", desc: "Abbonamento che copre tutti i componenti del nucleo" },
                  { icon: "♿", feat: "Accessibilità", desc: "Veicoli e percorsi dedicati per mobilità ridotta" },
                  { icon: "📊", feat: "Report mensile", desc: "Quanto hai speso, quanto avresti speso con un'auto" },
                ].map((f, i) => (
                  <div key={i} className="rounded-xl p-3" style={{ background: "#0A0A0F" }}>
                    <div className="text-xl mb-1">{f.icon}</div>
                    <div className="text-xs font-bold mb-1" style={{ color: COLORS.green }}>{f.feat}</div>
                    <div className="text-xs" style={{ color: COLORS.textDim }}>{f.desc}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* =================== ROADMAP =================== */}
        {activeSection === "roadmap" && (
          <div className="space-y-6">
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: "0.1em" }}>
              LA ROADMAP: <span style={{ color: COLORS.amber }}>DA OGGI AL 2035</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* FASE 1 */}
              <Card glowColor={COLORS.orange}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full text-sm font-black flex items-center justify-center" style={{ background: COLORS.orange, color: "#000" }}>1</div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest" style={{ color: COLORS.orange }}>2025–2027</div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem", letterSpacing: "0.08em" }}>FONDAMENTA</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { cat: "Infrastruttura", items: ["Installazione 500 battery swap pilot zones (EUR, Prati, Tiburtina)", "2.000 colonnine Fast in strade e condomini", "200 hub micro-mobilità con bici/monopattini garantiti"] },
                    { cat: "App & Piattaforma", items: ["Lancio app Roma Mobility Beta", "Integrazione Atac, TrenItalia, operatori sharing", "Dashboard open data mobilità pubblica"] },
                    { cat: "Car Sharing Civico", items: ["Programma pilota 10.000 auto private condivise", "Installazione RFID gratuita su veicoli aderenti", "Incentivi proprietari: bollo -50%, sosta gratuita"] },
                    { cat: "Politiche coraggiose", items: ["Divieto circolazione Euro 0/1/2 tutto l'anno", "Sosta a pagamento estesa h24 nel centro", "Bonus €2.000 per chi rottama e aderisce al car sharing"] },
                    { cat: "Monitoraggio", items: ["Rete 1.000 sensori IoT installati", "Report trimestrale pubblico su flussi e qualità aria"] },
                  ].map((c, i) => (
                    <div key={i}>
                      <div className="text-xs font-bold mb-1" style={{ color: COLORS.orange }}>{c.cat}</div>
                      <ul className="space-y-1">
                        {c.items.map((item, j) => (
                          <li key={j} className="text-xs flex items-start gap-2" style={{ color: COLORS.textDim }}>
                            <span style={{ color: COLORS.orange }} className="shrink-0">▸</span>{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>

              {/* FASE 2 */}
              <Card glowColor={COLORS.amber}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full text-sm font-black flex items-center justify-center" style={{ background: COLORS.amber, color: "#000" }}>2</div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest" style={{ color: COLORS.amber }}>2028–2031</div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem", letterSpacing: "0.08em" }}>ESPANSIONE</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { cat: "Flotta Garantita", items: ["5.000 veicoli EV di proprietà comunale in flotta condivisa", "Fleet AI: distribuzione predittiva basata su domanda", "Van e veicoli accessibili garantiti in ogni municipio"] },
                    { cat: "Infrastruttura 2.0", items: ["1.500 battery swap stations a regime (ogni 2km)", "8.000 colonnine totali — copertura 90% quartieri", "Metro D: tratta iniziale operativa"] },
                    { cat: "Spazio Urbano", items: ["200 parcheggi privati convertiti in hub mobilità", "30 km nuove corsie ciclabili protette", "Piazza Venezia e Via del Corso: zona pedonale permanente"] },
                    { cat: "Politiche Avanzate", items: ["Congestione charge: €4–8 per entrare nel GRA in auto privata", "Obbligo EV per acquisti auto da 2030", "Carbon credit scambiabili per chi usa solo sharing"] },
                    { cat: "Monitoraggio", items: ["3.800 sensori a regime — dati in real-time pubblici", "AI Traffic Management: semafori intelligenti coordinati", "Gemello digitale di Roma per simulazioni"] },
                  ].map((c, i) => (
                    <div key={i}>
                      <div className="text-xs font-bold mb-1" style={{ color: COLORS.amber }}>{c.cat}</div>
                      <ul className="space-y-1">
                        {c.items.map((item, j) => (
                          <li key={j} className="text-xs flex items-start gap-2" style={{ color: COLORS.textDim }}>
                            <span style={{ color: COLORS.amber }} className="shrink-0">▸</span>{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>

              {/* FASE 3 */}
              <Card glowColor={COLORS.green}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full text-sm font-black flex items-center justify-center" style={{ background: COLORS.green, color: "#000" }}>3</div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest" style={{ color: COLORS.green }}>2032–2035</div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem", letterSpacing: "0.08em" }}>ROMA 2035</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { cat: "Flotta Autonoma Parziale", items: ["500 robotaxi semi-autonomi in servizio h24", "Robo-delivery per ultime miglia commerciali", "Bus autonomi su corridoi ad alta frequenza"] },
                    { cat: "Centro Storico Car-Free", items: ["Entro GRA: solo EV condivisi, residenti con permesso speciale", "Centro storico (Mura Aureliane) permanentemente car-free", "Rete di tram elettrici sulle vie principali"] },
                    { cat: "Risultati Target 2035", items: ["−820.000 auto private circolanti", "70% spostamenti su mezzi condivisi o pubblici", "−68% emissioni CO₂ da trasporti vs 2024", "€2.400/anno risparmiati per famiglia media"] },
                    { cat: "L'Eredità", items: ["Modello Roma esportato a Milano, Napoli, Bologna", "8 km² di spazio urbano recuperato dai parcheggi", "Roma nella top 10 EU per qualità dell'aria urbana"] },
                  ].map((c, i) => (
                    <div key={i}>
                      <div className="text-xs font-bold mb-1" style={{ color: COLORS.green }}>{c.cat}</div>
                      <ul className="space-y-1">
                        {c.items.map((item, j) => (
                          <li key={j} className="text-xs flex items-start gap-2" style={{ color: COLORS.textDim }}>
                            <span style={{ color: COLORS.green }} className="shrink-0">▸</span>{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Steps for citizen */}
            <Card glowColor={COLORS.teal}>
              <Tag color="teal">Guida al Cittadino</Tag>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", letterSpacing: "0.08em", marginTop: "0.3rem" }}>COSA FACCIO IO, OGGI?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {[
                  { fase: "Ora (2025)", icon: "📱", azioni: ["Scarica Roma Mobility App (non ancora disponibile — registra interesse)", "Verifica l'euro-class della tua auto su ACI", "Calcola quanto spendi annualmente di auto con il calcolatore app"] },
                  { fase: "Breve termine (2026)", icon: "🚗", azioni: ["Aderisci al programma pilota car sharing civico — installi RFID gratis", "Inizia a usare monopattino/bici per tragitti <5km", "Valuta se ha senso passare all'EV con incentivi statali+comunali"] },
                  { fase: "Medio termine (2028)", icon: "⚡", azioni: ["Acquisti il prossimo auto? Scegli EV con batteria swappable (standard EU)", "Riduci da 2 a 1 auto in famiglia — il sistema ti copre", "Abbonati a Roma Mobility Premium per la famiglia"] },
                  { fase: "2035 — L'Obiettivo", icon: "🌱", azioni: ["Hai 0 auto o 1 condivisa — usi il sistema per tutto", "Spendi €150–200/mese vs €430/mese con auto propria", "Contribuisci ad una città con meno smog e più spazio"] },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl p-4" style={{ background: "#0A0A0F" }}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{s.icon}</span>
                      <div className="font-black text-sm" style={{ color: COLORS.teal, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.08em" }}>{s.fase}</div>
                    </div>
                    <ul className="space-y-1.5">
                      {s.azioni.map((a, j) => (
                        <li key={j} className="text-xs flex items-start gap-2" style={{ color: COLORS.textDim }}>
                          <span style={{ color: COLORS.teal }} className="shrink-0">→</span>{a}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* =================== RISULTATI =================== */}
        {activeSection === "risultati" && (
          <div className="space-y-6">
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: "0.1em" }}>
              I RISULTATI ATTESI: <span style={{ color: COLORS.green }}>NUMERI 2035</span>
            </h2>

            {/* Auto proiezione */}
            <Card>
              <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: COLORS.textDim }}>Proiezione Veicoli a Roma (migliaia)</div>
              <div className="text-xs mb-4" style={{ color: COLORS.textDim }}>Auto private in diminuzione, condivisione ed elettrico in crescita</div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={projectionData}>
                  <defs>
                    <linearGradient id="gAuto" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.red} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS.red} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gShared" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.teal} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS.teal} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gEV" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.green} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS.green} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis dataKey="year" tick={{ fill: COLORS.textDim, fontSize: 11 }} />
                  <YAxis tick={{ fill: COLORS.textDim, fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: COLORS.textDim, fontSize: 11 }} />
                  <Area type="monotone" dataKey="auto" name="Auto private (K)" stroke={COLORS.red} fill="url(#gAuto)" />
                  <Area type="monotone" dataKey="condivisi" name="Veicoli condivisi attivi (K)" stroke={COLORS.teal} fill="url(#gShared)" />
                  <Area type="monotone" dataKey="elettrici" name="EV circolanti (K)" stroke={COLORS.green} fill="url(#gEV)" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Emissioni */}
            <Card>
              <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: COLORS.textDim }}>Riduzione Emissioni (Base 100 = 2024)</div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={emissioniData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis dataKey="year" tick={{ fill: COLORS.textDim, fontSize: 11 }} />
                  <YAxis tick={{ fill: COLORS.textDim, fontSize: 11 }} domain={[0, 110]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: COLORS.textDim, fontSize: 11 }} />
                  <Line type="monotone" dataKey="CO2" name="CO₂" stroke={COLORS.orange} strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="PM25" name="PM2.5" stroke={COLORS.red} strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="NOx" name="NOx" stroke={COLORS.amber} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Final KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { val: "−820K", desc: "Auto private in meno sulle strade di Roma", color: COLORS.green },
                { val: "−68%", desc: "Emissioni CO₂ da trasporto urbano al 2035", color: COLORS.teal },
                { val: "€2.400", desc: "Risparmio annuo medio per nucleo familiare", color: COLORS.amber },
                { val: "8 km²", desc: "Superficie urbana recuperata da parcheggi privati", color: COLORS.orange },
                { val: "70%", desc: "Spostamenti su mezzi condivisi o pubblici nel 2035", color: COLORS.green },
                { val: "−42 min", desc: "Tempo medio perso nel traffico a settimana", color: COLORS.teal },
                { val: "€3.8Mld", desc: "Valore economico generato (PIL produttività + sanità)", color: COLORS.amber },
                { val: "TOP 10 EU", desc: "Roma nella classifica qualità aria metropoli europee", color: COLORS.orange },
              ].map((k, i) => (
                <Card key={i} glowColor={k.color}>
                  <div className="font-black" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.2rem", color: k.color, lineHeight: 1 }}>{k.val}</div>
                  <div className="text-xs mt-2 leading-relaxed" style={{ color: COLORS.textDim }}>{k.desc}</div>
                </Card>
              ))}
            </div>

            <Card>
              <div className="text-center py-6">
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(1.2rem, 4vw, 2.5rem)", letterSpacing: "0.08em", lineHeight: 1.1 }}>
                  Roma non ha bisogno di meno mobilità.<br />
                  Ha bisogno di <span style={{ color: COLORS.orange }}>mobilità più intelligente</span>.<br />
                  <span style={{ color: COLORS.teal }}>La tecnologia c'è. La volontà è l'unica variabile.</span>
                </div>
              </div>
            </Card>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 pb-8 pt-4">
        <div className="text-center text-xs" style={{ color: COLORS.muted }}>
          Roma Mobilità 2035 — Piano Strategico Integrato · Dati 2024–2025 · Aggiornamento continuo previsto tramite RTIN
        </div>
      </div>
    </div>
  );
}
