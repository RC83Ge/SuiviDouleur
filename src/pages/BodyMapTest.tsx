import { useState } from 'react';
import { FRONT_PATHS, BACK_PATHS, ZonePath } from '@/components/BodyMap/svgPaths';
import bodyFront from '@/assets/body-front.png';
import bodyBack from '@/assets/body-back.png';

interface View {
  title: string;
  img: string;
  zones: ZonePath[];
}

const VIEWS: View[] = [
  { title: 'Face', img: bodyFront, zones: FRONT_PATHS },
  { title: 'Dos', img: bodyBack, zones: BACK_PATHS },
];

const ALL_ZONES = [...FRONT_PATHS, ...BACK_PATHS];

function labelOf(id: string) {
  return ALL_ZONES.find((z) => z.id === id)?.label ?? id;
}

export default function BodyMapTest() {
  const [selected, setSelected] = useState<string[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);

  const toggleZone = (id: string) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const removeZone = (id: string) => {
    setSelected((s) => s.filter((x) => x !== id));
  };

  return (
    <div style={{ margin: 0, background: '#f4f7fb', minHeight: '100vh' }}>
      <div
        style={{
          fontFamily: 'Helvetica, Arial, sans-serif',
          color: '#1d3557',
          maxWidth: 980,
          margin: '0 auto',
          padding: '32px 24px',
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>
          Test des zones cliquables
        </h1>
        <p style={{ fontSize: 14, color: '#5a7184', margin: '0 0 24px' }}>
          Survolez pour voir la zone, cliquez pour sélectionner / désélectionner. Zones
          régénérées à partir des silhouettes réelles.
        </p>

        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {VIEWS.map((v) => (
            <div key={v.title} style={{ flex: 1, minWidth: 280 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#5a7184',
                  marginBottom: 8,
                  textAlign: 'center',
                }}
              >
                {v.title}
              </div>
              <div style={{ position: 'relative', width: '100%', maxWidth: 320, margin: '0 auto' }}>
                <img
                  src={v.img}
                  alt={v.title}
                  draggable={false}
                  style={{ display: 'block', width: '100%', height: 'auto', userSelect: 'none' }}
                />
                <svg
                  viewBox="0 0 358 480"
                  preserveAspectRatio="xMidYMid meet"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                >
                  {v.zones.map((z) => {
                    const isSel = selected.includes(z.id);
                    const isHov = hovered === z.id;
                    return (
                      <path
                        key={z.id}
                        d={z.d}
                        fill={isSel ? '#e63946' : '#2a6fdb'}
                        fillOpacity={isSel ? 0.55 : isHov ? 0.35 : 0.04}
                        stroke={isSel || isHov ? '#1d3557' : 'transparent'}
                        strokeWidth={isSel ? 1.6 : 1}
                        onClick={() => toggleZone(z.id)}
                        onMouseEnter={() => setHovered(z.id)}
                        onMouseLeave={() => setHovered((h) => (h === z.id ? null : h))}
                        style={{ cursor: 'pointer', transition: 'fill-opacity 0.15s' }}
                      />
                    );
                  })}
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 20,
            padding: '16px 18px',
            background: '#ffffff',
            border: '1px solid #dce6f0',
            borderRadius: 12,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
            Zone survolée : <span style={{ color: '#2a6fdb' }}>{hovered ? labelOf(hovered) : '—'}</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {selected.map((id) => (
              <button
                key={id}
                onClick={() => removeZone(id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 12px',
                  borderRadius: 999,
                  border: '1px solid #2a6fdb',
                  background: '#eaf1fc',
                  color: '#1d3557',
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                {labelOf(id)} ✕
              </button>
            ))}
          </div>
          {selected.length === 0 && (
            <div style={{ fontSize: 13, color: '#8ba0b5' }}>Aucune zone sélectionnée</div>
          )}
        </div>
      </div>
    </div>
  );
}
